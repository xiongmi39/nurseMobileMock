import { Component } from '@angular/core';
import { NavController, NavParams,App,AlertController } from 'ionic-angular';

import { CourseDetailPage } from '../../course/courseDetail/courseDetail';

import { CourseService } from '../../../providers/course/CourseService';
import { CommonService } from '../../../providers/common/CommonService';

/*
  Generated class for the UserNotes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-notes',
  templateUrl: 'user-notes.html'
})
export class UserNotesPage {
	userNotes:any = [];
	courseList:any = [];
  isLoading:boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,public courseService:CourseService,public commonService:CommonService,private app:App,public alertCtrl: AlertController) {
  	this.getUserNotes();
  }

  ionViewDidLoad() {
    
  }

  getUserNotes(){
  	this.courseService.getUserNotes({
  		ReguserId:this.commonService.currentUser.ReUId
  	}).subscribe((data:any) => {
      this.isLoading = false;
  		this.userNotes = data;
  	});
  }

  goCourseDetail(item){
  	this.app.getRootNav().push(CourseDetailPage,{
  		CourseID: item.CourseID,
  		CourseName: item.Course.CourseName
  	});
  }

  delNote(item){
    this.courseService.delNote({
      NoteID: item.NoteID
    }).subscribe((data:any) => {
      if(data === '103'){
        this.getUserNotes();
      }
    });
  }

  showConfirm(item) {
    let confirm = this.alertCtrl.create({
      title: '删除笔记',
      message: '确认要删除此笔记吗?',
      buttons: [
        {
          text: '取消',
          handler: () => {
            return;
          }
        },
        {
          text: '删除',
          handler: () => {
            this.delNote(item);
          }
        }
      ]
    });
    confirm.present();
  }

  // getCourseDetail(courseId):any {
  // 	this.courseService.getCourseDetails({
  // 		CourseID: courseId
  // 	}).subscribe((data:any) =>{
  // 		return data;
  // 	});
  // }

}
