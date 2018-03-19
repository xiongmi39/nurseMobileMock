import { Injectable } from '@angular/core';
import { Http ,Jsonp, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import * as interfaceConfig from '../../appConfig/interfaceConfig';
import * as systemParamConfig from '../../appConfig/systemParamConfig';
import {Observable} from 'rxjs/Rx';

import { CommonService } from '../common/CommonService';

@Injectable()
export class CourseService {
	
	constructor(public http:Http,public commonService:CommonService,public jsonp:Jsonp) {
		this.http = http;
	}
	transferImgUrl(data){
		return data.map((item:any)=> {
				item.imgUrl =systemParamConfig.SERVER_RES_IMG_HOME +  item.CourseThumb;
				return item;
			});
	}
	transferVideo(data){
		return data.map((item:any)=> {
				item.vodUrl =systemParamConfig.SERVER_RES_VOD_HOME +  item.ContentUrl;
				return item;
			});
	}
	textToJson(data){
		data._body  = JSON.parse(data.text()) ;
			if(data._body.length > 0){
				let b = data.json();
				return b;
			}
			
	}


	getCourseList(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.GET_COURSE_LIST)).map((res:any)=> {
			// return this.transferImgUrl(res.json().data);
			return res.json().data;
		});
		// let url = this.commonService.getHttpRequestConfig('get',data,interfaceConfig.GET_COURSE_LIST);
		// var params = new URLSearchParams();
		// params.set("callback", "JSONP_CALLBACK");
		// // params.set("callback", "__ng_jsonp__.__req0.finished");
		// // params.set("callback", "__ng_jsonp__.__req1.finished");
		// return this.jsonp.get(url, params).map((res:any)=> {
			// return this.transferImgUrl(res.json());
		// });
	}

	getCourseListByPaging(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.COURSE_FIND_PAGING)).map((res:any)=> {
			// return this.transferImgUrl(res.json());
			return res.json().data;
		});
	}

	getUserCourse(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.GET_USER_COURSE)).map((res:any)=> {
			// return this.transferImgUrl(res.json());
			return res.json().data;
		});
	}

	saveHistoryCourse(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.SAVE_HISTORY_COURSE)).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}

	getPlayTimeByCourseIdUserId(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.GET_PLAYTIME_BY_COURSEIDUSERID)).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}			
		});
	}
//积分
	getIntegralTotalFindByUserID(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.INTEGRAL_TOTAL_FINDBY_USERID)).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}			
		});
	}

	getIntegralFindByUserID(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.INTEGRAL_FINDBY_USERID)).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}			
		});
	}
//学分
	getCreditRecordFindByUserID(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.CREDITRECORD_FINDBY_USERID)).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}			
		});
	}

	getCreditRecordTotalByUserID(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.CREDITRECORD_TOTAL_BY_USERID)).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}			
		});
	}				

	getAuditStatus(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.GET_AUDITSTATUS)).map((res:any)=> {
			return this.textToJson(res);			
		});
	}		

	getCourseHistoryByUserID(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.GET_USER_HISCOURSE)).map((res:any)=> {
			// let resjson = res.json().map((item) => {
			// 	item.Course.imgUrl =systemParamConfig.SERVER_RES_IMG_HOME +  item.Course.CourseThumb;
			// 	return item;	
			// });
			
			// return resjson;
			return res.json().data;
		});
	}		

	getCategoryChapters(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.GET_COURSE_SECTION)).map((res:any)=> {
			// return this.transferVideo(res.json());
			return res.json().data;
		});
	}

	getCourseCatalog(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.GET_CATEGORY)).map((res:any)=> {
			// return this.transferVideo(res.json());
			return res.json().data;
		});
	}
	
	getAllCourse():Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get','',interfaceConfig.GET_ALL_COURSE)).map((res:any)=> {
			// return this.transferImgUrl(res.json());
			return res.json().data;
		});
	}

	getCourseByCourseType(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.COURSE_FIND_ORDERBY_COURSETYPE)).map((res:any)=> {
			// return this.transferImgUrl(res.json());
			return res.json().data;
		});
	}

	getNewCourseDistribute(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.NEW_COURSE_DISTRIBUTE)).map((res:any)=> {
			if(res._body.length > 0){
				return res.json().data;
			}
		});
	}	

	getCourseByHospId(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.COURSE_FIND_ORDERBY_HOSPID)).map((res:any)=> {
			// return this.transferImgUrl(res.json());
			return res.json().data;
		});
	}

	getStudyScheduleByHospdepId(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.STUDYSCHEDULE_FINDBY_HOSPDEPID)).map((res:any)=> {
			// return this.transferImgUrl(res.json());
			return res.json().data;
		});
	}	

	getPlancontentsByHospdepId(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.PLANCONTENTS_FINDBY_HOSPDEPID)).map((res:any)=> {
			// return this.transferImgUrl(res.json());
			return res.json().data;
		});
	}

	getPlancontentsByPlanID(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.PLANCONTENTS_FINDBY_PLANID)).map((res:any)=> {
			// return res.json().map((item:any)=> {
			// 	item.imgUrl =systemParamConfig.SERVER_RES_IMG_HOME +  item.Course.CourseThumb;
			// 	return item;
			// });
			return res.json().data;
		});
	}				

	getAllBasicsDep():Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get','',interfaceConfig.BASICS_DEP_FINDALL)).map((res:any)=> {
			// return res.json().map((item:any)=> {
			// 	item.imgUrl =systemParamConfig.SERVER_RES_IMG_HOME +  item.Basdeplogo;
			// 	return item;
			// });
			return res.json().data;
		});
	}

	getHospitalUnion():Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get','',interfaceConfig.GET_HOSPITAL_UNION)).map((res:any)=> {
			// return res.json().map((item:any)=> {
			// 	item.imgUrl =systemParamConfig.SERVER_RES_IMG_HOME +  item.Hosplogo;
			// 	return item;
			// });
			return res.json().data;
		});
	}

	getHospital(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.GET_HOSPITAL)).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}

	getHospdepByHospId(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.GET_HOSPDEP_BY_HOSPID)).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}			

	getCourseDetails(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.GET_COURSE_DETAILS)).map((res:any)=> {
			let details = res.json();
			// details.imgUrl =systemParamConfig.SERVER_RES_IMG_HOME +  details.CourseThumb;
			return details;
		});
	}

	getCourseNotes(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.GET_NOTES)).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}

	getCourseNotesByUserid(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.GET_NOTES_USERID)).map((res:any)=> {
			if(res._body.length > 0){
				return res.json().data;
			}
		});
	}	

	getUserNotes(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.GET_NOTES_BY_REGUSEERID)).map((res:any)=> {
			if(res._body.length > 0){
				return res.json().data;
			}
		});
	}

	giveAgree(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.GIVE_AGREE)).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}

	// getFavour(data):Observable<any> {
	// 	return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.GET_FAVOUR)).map((res:any)=> {
	// 		if(res._body.length > 0){
	// 			return res.json();
	// 		}
	// 	});
	// }

	getFavour(data):Observable<any> {
		return this.http.post(interfaceConfig.GET_FAVOUR,JSON.stringify(data),this.commonService.getHttpRequestConfig('post','','')).map((res:any)=> {
			// if(res._body.length > 0){
			// 	return res.json();
			// }
			return this.textToJson(res);
		});
	}



	cancelFavor(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.CANCEL_FAVOR)).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}			

	getMessage(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.MESSAGE_FIND)).map((res:any)=> {
			if(res._body.length > 0){
				return res.json().data;
			}
		});
	}	

	getStatecode():Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get','',interfaceConfig.STATE_CODE)).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}

	getCourseQuestion(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.GET_QUESTION)).map((res:any)=> {
			// return this.textToJson(res);
			return res.json().data;
			
		});
	}

	getAnswerByUserCourseID(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.GET_ANSWER_BY_USERCOURSEID)).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}	

	getCourseDiscuss(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.GET_DISCUSS)).map((res:any)=> {
			if(res._body.length > 0){
				// return res.json().map((item:any)=> {
				// 	if(item.HeadImg !== null){
				// 		item.imgUrl =interfaceConfig.base+ '/FX/' +  item.HeadImg;
				// 	}else{
				// 		item.imgUrl = "assets/icon/280.jpg";
				// 	}

				// 	return item;
				// });
				return res.json().data;
			}
		});
	}

	delNote(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.DEL_NOTE)).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}

	checkHasCollect(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.CHECK_HAS_COLLECT)).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}	

	collectCourse(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.COLLECT_COURSE)).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}
	deleteCollection(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.DELETE_COLLECTION)).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}

		

	addNote(data):Observable<any> {
		return this.http.post(interfaceConfig.ADD_NOTE,JSON.stringify(data),this.commonService.getHttpRequestConfig('post','','')).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}

	addDiscuss(data):Observable<any> {
		return this.http.post(interfaceConfig.ADD_DISCUSS,JSON.stringify(data),this.commonService.getHttpRequestConfig('post','','')).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}

	updateUser(data):Observable<any> {
		return this.http.post(interfaceConfig.UPDATE_USER,JSON.stringify(data),this.commonService.getHttpRequestConfig('post','','')).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}

	authenticationInfo(data):Observable<any> {
		return this.http.post(interfaceConfig.AUTHENTICATION_INFO,JSON.stringify(data),this.commonService.getHttpRequestConfig('post','','')).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}	


	addAnswerList(data):Observable<any> {
		return this.http.post(interfaceConfig.ADD_ANSWERLIST,JSON.stringify(data),this.commonService.getHttpRequestConfig('post','','')).map((res:any)=> {
			if(res._body.length > 0){
				return res.json();
			}
		});
	}		

	imgHandler(formData,options):Observable<any> {
		return this.http.post(interfaceConfig.IMG_HANDLER,formData,options).map((res:any)=> {
			return res;
		});
	}		

	getUserByRUid(data):Observable<any> {
		return this.http.get(this.commonService.getHttpRequestConfig('get',data,interfaceConfig.FIND_BY_RUID)).map((res:any)=> {
			let resItem = res.json();
			if(resItem.HeadImg !== null){
				// resItem.imgUrl = interfaceConfig.base+ '/FX/'+resItem.HeadImg;
				resItem.imgUrl = resItem.HeadImg;
			}
		
			return resItem;
		});
	}	
}