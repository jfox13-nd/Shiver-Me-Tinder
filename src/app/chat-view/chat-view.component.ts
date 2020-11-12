import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { UserProfileService } from '../user-profile.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {

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
  }

  public reload_messages() {
    const parentThis = this;
    const current_user_id = parentThis.userProfileService.getCurrentUser().id;
    
    this.chatService.getAllChats().then((results) => {
      parentThis.messages = []
      parentThis.message_users = []
      parentThis.message_boxes = []
      parentThis.raw_messages = results;
      results.forEach(element => {
        this.message_boxes.push();
        let userA = element.get('userA');
        let userB = element.get('userB');
        if(userA.id == current_user_id || userB.id == current_user_id){
          parentThis.messages.push(element.get('messages'));
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

  private send_message(index, message) {
    const parentThis = this;
    const relevantConvo = this.raw_messages[index].id
    this.chatService.getChatByID(relevantConvo).then( (results) => {
      results.add("messages",[message, parentThis.current_username])
      results.save().then( (results) => {
        console.log("Chat saved")
        parentThis.reload_messages();
      });
    });
  }

}
