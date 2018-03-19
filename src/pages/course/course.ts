import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CourseListPage } from './courseList/courseList';
import { CourseService } from '../../providers/course/CourseService';

@Component({
	selector: 'page-course',
	templateUrl: 'course.html'
})
export class CoursePage implements OnInit {
	basicDeps:any = [];
	hospitalUnion:any = [];
	isLoading:boolean = true;
	constructor(public navCtrl: NavController,public courseService:CourseService) {
		this.getBasicDep();
		this.getHospitalUnion();
	}

	ngOnInit() {
		
	}
	goCourseList(item,type) {
		if(type === 'basicDeps'){
			this.navCtrl.push(CourseListPage,{
				CourseTypeTitle:item.BasdeptName,
				CourseTypeId:item.BasdepId,
				By:type
			});			
		}
		if(type === 'hospital'){
			this.navCtrl.push(CourseListPage,{
				CourseTypeTitle:item.HospName,
				CourseTypeId:item.HospId,
				By:type
			});				
		}

	}

	getBasicDep(){
		this.courseService.getAllBasicsDep().subscribe((data:any) => {
			this.basicDeps = data;
			this.isLoading = false;
		});
	}
	getHospitalUnion(){
		this.courseService.getHospitalUnion().subscribe((data:any) => {
			this.hospitalUnion = data;
		});
	}	
}