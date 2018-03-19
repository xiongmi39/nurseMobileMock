import { Component} from '@angular/core';
import { Platform, NavParams, ViewController,ToastController } from 'ionic-angular';

import { CourseService } from '../../../../providers/course/CourseService';


@Component({
  templateUrl: 'modalAddPage.html'
})
export class ModalAddPage {
  character:string = this.params.get('charNum');
  titleContent:any = {
    'note':'记笔记',
    'discuss':'评论',
    'question':'提问',
    'answer':'回复'
  };
  title:string = this.titleContent[this.character];
  postData:any = {};
  userId:string = this.params.get('userId');
  CourseID:string = this.params.get('CourseID');
  sendText:string = "";
  isDisabled:boolean = false;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public courseService: CourseService,
      public toastCtrl: ToastController  
  ) {

   


  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  send(){
    switch (this.character) {
      case "note":
      this.addNote();
     
      break;
      case "discuss":
      this.addDiscuss();
      
      break;
      case "question":
      // code...
      break;
      case "answer":
      // code...
      break;
      
      default:
        
      break;
    }
  }
  addNote(){
    if(this.sendText.toLowerCase().trim().length == 0){
      return;
    }
    if(this.sendText.toLowerCase().trim().length > 500){
      let toast = this.toastCtrl.create({
        message: '不能大于500字',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }
    this.postData = {
          UserID: this.userId,
          NoteID: '',
          IsShare: 1,
          FavorCount: 0,
          CourseID: this.CourseID,
          Content: this.sendText,
          ModifyDate: '/Date(1470361040000+0800)/'
        }

    this.courseService.addNote({model: this.postData}).subscribe((data:any) => {
      this.sendText = "";
      this.viewCtrl.dismiss('note');
    }, err =>{
      alert('err');
    });
    this.isDisabled = true;
  }

  addDiscuss(){
    if(this.sendText.toLowerCase().trim().length == 0){
      return;
    }
    if(this.sendText.toLowerCase().trim().length > 255){
      let toast = this.toastCtrl.create({
        message: '不能大于255字',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }
    this.postData = {
          UserID: this.userId,
          CourseID: this.CourseID,
          QID: '',
          FavorCount: 0,
          Title: this.sendText,
          ModifyDate: '/Date(1470361040000+0800)/'          
        }

    this.courseService.addDiscuss({model: this.postData}).subscribe((data:any) => {
      this.sendText = "";
      this.viewCtrl.dismiss('discuss');
    }, err =>{
      alert('err');
    });
    this.isDisabled = true;
  }  

}