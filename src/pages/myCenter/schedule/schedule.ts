import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

import { CourseService } from '../../../providers/course/CourseService';

import { CourseDetailPage } from '../../course/courseDetail/courseDetail';

import { PlanCourseListPage } from './plan-course-list/plan-course-list';

/*
  Generated class for the Schedule page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
	courseList:any = [];
  schedules:any = [];
	HospdepId:string = "0000000001";
  constructor(public navCtrl: NavController, public navParams: NavParams,public courseService:CourseService) {
  	this.getStudyScheduleByHospdepId.subscribe();
  }

  ionViewDidLoad() {
    
  }

  getStudyScheduleByHospdepId:Observable<any> = Observable.create(observer => {
  	this.courseService.getStudyScheduleByHospdepId({
  		HospdepId: this.HospdepId
  	}).subscribe((data:any) => {
  		this.schedules = data;

  		observer.next();
  		observer.complete();
  	});     
  });

  // getPlancontentsByHospdepId:Observable<any> = Observable.create(observer => {
  //   this.courseService.getPlancontentsByHospdepId({
  //     HospdepId: this.HospdepId
  //   }).subscribe((data:any) => {
  //     this.courseList = data;

  //     observer.next();
  //     observer.complete();
  //   });     
  // });  

  goPlanCourseList(item){
    this.navCtrl.push(PlanCourseListPage,{
      PlanID:item.PlanID,
      PlanName:item.PlanName
    });  
  }

}
