import { Component, OnInit } from '@angular/core';
import { NavController,App } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

import { CourseService } from '../../providers/course/CourseService';
import { CourseDetailPage } from '../course/courseDetail/courseDetail';

@Component({
	selector: 'search',
	templateUrl: './search.html'
})
export class SearchPage implements OnInit {

	courseList:Array<any> = [];
	allCourse:Array<any> = [];
	currentPageNo:number = 1;
	pageSize:number = 30;
	keyWord:string = '';

	getCoursePaging:Observable<any> = Observable.create(observer => {
		this.courseService.getCourseListByPaging({
			pageno: this.currentPageNo,
			pageSize: this.pageSize,
			SortType:'Recommend',
			Data:this.keyWord
		}).subscribe((data:any) => {
			// this.courseList.push(...data);
			this.allCourse = data;
			this.searchCourse('');
			// observer.next();
			// observer.complete();
		});
	});
	constructor(public navCtrl: NavController,public courseService:CourseService,private app:App) {
		console.log('searchCons');
	}

	ngOnInit() {
		this.getCoursePaging.subscribe();
	}

	popView(){
		this.navCtrl.pop();
	}

	searchCourse(ev:any){
		this.courseList = (ev.target) ? this.allCourse.filter((cour) => cour.CourseName.match(ev.target.value)) : this.allCourse;
	}
	goCourseDetail(item){
		this.app.getRootNav().push(CourseDetailPage,{
			CourseID: item.CourseID,
			CourseName: item.CourseName
		});
	}

}