import { Component, OnInit ,OnChanges,Input,SimpleChange,
  DoCheck} from '@angular/core';
import { NavController ,App} from 'ionic-angular';

import { LogInPage } from './logIn/logIn';
import { SetUpPage } from './setUp/setUp';
import { HistoryPage } from './history/history';
import { UserNotesPage } from './user-notes/user-notes';
import { SchedulePage } from './schedule/schedule';
import { MyDetailPagePage } from './my-detail-page/my-detail-page';
import { CollectionPage } from './collection/collection';
import { ScorePage } from './score/score';

import { MessagePage } from '../message/message';

import { CommonService } from '../../providers/common/CommonService';
import { CourseService } from '../../providers/course/CourseService';

@Component({
	selector: 'page-myCenter',
	templateUrl: 'myCenter.html'
})
export class MyCenterPage implements OnInit ,OnChanges, DoCheck{
	public isLogin:boolean = false;

  public IntegralTotal:string = "";
  public CreditRecordTotal:string = "";
  public imgUrl:string = "assets/icon/280.jpg";
  public hasName:boolean  = false;
  public realName:string = "";

	@Input('currentUser') currentUser:any = this.commonService.currentUser;
	constructor(public navCtrl: NavController,public commonService:CommonService,private app:App,public courseService:CourseService) {
    if(this.commonService.currentUser !== null){
      this.getCreditRecordTotalByUserID();
      this.getIntegralTotalFindByUserID();
    }
    if(this.commonService.currentDetails !== null && this.commonService.currentDetails.imgUrl !== undefined && this.commonService.currentDetails.imgUrl !== null){
      this.imgUrl = this.commonService.currentDetails.imgUrl;
    }

	}

	ngOnInit() {


	}
  ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
    console.log('Changes', changes);
  }

  getIntegralTotalFindByUserID(){
    this.courseService.getIntegralTotalFindByUserID({
      UserId:this.commonService.currentUser.ReUId
    }).subscribe((data:any) => {
      this.IntegralTotal = data.IntegralTotal;
    });
  }

  getCreditRecordTotalByUserID(){
    this.courseService.getCreditRecordTotalByUserID({
      UserId:this.commonService.currentUser.ReUId
    }).subscribe((data:any) => {
      this.CreditRecordTotal = data.CreditRecordTotal;
    });
  }

  ngDoCheck() {
  	this.currentUser = this.commonService.currentUser;
    if(this.commonService.currentDetails !== null && this.commonService.currentDetails.Name !==null){
      this.realName = this.commonService.currentDetails.Name;
      this.hasName = true;
    }
    
  	if(this.commonService.currentUser){
  		this.isLogin = true;
  	}else{
  		this.isLogin = false;
  	}
    if(this.commonService.currentDetails !== null && this.commonService.currentDetails.imgUrl !== undefined && this.commonService.currentDetails.imgUrl !== null){
      this.imgUrl = this.commonService.currentDetails.imgUrl;
    }
  }

  goSetUp(){
  	if(this.commonService.currentUser !== null){
  		this.navCtrl.push(SetUpPage);
  	}else {
  		this.navCtrl.push(LogInPage);
  	}
  	
  }
  goCollection(){
  	if(this.commonService.currentUser !== null){
  		this.navCtrl.push(CollectionPage);
  	}else {
  		this.navCtrl.push(LogInPage);
  	}
  	
  }
  goLogin(){
  	this.navCtrl.push(LogInPage);
  }
  goMyDetail(){
    this.navCtrl.push(MyDetailPagePage);
  }
  goMail(){
    this.app.getRootNav().push(MessagePage);
  }
  goSchedule(){
    if(this.commonService.currentUser !== null){
      this.navCtrl.push(SchedulePage);
    }else {
      this.navCtrl.push(LogInPage);
    }
  }
  goHistory(){
    if(this.commonService.currentUser !== null){
      this.navCtrl.push(HistoryPage);
    }else {
      this.navCtrl.push(LogInPage);
    }
  }
  goUserNotes(){
    if(this.commonService.currentUser !== null){
      this.navCtrl.push(UserNotesPage);
    }else {
      this.navCtrl.push(LogInPage);
    }
  }

  goScore(){
    if(this.commonService.currentUser !== null){
      this.navCtrl.push(ScorePage);
    }else {
      this.navCtrl.push(LogInPage);
    }
  }


	
}