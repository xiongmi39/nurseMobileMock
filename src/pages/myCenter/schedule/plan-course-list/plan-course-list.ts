import { Component } from '@angular/core';
import { NavController, NavParams,App } from 'ionic-angular';

import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

import { CourseService } from '../../../../providers/course/CourseService';
import { CourseDetailPage } from '../../../course/courseDetail/courseDetail';

/*
  Generated class for the PlanCourseList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-plan-course-list',
  templateUrl: 'plan-course-list.html'
})
export class PlanCourseListPage {
	planId:string = this.navParams.get('PlanID');
	PlanName:string = this.navParams.get('PlanName');
	courseList:any = [];
  isLoading:boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,public courseService:CourseService,private app:App) {
  	this.getPlancontentsByPlanID.subscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlanCourseListPage');
  }

  getPlancontentsByPlanID:Observable<any> = Observable.create(observer => {
  	this.courseService.getPlancontentsByPlanID({
  		PlanID: this.planId
  	}).subscribe((data:any) => {
  		this.courseList = data;
      this.isLoading = false;
  		observer.next();
  		observer.complete();
  	});     
  });

  goCourseDetail(item){
    this.app.getRootNav().push(CourseDetailPage,{
      CourseID: item.CourseID,
      CourseName: item.CourseName
    });
  }

}
