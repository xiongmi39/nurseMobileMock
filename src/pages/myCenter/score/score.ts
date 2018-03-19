import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CommonService } from '../../../providers/common/CommonService';
import { CourseService } from '../../../providers/course/CourseService';


@Component({
  selector: 'page-score',
  templateUrl: 'score.html'
})
export class ScorePage {
  dws: string = "CreditRecord";
  CreditRecordList:any = [];
  IntegralList:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public commonService:CommonService,public courseService:CourseService) {
  	this.getIntegralFindByUserID();
  	this.getCreditRecordFindByUserID();
  }

  ionViewDidLoad() {
  }

  getIntegralFindByUserID(){
  	this.courseService.getIntegralFindByUserID({
  		UserId:this.commonService.currentUser.ReUId
  	}).subscribe((data:any) => {
  		this.IntegralList = data;
  	});
  }

  getCreditRecordFindByUserID(){
  	this.courseService.getCreditRecordFindByUserID({
  		UserId:this.commonService.currentUser.ReUId
  	}).subscribe((data:any) => {
  		this.CreditRecordList = data;
  	});
  }  

}
