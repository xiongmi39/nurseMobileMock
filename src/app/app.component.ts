import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { CommonService } from '../providers/common/CommonService';
import { Localstorage } from '../providers/common/LocalStorage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  public currentUser:any = null;
  public currentDetails:any = null;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public commonService:CommonService, public localStorage:Localstorage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    if(this.localStorage.getItem('currentuser_buzzly_nurse_train') !== null){
      this.currentUser = JSON.parse(this.localStorage.getItem('currentuser_buzzly_nurse_train'));
    }
    if(this.localStorage.getItem('userdetail_buzzly_nurse_train') !== null){
      this.currentDetails = JSON.parse(this.localStorage.getItem('userdetail_buzzly_nurse_train'));
    }
    
    commonService.currentUser = this.currentUser;
    commonService.currentDetails = this.currentDetails;
  }
}
