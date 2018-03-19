import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController} from 'ionic-angular';

import { LogInPage } from '../logIn/logIn';
import { MyCenterPage } from '../myCenter';
import { MyDetailPagePage } from '../my-detail-page/my-detail-page';

import { CommonService } from '../../../providers/common/CommonService';
import { Localstorage } from '../../../providers/common/LocalStorage';

/*
  Generated class for the SetUpPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-set-up-page',
  templateUrl: 'setUp.html'
})
export class SetUpPage {
  public imgUrl:string = "assets/icon/280.jpg";
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,public commonService:CommonService,public localstorage:Localstorage) {
    if(this.commonService.currentDetails !== null && this.commonService.currentDetails.imgUrl !== undefined && this.commonService.currentDetails.imgUrl !== null){
      this.imgUrl = this.commonService.currentDetails.imgUrl;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetUpPagePage');
  }
  logOut(){
  	let alert = this.alertCtrl.create({
  		title: '确定要登出账号吗？',
  		buttons: [
  		{
  			text: '取消',
  			role: 'cancel',
  			handler: () => {
  				return;
  			}
  		},
  		{
  			text: '确定',
  			handler: () => {
  				this.localstorage.removeItem('currentuser_buzzly_nurse_train');
          this.localstorage.removeItem('userdetail_buzzly_nurse_train');
  				this.commonService.currentUser = null;
          this.commonService.currentDetails = null;
				this.navCtrl.push(MyCenterPage); 
  			}
  		}
  		]
  	});
  	alert.present();
  }

  goMyDetail(){
    this.navCtrl.push(MyDetailPagePage);
  }


}
