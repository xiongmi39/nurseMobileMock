import { Component, Input, OnInit} from '@angular/core';
import { NavController,App} from 'ionic-angular';

import { SearchPage } from '../search/search';
import { MessagePage } from '../message/message';

@Component({
	selector: 'header-bar',
	templateUrl: 'HeaderbarComponent.html'
})
export class HeaderbarComponent implements OnInit {
	@Input()
	public panelTitle:string;
	public panelImg:string;

	constructor(public navCtrl: NavController,private app:App) {
		this.navCtrl = navCtrl;
	}

    ngOnInit() {
      //组件初始化完成之后，panelTitle才会有值
      // console.log(this.panelImg);
      // console.log(this.panelTitle);
  	}

	goSearch() {
		this.app.getRootNav().push(SearchPage);
		// this.navCtrl.push(SearchPage); 
	}
	goMail(){
		this.app.getRootNav().push(MessagePage);
	}
}