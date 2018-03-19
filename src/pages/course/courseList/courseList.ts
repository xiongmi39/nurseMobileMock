import { Component, OnInit } from '@angular/core';
import { NavController,App, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';


import { CourseService } from '../../../providers/course/CourseService';

import { CourseDetailPage } from '../../course/courseDetail/courseDetail';

@Component({
	selector: 'course-list',
	templateUrl: 'courseList.html'
})

export class CourseListPage implements OnInit {
	courseList:Array<any> = [];
	currentPageNo:number = 1;
	pageSize:number = 20;
	keyWord:string = '外科课程';
	isLoadmore:boolean = false;
	CourseTypeTitle:string = this.params.get('CourseTypeTitle');
	CourseTypeId:string = this.params.get('CourseTypeId');
	By:string = this.params.get('By');
	isLoading:boolean = true;

	getCoursePaging:Observable<any> = Observable.create(observer => {
		this.courseService.getCourseListByPaging({
			pageno: this.currentPageNo,
			pageSize: this.pageSize,
			SortType:'Recommend',
			Data:this.keyWord
		}).subscribe((data:any) => {
			this.courseList.push(...data);
			observer.next();
			observer.complete();
		});
	});

	getCourseByCourseType:Observable<any> = Observable.create(observer => {
		this.courseService.getCourseByCourseType({
			CourseType: this.CourseTypeId
		}).subscribe((data:any) => {
			this.courseList = data;
			this.isLoading = false;
			observer.next();
			observer.complete();
		});     
	});

	getCourseByHospId:Observable<any> = Observable.create(observer => {
		this.courseService.getCourseByHospId({
			HospId: this.CourseTypeId
		}).subscribe((data:any) => {
			this.courseList = data;
			this.isLoading = false;
			observer.next();
			observer.complete();
		});     
	});

	constructor(public navCtrl: NavController,public courseService:CourseService,private app:App,
		public params: NavParams) {}

	ngOnInit() {
		// this.getCoursePaging.subscribe();
		if(this.By === 'basicDeps'){
			this.getCourseByCourseType.subscribe();
		}else{
			this.getCourseByHospId.subscribe();
		}
		
	}
	popView(){
		this.navCtrl.pop();
	}
	loadMore(infiniteScroll) {
		this.currentPageNo++;
		this.getCoursePaging.subscribe(data=>{
			infiniteScroll.complete();
		});
	}
	goCourseDetail(item){
		this.app.getRootNav().push(CourseDetailPage,{
			CourseID: item.CourseID,
			CourseName: item.CourseName
		});
	}
	doRefresh(refresher) {
		this.courseList = [];
		this.getCoursePaging.subscribe(datas =>{
			refresher.complete();
		},err =>{
			alert('err');
			refresher.complete();
		});
	}
	touchend(e){
		// e.preventDefault();
		// console.log('scroll');
		// alert('end');
		alert('end');
	}
	touchmove(e){
		// alert('move');
		// e.preventDefault();
		// e.stopPropagation();
		console.log(e);
	}


}