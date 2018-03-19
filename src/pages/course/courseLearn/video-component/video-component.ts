import { Component, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
	selector: 'video-component',
	templateUrl: 'video-component.html'
})
export class VideoComponent implements AfterViewInit{
	@Input() public vodUrl:string;
	@Output()  onStop : EventEmitter<any>;

	@ViewChild('videoplayer') videoplayer; 
	constructor() {
		this.onStop = new EventEmitter();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad VideoComponentPage');
	}
	public ngAfterViewInit(){
		console.log(this.videoplayer);

	}
	pauseEvent(eve){
		// console.log('pause');
		this.onStop.emit();
	}
	timeChange(){
		// console.log(this.videoplayer.nativeElement.currentTime);
	}
	ended(){
		// console.log('end');
		// this.onStop.emit();
	}


}
