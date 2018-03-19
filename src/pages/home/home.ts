import {Component,OnInit,Input,SimpleChange, ViewChild} from '@angular/core';

import { NavController,App,ToastController,LoadingController ,Refresher } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';


import { CourseService } from '../../providers/course/CourseService';
import { CommonService } from '../../providers/common/CommonService';

import { SearchPage } from '../search/search';
import { CourseDetailPage } from '../course/courseDetail/courseDetail';
import { QuestionlistPage } from '../questionlist/questionlist';
import { Localstorage } from '../../providers/common/LocalStorage';
import { CourseListPage } from '../course/courseList/courseList';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @Input('dataMap') dataMap:any = {
    recommends:   [],
    newCourses:   [],
    courseHot:  [],
    newCourseDistribute:[{
      imgUrl:'',
      CourseName:'',
      DistributeTime:''
    }]

  }; 
  @Input('isRefreshDone') isRefreshDone:boolean;
  admins:Object;
  isLoading:boolean = true;

  //课程推荐
  getRecommends:Observable<any> = Observable.create(observer => {
      this.courseService.getCourseList({
        FieldName: 'Recommend',
        Number: 4
      }).subscribe((data:any) => {
        this.dataMap.recommends = data;
        
        observer.next();
        observer.complete();
      }, err =>{
        let toast = this.toastCtrl.create({
          message: '网络错误',
          duration: 3000,
          position: 'middle'
        });
        toast.present();
      });
  });
  //新课程
  getNewCourse:Observable<any> = Observable.create(observer => {
    this.courseService.getCourseList({
      FieldName: 'NewTime',
      Number: 4
    }).subscribe((data:any) => {
      this.dataMap.newCourses = data;
      
      observer.next();
      observer.complete();
    });     
  });
  //热门课程
  getCourseHot:Observable<any> = Observable.create(observer => {
    this.courseService.getCourseList({
      FieldName: 'CourseHot',
      Number: 4
    }).subscribe((data:any) => {
      this.dataMap.courseHot = data;
      
      observer.next();
      observer.complete();
    });     
  });

  getNewCourseDistribute:Observable<any> = Observable.create(observer => {
    this.courseService.getNewCourseDistribute({
      DistributeType: '1',
      ReceiverID: '11'
    }).subscribe((data:any) => {
      this.dataMap.newCourseDistribute = data;
      this.dataMap.newCourseDistribute.map((item)=>{
        this.courseService.getCourseDetails({
          CourseID: item.CourseID
        }).subscribe((data:any) =>{
          item.imgUrl = data.imgUrl;
          item.CourseName = data.CourseName;
          item.DistributeTime = this.commonService.str2date(data.DistributeTime, 'yyyy-MM-dd ');
        });
      });

        // this.courseService.getCourseDetails({
        //   CourseID: data[0].CourseID
        // }).subscribe((data:any) =>{
        //   data[0].imgUrl = data.imgUrl;
        //   data[0].CourseName = data.CourseName;
        //   data[0].DistributeTime = this.commonService.str2date(data[0].DistributeTime, 'yyyy-MM-dd ');
        // });
      
      observer.next();
      observer.complete();
    });     
  });

  obs:Observable<any> = Observable.forkJoin(
      this.getRecommends,
      this.getNewCourse,
      this.getCourseHot,
      this.getNewCourseDistribute
      );


  constructor(public navCtrl: NavController,public courseService:CourseService,private app:App,
    public toastCtrl: ToastController,public loadingCtrl: LoadingController,public commonService: CommonService,public localstorage: Localstorage) {
    this.courseService = courseService;
    // let loader = this.loadingCtrl.create({
    //   content: "Please wait...",
    //   duration: 2000
    // });
    // loader.present();
    let localhomedata = null;
    if(this.localstorage.getItem('homedata_buzzly_nurse_train')){
      localhomedata = JSON.parse(this.localstorage.getItem('homedata_buzzly_nurse_train'));
    }
  
    if(localhomedata && localhomedata.recommends && localhomedata.newCourses && localhomedata.courseHot){
      this.dataMap =  localhomedata;
    }
    
    this.obs.subscribe(datas =>{
      this.localstorage.setItem('homedata_buzzly_nurse_train',JSON.stringify(this.dataMap));
      this.isLoading = false;
    });
    let localUserData = JSON.parse(this.localstorage.getItem('currentuser_buzzly_nurse_train'));
    if(localUserData!== null && localUserData.ReUId !== null){
      this.getUserByRUid(localUserData.ReUId);
    }
    
  }

  doRefresh(refresher) {
    this.obs.subscribe(datas =>{
      refresher.complete();
    },err =>{
      let toast = this.toastCtrl.create({
        message: '网络错误',
        duration: 1000,
        position: 'middle'
      });
      toast.present();
      refresher.complete();
    });
  }

   ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
    console.log('Changes', changes);
  }
  
  loadMore(infiniteScroll) {
    // infiniteScroll.preventDefault();
    console.log(infiniteScroll);
  }
  swipeEvent(e){
    alert("swipe");
    alert(e);
  }
  touchstart(e){
    // e.preventDefault();
  }

  ngOnInit():void{
// console.log(this.refresh.r);
// this.refresh.r;
// this.refresh.nativeElement;

    // this.courseService.getAllCourse().subscribe((data:any) => {
    //   this.admins = data;
    // });
  }
  goSearch() {
    this.navCtrl.push(SearchPage); 
  }

  goCourseDetail(item) {
    this.app.getRootNav().push(CourseDetailPage,{
      CourseID: item.CourseID,
      CourseName: item.CourseName
    });
    // this.navCtrl.push(CourseDetailPage,{
    //   CourseID: item.CourseID,
    //   CourseName: item.CourseName
    // });
  }

  goCourse(){
    this.navCtrl.parent.select(1); 
  }

  goCourseList(BasdeptName,BasdepId) {
    this.navCtrl.push(CourseListPage,{
      CourseTypeTitle:BasdeptName,
      CourseTypeId:BasdepId,
      By:'basicDeps'
    });      
  }
  goQuestionlist(){
    this.navCtrl.push(QuestionlistPage);
  }

  getUserByRUid(ReUId){

    this.courseService.getUserByRUid({
      rud:ReUId
    }).subscribe((data:any) => {

      let localdata:any = {};
      localdata.Name = data.Name;
      localdata.imgUrl = data.imgUrl;
    this.localstorage.setItem('userdetail_buzzly_nurse_train',JSON.stringify(localdata));
      this.commonService.currentDetails = data;
    });
  }

}
