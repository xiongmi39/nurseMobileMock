import { Injectable, Pipe , PipeTransform} from '@angular/core';

/*
  Generated class for the Todate pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'todate'
})
@Injectable()
export class Todate implements PipeTransform {
  transform(time:string, arg:string):string {
    var t = new Date(parseInt(time.replace("\/Date(", "").replace("+0800)\/", "")));
    var tf = function(i) {
      return (i < 10 ? '0' : '') + i
    };

    return arg.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
      switch (a) {
        case 'yyyy':
        return tf(t.getFullYear());
        case 'MM':
        return tf(t.getMonth() + 1);
        case 'mm':
        return tf(t.getMinutes());
        case 'dd':
        return tf(t.getDate());
        case 'HH':
        return tf(t.getHours());
        case 'ss':
        return tf(t.getSeconds());
        default:
        break;

      }
    });
  }
}
