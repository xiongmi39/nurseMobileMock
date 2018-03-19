import { Injectable, Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/*
  Generated class for the SafeUrl pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'safe-url'
})
@Injectable()
export class SafeUrl implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}
  transform(url) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
