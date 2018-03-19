import { Component, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
	selector: 'video-component',
	templateUrl: 'video-component.html'
})
export class VideoComponent implements AfterViewInit{
	@Input() public vodUrl:string;
	@Output()  onStop : EventEmitter<any>;
	@Output()  onFull: EventEmitter<any>;
	@Output()  onStart: EventEmitter<any>;

	public IsFullScreen:boolean = false;
	public isLoading:boolean = false;

	@ViewChild('videoplayer') videoplayer 
	constructor() {
		this.onStop = new EventEmitter();
		this.onFull = new EventEmitter();
		this.onStart = new EventEmitter();

		// this.videoplayer.currentTime = this.videoplayer.nativeElement.currentTime;
	}

	ionViewDidLoad() {
	}
	public ngAfterViewInit(){
	}
	pauseEvent(eve){
		// this.onStop.emit();
	}
	playEvent(){
		this.onStart.emit();
	}
	timeChange(){
		// console.log(this.videoplayer.nativeElement.currentTime);
	}
	ended(){
		// console.log('end');
		this.onStop.emit();
	}
	controlFull(){
		if(this.IsFullScreen){
			this.exitFullscreen();
		}else {
			this.fullScreen();
		}
	}
	loadstart(){
		this.isLoading = true;
	}

	fullScreen(){
		this.IsFullScreen = true;
		alert(this.videoplayer.nativeElement);
		if(this.videoplayer.nativeElement.requestFullscreen) {
			this.videoplayer.nativeElement.requestFullscreen();
		} else if(this.videoplayer.nativeElement.mozRequestFullScreen) {
			this.videoplayer.nativeElement.mozRequestFullScreen();
		} else if(this.videoplayer.nativeElement.webkitRequestFullscreen) {
			this.videoplayer.nativeElement.webkitRequestFullscreen();
		} else if(this.videoplayer.nativeElement.msRequestFullscreen) {
			this.videoplayer.nativeElement.msRequestFullscreen();
		} else {
			this.IsFullScreen = false;
		}

		// this.onFull.emit();	
	}

	exitFullscreen(){
		this.IsFullScreen = false;
		if (this.videoplayer.nativeElement.exitFullscreen) {
			this.videoplayer.nativeElement.exitFullscreen();
		} else if (this.videoplayer.nativeElement.msExitFullscreen) {
			this.videoplayer.nativeElement.msExitFullscreen();
		} else if (this.videoplayer.nativeElement.mozCancelFullScreen) {
			this.videoplayer.nativeElement.mozCancelFullScreen();
		} else if(this.videoplayer.nativeElement.oRequestFullscreen){
			this.videoplayer.nativeElement.oCancelFullScreen();
		}else if (this.videoplayer.nativeElement.webkitExitFullscreen){
			this.videoplayer.nativeElement.webkitExitFullscreen();
		}else{
			this.IsFullScreen = true;
		}
	}
	canplay(){
		// alert('canplay');
		this.isLoading = false;
	}

}
