import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { UserProfileService } from '../user-profile.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {

  private subscription: Subscription;
  private messages = [];
  private messageUsers = [];
  private messageUsernames = [];
  private currentUsername;
  private messageBoxes: any = [];
  private rawMessages;
  private username_map = {};

  constructor(private userProfileService: UserProfileService, private chatService: ChatService) {}

  /**
   * Load all chats and messages, start automatic message reloading every 10s
   */
  ngOnInit(): void {
    const parentThis = this;
    this.currentUsername = this.userProfileService.getCurrentUser().getUsername();
    this.reload_messages();
    setTimeout( () => {parentThis.reload_messages();}, 1000 );
    const reloadInterval = interval(10000);
    this.subscription = reloadInterval.subscribe(val => this.reload_messages());
  }

  /**
   * Queries all messages, filters out those that are not relevant to this user.
   */
  public reload_messages() {
    const parentThis = this;
    const currentUserId = parentThis.userProfileService.getCurrentUser().id;

    this.chatService.getAllChats().then((results) => {
      parentThis.messages = [];
      parentThis.messageUsers = [];
      parentThis.rawMessages = [];
      parentThis.messageUsernames = [];

      // add new input forms if required
      while (parentThis.messageBoxes.length < results.length) {
        parentThis.messageBoxes.push('');
      }

      // iterate though each chat and parse out relevant data
      results.forEach(element => {
        let userA = element.get('userA');
        let userB = element.get('userB');
        let chatActivity = element.get('activeChat');

        if ((userA.id == currentUserId || userB.id == currentUserId) && chatActivity == 'yes'){
          parentThis.rawMessages.push(element);
          let messageGroup = [];
          parentThis.chatService.getAllMessages(element.id).then( (messageResults) => {
            messageResults.forEach(messageElement => {
              messageGroup.push([messageElement.get('content'), messageElement.get('sender')]);
            });
          });
          parentThis.messages.push(messageGroup);
          let otherId;
          if (userA.id == currentUserId) {
            otherId = userB.id;
          } else {
            otherId = userA.id;
          }
          
          parentThis.messageUsers.push(otherId)
          if (otherId in parentThis.username_map) {
            parentThis.messageUsernames.push(parentThis.username_map[otherId])
          } else {
            parentThis.messageUsernames.push(otherId)
          }

          for(var i = 0; i < parentThis.messageUsers.length; i++) {
            let nameToMap = parentThis.messageUsers[i]
            parentThis.userProfileService.getUsernameFromUserId(nameToMap).then((u) => {
              parentThis.username_map[nameToMap] = u.getUsername()
            })
          }

        }
      });
    });
  }

  /**
   * Blocks another user from chatting with this user
   */
  private blockUser(index) {
    const parentThis = this;
    const relevantConvo = this.rawMessages[index].id;
    this.chatService.getChatByID(relevantConvo).then( (results) => {
      results.set('activeChat', 'invalid');
      results.save().then( () => {
        console.log('User blocked');
        parentThis.reload_messages();
      });
    });
  }

  /**
   * Creates a new message object
   */
  private send_message(index, message) {
    const parentThis = this;
    this.chatService.sendMessage(this.rawMessages[index].id, message, this.currentUsername).then( () => {
      parentThis.reload_messages();
      parentThis.messageBoxes[index] = '';
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
