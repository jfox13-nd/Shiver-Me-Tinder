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

  constructor(private userProfileService: UserProfileService, private chatService: ChatService) { }

  ngOnInit(): void {
    const parentThis = this;
    this.currentUsername = this.userProfileService.getCurrentUser().getUsername();
    this.reload_messages();
    const reloadInterval = interval(100 * 10000);
    this.subscription = reloadInterval.subscribe(val => this.reload_messages());
  }

  public reload_messages() {
    const parentThis = this;
    const currentUserId = parentThis.userProfileService.getCurrentUser().id;

    this.chatService.getAllChats().then((results) => {
      parentThis.messages = [];
      parentThis.messageUsers = [];
      parentThis.rawMessages = [];
      parentThis.messageUsernames = [];

      while (parentThis.messageBoxes.length < results.length) {
        parentThis.messageBoxes.push('');
      }

      results.forEach(element => {
        let userA = element.get('userA');
        let userB = element.get('userB');
        let chatActivity = element.get('activeChat');
        if ((userA.id == currentUserId || userB.id == currentUserId) && chatActivity == 'yes'){

          //parentThis.messages.push({"raw": element})
          parentThis.rawMessages.push(element);
          let messageGroup = [];
          parentThis.chatService.getAllMessages(element.id).then( (messageResults) => {
            console.log("IDS -->",userA.id,userB.id)
            console.log("ELEMENTID ->", element.id)
            messageResults.forEach(messageElement => {
              console.log("ELEMENTCONTENT ->", messageElement.get('content'), "ELEMENTSENDER", messageElement.get('sender'))
              messageGroup.push([messageElement.get('content'), messageElement.get('sender')]);
            });
          });
          parentThis.messages.push(messageGroup);
          let otherId;
          if (userA.id == currentUserId) {
            otherId = userB.id;
            //parentThis.messageUsernames.push(userB.id)
            //parentThis.messageUsernames.push(userB.id)
          } else {
            otherId = userA.id;
            //parentThis.messageUsernames.push(userA.id)
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
              console.log("SEE MEEEEEEEEE")
            })
          }

          
          console.log("MAP",parentThis.username_map)
          //parentThis.userProfileService.getUsernameFromUserId(otherId).then((u) => {
          //  parentThis.messageUsernames.push(userA.id + u.id)
          //})
          /*
          if (userA.id == currentUserId) {
            //parentThis.messageUsers.push(userB);
            parentThis.userProfileService.getUsernameFromUserId(userB.id).then((user) => {
              parentThis.messageUsernames.push(userB.getUsername()); //user
            }, (error) => {
              parentThis.messageUsernames.push(error);
              console.error('Error while fetching username', error);
            });
          } else {
            //parentThis.messageUsers.push(userA);
            parentThis.userProfileService.getUsernameFromUserId(userA.id).then((user) => {
              parentThis.messageUsernames.push(userA.getUsername()); //A
            }, (error) => {
              parentThis.messageUsernames.push(error);
              console.error('Error while fetching username', error);
            });
          }*/
          console.log("OTHER ->",parentThis.messageUsers[parentThis.messageUsers.length-1],userA.id,userB.id)
        }
      });
    });
    console.log("messages ->", this.messages)
    console.log("messageusers ->", this.messageUsers)
    console.log("messageusernames ->", this.messageUsernames)
  }

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

  private send_message(index, message) {
    console.log('index', index);
    const parentThis = this;
    this.chatService.sendMessage(this.rawMessages[index].id, message, this.currentUsername).then( () => {
      parentThis.reload_messages();
      parentThis.messageBoxes[index] = '';
    });
  }

  private fix_usernames() {
    for(var i = 0; i < this.messageUsernames.length; i++) {
      if (this.messageUsernames[i] in this.username_map) {
        this.messageUsernames[i] = this.username_map[this.messageUsernames[i]]
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
