import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ModalController,NavParams,NavController,AlertController} from 'ionic-angular';
import { VideoPlayer } from '@ionic-native/video-player';

import { ModalAddPage } from './modalAddPage/modalAddPage';
import { ModalQPage } from './modalQPage/modalQPage';
import { LogInPage } from '../../myCenter/logIn/logIn';

import { CourseService } from '../../../providers/course/CourseService';
import { CommonService } from '../../../providers/common/CommonService';


@Component({
	selector: 'page-courseLearn',
	templateUrl: 'courseLearn.html'
})
export class CourseLearnPage implements OnInit,OnDestroy {
	@ViewChild('videoCom') videoCom 
	dws: string = "chapter";
	courseDetail:any = this.params.get('CourseDetail');
	chapterDetail:any = this.params.get('ChapterDetail');
	courseNots:any = [];
	courseDiscuss:any = [];
	userId:string = "";
	treeData:any = {};
	currentChapter:string = "";
	isLoading:boolean = true;
	isfull:boolean = false;
	currentPlayTime:string = "";
	isQuestionShown:boolean = false;
	isHideVideo:boolean = false;
	discurPage:number = 0;
	isShowMore:boolean = true;

	constructor(public modalCtrl: ModalController,public params: NavParams,public courseService:CourseService,public commonService:CommonService,private videoPlayer: VideoPlayer,public navCtrl: NavController, private alertCtrl: AlertController) {
		if(this.commonService.currentUser){
			this.userId = this.commonService.currentUser.ReUId;
		}else {
			this.navCtrl.pop();
		}
		this.loadNotes();
		this.loadDiscuss(true);
		// alert('1.5');
		// this.getPlayTimeByCourseIdUserId();


	}

	ngOnInit() {
		this.getPlayTimeByCourseIdUserId();

	}
	ngOnDestroy(){
		// console.log(this.videoCom.videoplayer.nativeElement.currentTime);
		// alert('stop');
		// this.videoCom.videoplayer.nativeElement.pause();
		this.saveHistoryCourse();
	}
	playfull(){
		// this.videoPlayer.play(this.chapterDetail.vodUrl).then(() => {
		// 		alert('video completed');
		// 	}).catch(err => {
		// 			alert(err);
		// 		});
	}
	goAddPage(charNum) {
		if(navigator.userAgent.indexOf("QQ") != -1){
			this.isHideVideo = true;
		}
		let modal = this.modalCtrl.create(ModalAddPage, {
			charNum: charNum,
			userId: this.userId,
			CourseID: this.courseDetail.CourseID
		});
		modal.onDidDismiss(data =>{
			if(data === 'note'){
				this.loadNotes();
			}
			if(data === 'discuss'){
				this.loadDiscuss(true);
			}
			this.isHideVideo = false;
		});
		modal.present();
	}
	toPlay(item){
		this.chapterDetail = item;
		this.videoCom.videoplayer.nativeElement.src = this.chapterDetail.vodUrl;
		this.currentChapter = item.ChapterID;
		// this.videoCom.videoplayer.nativeElement.play();
		// this.videoCom.videoplayer.nativeElement.pause();
	}
	loadNotes(){
		this.courseService.getCourseNotesByUserid({
			CourseID:this.courseDetail.CourseID,
			UserID:this.userId
		}).subscribe((data:any) => {
			this.isLoading = false;
			this.courseNots = data;
		});
	}
	loadDiscuss(isRef){
		if(isRef){
			this.discurPage = 1;
			this.courseDiscuss = [];
			this.isShowMore = true;
		}else{
			this.discurPage ++;
		}
		
		this.courseService.getCourseDiscuss({
			CourseID:this.courseDetail.CourseID,
			pageSize:10,
			pageNumber:this.discurPage
		}).subscribe((data:any) => {
			this.isLoading = false;
			if(data.length < 10){
				this.isShowMore = false;
			}

			this.getFavour(data);
			this.courseDiscuss.push(...data);
			
		});
	}
	delNote(item){
		this.courseService.delNote({
			NoteID: item.NoteID
		}).subscribe((data:any) => {
			if(data === '103'){
				this.loadNotes();
			}
		});
	}

	saveHistoryCourse(){
		this.courseService.saveHistoryCourse({
			UserID:this.commonService.currentUser.ReUId,
			CourseID:this.courseDetail.CourseID,
			ChapterID:this.chapterDetail.ChapterID,
			PlayTime:Math.floor(this.videoCom.videoplayer.nativeElement.currentTime)
		}).subscribe((data:any) => {
			console.log(data);
		});
	}

	giveAgree(item){
		this.courseService.giveAgree({
			TypeID: '4',
			UserID: this.userId,
			MainID: item.QID
		}).subscribe((data:any) => {
			this.loadDiscuss(true);
		});
	}

	// getFavour(item){
	// 	this.courseService.getFavour({
	// 		TypeID: '4',
	// 		UserID: this.userId,
	// 		MainID: item.QID
	// 	}).subscribe((data:any) => {
	// 		if(data == "103"){
	// 			item.hasFavour = true;
	// 		}else{
	// 			item.hasFavour = false;
	// 		}
	// 	});
	// }

	getFavour(data){
		let favors=[];
		data.map((item)=>{
			let favor = {
				UserID:item.UserID,
				MainID:item.QID,
				TypeID:"4"				
			};
			favors.push(favor);
		});

		let favorObj:any = {};
		favorObj.model=favors;
		this.courseService.getFavour(favorObj).subscribe((data:any) => {
			// if(data == "103"){
			// 	item.hasFavour = true;
			// }else{
			// 	item.hasFavour = false;
			// }
			console.log(data);
		});
	}	

	cancelFavor(item){
		this.courseService.cancelFavor({
			TypeID: '4',
			UserID: this.userId,
			MainID: item.QID
		}).subscribe((data:any) => {
			if(data === '103'){
				this.loadDiscuss(true);
			}
		});
	}
			
	stopPlay(e){
		this.isfull = false;
		this.showQuestion();
	}
	startPlay(){
		if(this.currentPlayTime.trim().length == 0){
			return;
		}
		this.videoCom.videoplayer.nativeElement.currentTime = this.currentPlayTime;
		this.currentPlayTime = "";
	}
	showQuestion(){
		if(navigator.userAgent.indexOf("QQ") != -1){
			this.isHideVideo = true;
		}
				
		if(this.isQuestionShown){
			return;
		}
		let modal = this.modalCtrl.create(ModalQPage, {
			CourseID: this.courseDetail.CourseID
		});
		modal.onDidDismiss(data =>{
			if(data === 'success'){
				let alert = this.alertCtrl.create({
					title: '答对了!',
					buttons: [{
						text: '下一节',
						handler: () => {
							this.isHideVideo = false;
						}
					}]
				});
				alert.present();
			}
			if(data === 'hasscore'){
				let alert = this.alertCtrl.create({
					title: '已获得积分',
					buttons: [{
						text: '下一节',
						handler: () => {
							this.isHideVideo = false;
						}
					}]
				});
				alert.present();
			}
			if(data === 'giveup'){
				let alert = this.alertCtrl.create({
					title: '放弃答题没有积分哦',
					buttons: [
					{
						text: '返回答题',
						handler: () => {
							this.showQuestion();
						}
					}
					]
				});
				alert.present();
			}

			this.isQuestionShown = false;
			
		});
		this.isQuestionShown = true;
		modal.present();		
	}
	fullScreen(){
		this.isfull = !this.isfull;
	}

	getPlayTimeByCourseIdUserId(){
		this.courseService.getPlayTimeByCourseIdUserId({
			CourseId:this.courseDetail.CourseID,
			UserID:this.userId
		}).subscribe((data:any) => {
			if(!data){
				return;
			}
			this.courseDetail.chapters.map((item) =>{
				if(item.ChapterID == data.LastPlayChapterID){
					this.toPlay(item);
					this.currentPlayTime = data.PlayTime;
				}
			});
			
		});
	}

	showNoteDelConfirm(item) {
		let confirm = this.alertCtrl.create({
			title: '删除笔记',
			message: '确认要删除此笔记吗?',
			buttons: [
			{
				text: '取消',
				handler: () => {
					return;
				}
			},
			{
				text: '删除',
				handler: () => {
					this.delNote(item);
				}
			}
			]
		});
		confirm.present();
	}


	// ionViewWillUnload(){
	// 	alert('viewunload');
	// }

}

