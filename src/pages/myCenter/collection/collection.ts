import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

import { CourseService } from '../../../providers/course/CourseService';
import { CommonService } from '../../../providers/common/CommonService';

import { CourseDetailPage } from '../../course/courseDetail/courseDetail';


@Component({
  selector: 'page-collection',
  templateUrl: 'collection.html'
})
export class CollectionPage implements OnInit {
	collectList:Array<any> = [];
	currentPageNo:number = 1;
	pageSize:number = 10;
	keyWord:string = '';
	isLoading:boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,public courseService:CourseService,public commonService:CommonService) {}


	ngOnInit() {
		this.getCollectPaging.subscribe();
	}
  	loadMore(infiniteScroll) {
		// this.currentPageNo++;
		this.getCollectPaging.subscribe(data=>{
			infiniteScroll.complete();
		});
	}
	getCollectPaging:Observable<any> = Observable.create(observer => {
		this.courseService.getUserCourse({
			UserID: this.commonService.currentUser.ReUId
		}).subscribe((data:any) => {
			// this.collectList.push(...data);
			this.collectList = data;
			this.isLoading = false;
			observer.next();
			observer.complete();
		});
	});
	doRefresh(refresher) {
		this.getCollectPaging.subscribe(datas =>{
			refresher.complete();
		},err =>{
			alert('err');
			refresher.complete();
		});
	}
	goCourseDetail(item){
		this.navCtrl.push(CourseDetailPage,{
			CourseID: item.CourseID,
			CourseName: item.CourseName
		});
	}

}
