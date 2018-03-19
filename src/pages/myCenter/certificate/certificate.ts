import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,ToastController } from 'ionic-angular';

import * as interfaceConfig from '../../../appConfig/interfaceConfig';

import { CourseService } from '../../../providers/course/CourseService';
import { CommonService } from '../../../providers/common/CommonService';
import { CommonCheck } from '../../../providers/common/CommonCheck';

@Component({
  selector: 'page-certificate',
  templateUrl: 'certificate.html'
})
export class CertificatePage {
	details:any = {
		realName:'',
		id:'',
		careerid:'',
		careerDate:'',
		CertificatePhoto:'',
		CertificateName:''
	};
	uploadurl:string = interfaceConfig.IMG_HANDLER;
	status:any = {
		ok:'已提交',
		1:'待审核',
		2:'已审核',
		3:'已拒绝'
	};
	idstatus:string = '';
	disableId:boolean = false;
	professionStatus:string = '';
	disablePro:boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,public courseService:CourseService,public commonService:CommonService,public commonCheck: CommonCheck,
    	public toastCtrl: ToastController) {
  	this.getIDAuditStatus();
  	this.getprofessionAuditStatus();
  }

  ionViewDidLoad() {

  }
  changeInput(fieldTitle,val) {
		let alert = this.alertCtrl.create({
			title: fieldTitle,
			inputs: [
			{
				name: val,
				placeholder: fieldTitle
			}
			],
			buttons: [
			{
				text: '取消',
				role: 'cancel',
				handler: data => {
					console.log('Cancel clicked');
				}
			},
			{
				text: '确定',
				handler: data => {
					this.details[val] = data[val];
				}
			}
			]
		});
		alert.present();
	}

	showToast(msg,pos){
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 1000,
			position: pos
		});
		toast.present();
	}

	realNameAuthentication(){
		if(this.commonCheck.isNull(this.details.realName)){
			this.showToast('姓名不能为空','top');
			return;
		}
		if(!this.commonCheck.isMinAndMaxStr(this.details.realName,0,20)){
			this.showToast('请输入真名','top');
			return;
		}		
		if(this.commonCheck.isNull(this.details.id)){
			this.showToast('身份证号不能为空','top');
			return;
		}
		if(!this.commonCheck.isID(this.details.id)){
			this.showToast('身份证号格式不正确','top');
			return;
		}		

		let postData = {
			ReguserID: this.commonService.currentUser.ReUId,
			CertificateType:1,
			CertificateID:this.details.id,
			CertificateName:'身份证',
			Name:this.details.realName
		};
		this.courseService.authenticationInfo({model: postData}).subscribe((data:any) => {
			if(data == '103'){
				this.disableId = true;
				this.idstatus = this.status['ok'];
			}
		}, err =>{
			alert('err');
		});
	} 

	professionAuthentication(){
		if(this.commonCheck.isNull(this.details.careerid)){
			this.showToast('执业证编号不能为空','middle');
			return;
		}

		if(!this.commonCheck.isNoLetter(this.details.careerid)){
			this.showToast('执业证编号格式不正确','middle');
			return;
		}		

		if(this.commonCheck.isNull(this.details.careerDate)){
			this.showToast('执业证有效期不能为空','middle');
			return;
		}

		if(this.commonCheck.isNull(this.details.CertificatePhoto)){
			this.showToast('请先上传图片','middle');
			return;
		}		
		let postData = {
			ReguserID: this.commonService.currentUser.ReUId,
			CertificateType:2,
			CertificateID:this.details.careerid,
			CertificateDate:this.commonService.date2str(this.details.careerDate),
			CertificatePhoto:this.details.CertificatePhoto,
			CertificateName:this.details.CertificateName,
			Name:this.details.realName
		};
		this.courseService.authenticationInfo({model: postData}).subscribe((data:any) => {
			if(data == '103'){
				this.disablePro = true;
				this.professionStatus = this.status['ok'];
			}
		}, err =>{
			alert('err');
		});
	}

	getIDAuditStatus(){
		this.courseService.getAuditStatus({
			ReguserID:this.commonService.currentUser.ReUId,
			CertificateType:1
		}).subscribe((data:any) => {
			if(!data || data.length == 0){
				return;
			}
			if(data[0].AuditStatus == 1 || data[0].AuditStatus == 2){
				this.disableId = true;
				this.details.realName = data[0].Name;
				this.details.id = data[0].CertificateID;
			}
			this.idstatus = this.status[data[0].AuditStatus];
			console.log(data[0]);
		});
	}	

	getprofessionAuditStatus(){
		this.courseService.getAuditStatus({
			ReguserID:this.commonService.currentUser.ReUId,
			CertificateType:2
		}).subscribe((data:any) => {
			if(!data || data.length == 0){
				return;
			}
			if(data[0].AuditStatus == 1 || data[0].AuditStatus == 2){
				this.disablePro = true;
				this.details.careerid = data[0].CertificateID;
				this.details.careerDate = data[0].CertificateDate.split(' ')[0].replace(new RegExp('/', 'g'), "-");
				this.details.CertificateName = data[0].CertificateName;
			}
			this.professionStatus = this.status[data[0].AuditStatus];
		});
	}	

	imageUploaded(e){
		if(e && e.serverResponse._body.length> 0){
			this.details.CertificatePhoto = e.serverResponse.text();
		}
		console.log(e);
	}


}
