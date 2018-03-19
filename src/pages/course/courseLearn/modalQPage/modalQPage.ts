import { Component} from '@angular/core';
import { Platform, NavParams, ViewController,ToastController } from 'ionic-angular';

import { CourseService } from '../../../../providers/course/CourseService';
import { CommonService } from '../../../../providers/common/CommonService';


@Component({
  selector: 'modal-Q-page',
  templateUrl: 'modalQPage.html'
})
export class ModalQPage {
  CourseID:string = this.params.get('CourseID');
  CourseQuestions:any = [];
  showQuestionType:any = [];
  showQuestions:any = {};
  CourseAnswer:any = {};
  wrongQ:any = [];

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public courseService: CourseService,
    public toastCtrl: ToastController,
    public commonService: CommonService
  ) {

   this.getQuestions();


  }

  dismiss() {
    this.viewCtrl.dismiss('giveup');
  }
  send(){
    this.addAnswerList();
  }

  getQuestions(){
    this.courseService.getCourseQuestion({
      ChapterID:this.CourseID
    }).subscribe((data:any) => {
      if(!data){
        return;
      }
      this.CourseQuestions = data;
      this.CourseQuestions.map((item) => {
        if(item.TypeName == "多选题"){
          item.multi = true;
          this.CourseAnswer[item.Qid]  = {};
        }else{
          item.multi = false;
          this.CourseAnswer[item.Qid]  = "";
        }
        
        var arrb = item.AnswersList.split(',');
        let arr = [];
        for(let i =0;i<arrb.length;i++){
          let tmp = arrb[i].split(':');
          if(tmp[1].trim().length > 0){
            let item:any = {};
            item.Qt = tmp[0];
            item.Qc = tmp[1];
            arr.push(item);            
          }
        }
        item.AnswersList = arr;
        item.wrong = false;

        if(!this.showQuestions[item.TypeName]){
          this.showQuestions[item.TypeName] = [];
          this.showQuestions[item.TypeName].push(item);
          this.showQuestionType.push(item.TypeName);
        }else{
          this.showQuestions[item.TypeName].push(item);
        }

      });
    });
  }

  getAnswerByUserCourseID(){
    this.courseService.getAnswerByUserCourseID({
      UserID:this.commonService.currentUser.ReUId,
      CourseID:this.CourseID
    }).subscribe((data:any) => {
      console.log(data);
    });
  }

  addAnswerList(){
    let  postData:any = [];
    let send:boolean = true;
    this.CourseQuestions.map((item)=>{
      item.rightKey = "";
      let answer:any = {};
     answer.CourseID = item.ChapterID;
      answer.QID = item.Qid;

      if(typeof this.CourseAnswer[item.Qid] === "object"){
        let str:string = "";
        for(let i in this.CourseAnswer[item.Qid]){
          if(this.CourseAnswer[item.Qid][i] === true){
            str += i;
          }
          
        }
        answer.Results = str.split('').sort().join("");
      }else{
        answer.Results = this.CourseAnswer[item.Qid];        
      }
      if(answer.Results.trim().length == 0 ){
          send = false;
        }
      answer.UserID=this.commonService.currentUser.ReUId 
      postData.push(answer);
    });
    if(!send){
      let toast = this.toastCtrl.create({
        message: '请回答全部问题',
        duration: 500,
        position: 'middle'
      });
      toast.present();
      return ;
    }
   console.log(postData);

    this.courseService.addAnswerList({model: postData}).subscribe((data:any) => {
      if(data.restag == '103'){
        if(data.list.length > 0){
          let toast = this.toastCtrl.create({
            message: '有错题，再看看',
            duration: 1000,
            position: 'middle'
          });
          toast.present();
          console.log(data.list);
          this.wrongQ = data.list;
          this.showRightAnswer();
        }else{
          this.viewCtrl.dismiss('success');
        }
        
      }else if(data.restag == '104已获得积分'){
        this.viewCtrl.dismiss('hasscore');
      }else {
        this.viewCtrl.dismiss('failure');
      }
    }, err =>{
      alert('err');
    });
  }
  showRightAnswer(){
    this.CourseQuestions.map((item)=>{
      item.wrong = false;
      for(let i = 0;i< this.wrongQ.length;i++){
        if(this.wrongQ[i].QID == item.Qid){
          item.wrong = true;
          item.rightKey = "  正确答案：（"+this.wrongQ[i].Rightkey+"）";
        }
      }
    });
  } 



}