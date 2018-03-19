import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CourseService } from '../../providers/course/CourseService';
import { CommonService } from '../../providers/common/CommonService';

import { MsgdetailPage } from './msgdetail/msgdetail';

/*
  Generated class for the Message page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {
	dws: string = "notice";
  noticeList:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public courseService:CourseService,public commonService:CommonService) {
    this.getMessage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }

  getMessage(){
    this.courseService.getMessage({
      MessageType:"1",
      ReceiverID:"2"

    }).subscribe((data:any) => {
      this.noticeList = data;
    });
  }

  goMsgdetail(item){
    this.navCtrl.push(MsgdetailPage,{
      msgdetail: item
    });
  }

}
