import { Injectable ,} from '@angular/core';
import { Http ,RequestOptions,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import * as interfaceConfig from '../../appConfig/interfaceConfig';
import * as systemParamConfig from '../../appConfig/systemParamConfig';
import {Observable} from 'rxjs/Rx';

import { CommonService } from '../common/CommonService';

@Injectable()
export class HomeService {
	
	constructor(public http:Http,public commonService:CommonService) {}

	// login(data):Observable<any> {
	// 	return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.LOGIN)).map((res:any)=> {
	// 		return res.json();
	// 	});
	// }

	login(data):Observable<any> {
		return this.http.post(interfaceConfig.LOGIN,JSON.stringify(data),this.commonService.getHttpRequestConfig('post','','')).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}	

	regist(data):Observable<any> {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let options: RequestOptions = new RequestOptions();
		options.headers = headers;
		return this.http.post(interfaceConfig.REGIST,JSON.stringify(data),this.commonService.getHttpRequestConfig('post','','')).map((res:any)=> {
			return res.json();
		});
	}

	updatePwd(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.UPDATEPWD)).map((res:any)=> {
			return res.json();
		});
	}

	forgetPwd(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.FORGETPWD)).map((res:any)=> {
			return res.json();
		});
	}

	getSMSCodeSend(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.SMS_CODESEND)).map((res:any)=> {
			return res.json();
		});
	}

	getSMSVerification(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.SMS_VERIFICATION)).map((res:any)=> {
			return res.json();
		});
	}

}