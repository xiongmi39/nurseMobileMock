import { Component, OnInit } from '@angular/core';
import { NavController,NavParams,ViewController,LoadingController } from 'ionic-angular';

import { RegisterPage } from '../register/register';
import { ForgetpwdPage } from '../forgetpwd/forgetpwd';
import { MyCenterPage } from '../../myCenter/myCenter';
import { CourseLearnPage } from '../../course/courseLearn/courseLearn';

import {Md5} from "ts-md5/dist/md5";

import { HomeService } from '../../../providers/home/HomeService';
import { CommonCheck } from '../../../providers/common/CommonCheck';
import { CommonService } from '../../../providers/common/CommonService';
import { CourseService } from '../../../providers/course/CourseService';
import { Localstorage } from '../../../providers/common/LocalStorage';


@Component({
	selector: 'login-page',
	templateUrl: 'logIn.html'
})
export class LogInPage implements OnInit {
	public formData:any = {
		Name:"18011111111",
		Pwd:"123456"
	};
	public msg:string = "";
	public ifShowMsg:boolean = false;
	constructor(public navCtrl: NavController,public homeService:HomeService,public commonCheck:CommonCheck,public commonService:CommonService,public courseService:CourseService,public params: NavParams,
    public viewCtrl: ViewController,public loadingCtrl: LoadingController,public localstorage: Localstorage) {
		console.log('login');
	}

	ngOnInit() {
		
	}
	goRegister() {

		if(this.params && this.params.get('CourseDetail') && this.params.get('ChapterDetail')){
			this.navCtrl.push(RegisterPage,{
				CourseDetail:this.params.get('CourseDetail'),
				ChapterDetail: this.params.get('ChapterDetail')
			});
		}else{
			this.navCtrl.push(RegisterPage); 
		}
	}
	logIn(){
		if(this.commonCheck.isNull(this.formData.Name)){
			this.ifShowMsg = true;
			this.msg = "用户名不能为空";
			return;
		}

		if(!this.commonCheck.isPhone(this.formData.Name)){
			this.ifShowMsg = true;
			this.msg = "电话号码不正确";
			return;
		}

		if(this.commonCheck.isNull(this.formData.Pwd)){
			this.ifShowMsg = true;
			this.msg = "密码不能为空";
			return;
		}

		this.homeService.login({model: this.formData}).subscribe((data:any) => {
			if(data.restag === "103"){
				this.localstorage.setItem('currentuser_buzzly_nurse_train',JSON.stringify(data.model));
				this.commonService.currentUser = data.model;
				this.getUserByRUid();
				if(this.params && this.params.get('CourseDetail') && this.params.get('ChapterDetail')){
						this.navCtrl.pop();
					}else{
						this.navCtrl.push(MyCenterPage); 
					}

				}else if (data.restag === "101"){
					this.ifShowMsg = true;
					this.msg = "用户不存在";
				}else if (data.restag === "102"){
					this.ifShowMsg = true;
					this.msg = "密码错误";
				}else if (data.restag === "104"){
					this.ifShowMsg = true;
					this.msg = "登录失败";
				}
		}, err =>{
			this.ifShowMsg = true;
			this.msg = "登录失败";
		});

		let loader = this.loadingCtrl.create({
			content: "登录中...",
			duration: 3000
		});
		loader.present();


	}
	dismiss(){
		this.viewCtrl.dismiss();
	}

	getUserByRUid(){
		this.courseService.getUserByRUid({
			rud:this.commonService.currentUser.ReUId
		}).subscribe((data:any) => {

			let localdata:any = {};
			localdata.Name = data.Name;
			localdata.imgUrl = data.imgUrl;
		this.localstorage.setItem('userdetail_buzzly_nurse_train',JSON.stringify(localdata));
			this.commonService.currentDetails = data;
		});
	}

	goForgetPwd(){

		if(this.params && this.params.get('CourseDetail') && this.params.get('ChapterDetail')){
			this.navCtrl.push(ForgetpwdPage,{
				CourseDetail:this.params.get('CourseDetail'),
				ChapterDetail: this.params.get('ChapterDetail')
			});
		}else{
			this.navCtrl.push(ForgetpwdPage); 
		}
	}	


}