import { Component, OnInit } from '@angular/core';
import { NavController,Platform, NavParams, ViewController, Events,ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

import { CourseService } from '../../../providers/course/CourseService';
import { CommonService } from '../../../providers/common/CommonService';

import { CourseLearnPage } from '../courseLearn/courseLearn';
import { LogInPage } from '../../myCenter/logIn/logIn';

@Component({
	selector: 'page-courseDetail',
	templateUrl: 'courseDetail.html'
})
export class CourseDetailPage implements OnInit {
	courseId:string = this.params.get('CourseID');
	courseName:string = this.params.get('CourseName');
	courseItem:any = {};
	isCollected:boolean = false;
	treeData:any = {};
	isLoading:boolean = true;
	constructor(
		public navCtrl: NavController,
		public platform: Platform,
		public params: NavParams,
		public viewCtrl: ViewController,
		public courseService:CourseService,
		public commonService:CommonService,
		public events:Events,
    	public toastCtrl: ToastController		
		) {
		this.getCourseDetail();
		if(this.commonService.currentUser !== null && this.commonService.currentUser !== undefined){
			this.checkHasCollect();
		}
	
	}

	ngOnInit() {
		// this.getCourseDetail();
	}
	
	getCourseDetail() {
		this.courseService.getCourseDetails({
			CourseID: this.courseId
		}).subscribe((data:any) =>{
			this.courseItem = data;
			this.obs.subscribe(datas =>{
				this.makeTreeData();
				this.isLoading = false;
			});
		});
	}

	getCategoryChapters:Observable<any> = Observable.create(observer => {
		this.courseService.getCategoryChapters({
			CourseID: this.courseId
		}).subscribe((data:any) =>{
			this.courseItem.chapters = data;
			observer.next();
			observer.complete();
		});
	});

	getCourseCatalog:Observable<any> = Observable.create(observer => {
		this.courseService.getCourseCatalog({
			CourseID: this.courseId
		}).subscribe((data:any) =>{
			this.courseItem.catalog = data;
			observer.next();
			observer.complete();
		});
	});	

	obs:Observable<any> = Observable.forkJoin(
		this.getCategoryChapters,
		this.getCourseCatalog
		);

	makeTreeData(){
		var treelist = this.courseItem.catalog.map(cat =>{
			this.treeData[cat.CatalogName] = [];
			this.courseItem.chapters.map(chapter =>{
				if(cat.CatalogID === chapter.CatalogID){
					this.treeData[cat.CatalogName].push(chapter);
				}
			});
		});
		this.courseItem.treeData = this.treeData;
	}

	goCourseLearn(courseItem,chapteritem){
		if(courseItem == null   || !courseItem.chapters){
			return;
		}
		if(!chapteritem){
			chapteritem = courseItem.chapters[0];
		}
		if(this.commonService.currentUser !== null){

			this.navCtrl.push(CourseLearnPage,{
				CourseDetail:courseItem,
				ChapterDetail: chapteritem
			});
		}else {
			this.navCtrl.push(LogInPage,{
				CourseDetail:courseItem,
				ChapterDetail: chapteritem
			});
		}

	}

	checkHasCollect(){
		this.courseService.checkHasCollect({
			UserID: this.commonService.currentUser.ReUId,
			CourseID: this.courseId
		}).subscribe((data:any) => {
			if(data === '103'){
				this.isCollected = true;
			}else{
				this.isCollected = false;
			}
		});
	}

	collectControl(){
		if(this.commonService.currentUser == null){
			this.navCtrl.push(LogInPage,{
				CourseDetail:this.courseItem,
				ChapterDetail: this.courseItem.chapters[0]
			});
		}else{
			if(this.isCollected){
				this.cancelCollection();
			}else{
				this.collectCourse();
			}		
		}

	}

	collectCourse(){
		this.courseService.collectCourse({
					UserID: this.commonService.currentUser.ReUId ,
					CourseID:this.courseId
		}).subscribe((data:any) =>{
			// this.events.publish('collected');
			if(data === '103'){
				this.isCollected = true;
				let toast = this.toastCtrl.create({
					message: '已收藏',
					duration: 1000,
					position: 'middle'
				});
				toast.present();
			}else if (data === '100'){
				this.isCollected = true;
				this.cancelCollection();

			}else{
				let toast = this.toastCtrl.create({
					message: '收藏失败',
					duration: 1000,
					position: 'middle'
				});
				toast.present();
			}
			
		});
	}

	cancelCollection(){
		this.courseService.deleteCollection({
			UserID: this.commonService.currentUser.ReUId ,
			CourseID:this.courseId
		}).subscribe((data:any) =>{
			if(data === '103'){
				this.isCollected = false;
				let toast = this.toastCtrl.create({
					message: '已取消',
					duration: 1000,
					position: 'middle'
				});
				toast.present();
			}else if (data === '100'){
				let toast = this.toastCtrl.create({
					message: '取消失败',
					duration: 1000,
					position: 'middle'
				});
				toast.present();
			}			
		});
	}

}