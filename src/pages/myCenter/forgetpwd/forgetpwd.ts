import { Component, OnInit } from '@angular/core';
import { NavController ,AlertController,ToastController,NavParams} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

import { LogInPage } from '../logIn/logIn';

import { HomeService } from '../../../providers/home/HomeService';
import { CommonCheck } from '../../../providers/common/CommonCheck';

/*
  Generated class for the Forgetpwd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forgetpwd',
  templateUrl: 'forgetpwd.html'
})
export class ForgetpwdPage {
	public formData:any = {
		LoginName:"",
		pwd:""
	};
	public rpwd:string = "";
	public msg:string = "";
	public ifShowMsg:boolean = false;
	public sendCount:string = '获取验证码';
	public	SMSCode:string = '';
	public wait:number = 60;
	public  isDisabled:boolean = false;
  constructor(public navCtrl: NavController,public homeService:HomeService,public commonCheck:CommonCheck, private alertCtrl: AlertController,public toastCtrl: ToastController,public params: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpwdPage');
  }

	updatePwd(){
		if(this.commonCheck.isNull(this.formData.LoginName)){
			this.ifShowMsg = true;
			this.msg = "电话号码不能为空";
			return;
		}
		if(!this.commonCheck.isPhone(this.formData.LoginName)){
			this.ifShowMsg = true;
			this.msg = "电话号码不正确";
			return;
		}
		if(this.commonCheck.isNull(this.SMSCode)){
			this.ifShowMsg = true;
			this.msg = "验证码不能为空";
			return;
		}
		if(this.commonCheck.isNull(this.formData.pwd)){
			this.ifShowMsg = true;
			this.msg = "密码不能为空";
			return;
		}
		if(!this.commonCheck.isMinAndMax(this.formData.pwd,6,10)){
			this.ifShowMsg = true;
			this.msg = "请输入6-10位数字或字母";
			return;
		}
		if(this.commonCheck.isNull(this.rpwd)){
			this.ifShowMsg = true;
			this.msg = "确认密码不能为空";
			return;
		}
		if(!this.commonCheck.isEqual(this.formData.pwd,this.rpwd)){
			this.ifShowMsg = true;
			this.msg = "两次输入密码不一致";
			return;
		}
		this.forgetPwd();

	}

	getSMSCodeSend(){
		if(this.isDisabled == true){
			return;
		}
		if(this.commonCheck.isNull(this.formData.LoginName)){
			this.ifShowMsg = true;
			this.msg = "电话号码不能为空";
			return;
		}
		if(!this.commonCheck.isPhone(this.formData.LoginName)){
			this.ifShowMsg = true;
			this.msg = "电话号码不正确";
			return;
		}
		this.isDisabled = true;
		this.homeService.getSMSCodeSend({
			ReguserID: '',
			PhoneNumber: this.formData.LoginName
		}).subscribe((data:any) => {
			let alert = this.alertCtrl.create({
				title: '验证码获取成功',
				buttons: [
				{
					text: data
				}
				]
			});
			alert.present();
			this.time();
		},err =>{
			let toast = this.toastCtrl.create({
				message: '获取验证码失败',
				duration: 1000,
				position: 'top'
			});
			toast.present();
		});
	}

	
	time() {
		if (this.wait == 0) {
			this.sendCount="获取验证码";
			this.wait = 60;
			this.isDisabled = false;
		} else { 
			this.sendCount=this.wait+"s";
			this.wait--;
			setTimeout(()=>{
				this.time();
			},1000);
			this.isDisabled = true;
		}
	}


	forgetPwd() {
		this.homeService.forgetPwd({
			PhoneNumber: this.formData.LoginName,
			code: this.SMSCode,
			pwd: this.formData.pwd
		}).subscribe((data:any) => {
			if(data === "103"){
				let alert = this.alertCtrl.create({
					title: '密码修改成功',
					buttons: [
					{
						text: '去登录',
						handler: () => {
							if(this.params && this.params.get('CourseDetail') && this.params.get('ChapterDetail')){
								this.navCtrl.pop();
							}else{
								this.navCtrl.push(LogInPage); 
							}
						}
					}
					]
				});
				alert.present();
			}else{
				this.ifShowMsg = true;
				this.msg = data;
			}
		
		}); 
	}	 

}
