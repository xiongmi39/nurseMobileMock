import { Component, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { App } from 'ionic-angular';

import { CourseDetailPage } from '../../pages/course/courseDetail/courseDetail';

@Component({
  selector: 'course-list-component',
  templateUrl: 'course-list-component.html'
})
export class CourseListComponent implements AfterViewInit{
  @Input()  courseList:any;
  

  constructor(private app:App) {

  }

  public ngAfterViewInit(){

  }

  goCourseDetail(item){
    this.app.getRootNav().push(CourseDetailPage,{
      CourseID: item.CourseID,
      CourseName: item.CourseName
    });
  }

}
