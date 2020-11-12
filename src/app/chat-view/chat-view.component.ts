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
  private message_users = [];
  private message_usernames = [];
  private current_username;
  private message_boxes: any = [];
  private raw_messages;

  constructor(private userProfileService: UserProfileService, private chatService: ChatService) { }

  ngOnInit(): void {
    const parentThis = this;
    this.current_username = this.userProfileService.getCurrentUser().getUsername();
    this.reload_messages();
    const reload_interval = interval(10000);
    this.subscription = reload_interval.subscribe(val => this.reload_messages());
  }

  public reload_messages() {
    const parentThis = this;
    const current_user_id = parentThis.userProfileService.getCurrentUser().id;

    this.chatService.getAllChats().then((results) => {
      parentThis.messages = []
      parentThis.message_users = []
      //parentThis.message_boxes = []
      parentThis.raw_messages = [];
      
      while(parentThis.message_boxes.length < results.length) {
        parentThis.message_boxes.push("");
      }
      
     //console.log("res len",results.length)

      results.forEach(element => {
        //this.message_boxes.push();
        let userA = element.get('userA');
        let userB = element.get('userB');
        let chatActivity = element.get('activeChat');
        if((userA.id == current_user_id || userB.id == current_user_id) && chatActivity == 'yes'){
          parentThis.raw_messages.push(element)
          //parentThis.messages.push(element.get('messages'));
          console.log(element.get('messages'))
          let message_group = []
          parentThis.chatService.getAllMessages(element.id).then( (message_results) => {
            //console.log(message_results);
            message_results.forEach(message_element => {
              message_group.push([message_element.get('content'),message_element.get('sender')])
            });
          });
          parentThis.messages.push(message_group);
          if(userA.id == current_user_id) {
            parentThis.message_users.push(userB);
            parentThis.userProfileService.getUsernameFromUserId(userB.id).then((user) => {
              parentThis.message_usernames.push(user.getUsername());
            }, (error) => {
              parentThis.message_usernames.push(error);
              console.error('Error while fetching username', error);
            });
            //parentThis.message_usernames.push(parentThis.userProfileService.getUsernameFromUserId(userB.id))
          } else {
            parentThis.message_users.push(userA);
            parentThis.userProfileService.getUsernameFromUserId(userA.id).then((user) => {
              parentThis.message_usernames.push(user.getUsername());
            }, (error) => {
              parentThis.message_usernames.push(error);
              console.error('Error while fetching username', error);
            });
            //parentThis.message_usernames.push(parentThis.userProfileService.getUsernameFromUserId(userA.id))
          }
        }
      });
    });
  }

  private blockUser(index) {
    const parentThis = this;
    const relevantConvo = this.raw_messages[index].id
    this.chatService.getChatByID(relevantConvo).then( (results) => {
      results.set('activeChat','invalid')
      results.save().then( (results) => {
        console.log("User blocked")
        parentThis.reload_messages();
      });
    });
  }

  private send_message(index, message) {
    console.log("index",index);
    const parentThis = this;
    this.chatService.sendMessage(this.raw_messages[index].id, message, this.current_username).then( () => {
      parentThis.reload_messages();
      parentThis.message_boxes[index] = '';
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
