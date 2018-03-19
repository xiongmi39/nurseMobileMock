import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CourseService } from '../../../providers/course/CourseService';
import { CommonService } from '../../../providers/common/CommonService';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {
  isLoading:boolean = true;
  dayList: any = {};
  dateList:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public courseService:CourseService,public commonService:CommonService) {
  	this.getCourseHistoryByUserID();
  }

  ionViewDidLoad() {
    
  }

  getCourseHistoryByUserID(){
  	this.courseService.getCourseHistoryByUserID({
  		UserID:this.commonService.currentUser.ReUId
  	}).subscribe((data:any) => {
      data.map((item)=>{
        let date = this.commonService.str2date(item.LastPlayDate, 'yyyy-MM-dd ').trim();
      
        if(!this.dayList[date]){
          this.dayList[date] = [];
          this.dateList.push(date);
          this.dayList[date].push(item.Course);
        }else{
          this.dayList[date].push(item.Course);
        }
      });
      this.isLoading = false;
  	});
  }

}
