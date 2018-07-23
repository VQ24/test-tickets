import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'keepHtml', pure: false })
export class EscapeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(content) {
    // const result = content
    // .split('')
    // .map( item => {
    //   switch (item.charCodeAt()) {
    //     case 10: return '<br>';
    //     case 32: return ' &nbsp';
    //     default: return item;
    //   }
    // });
    // result.push('<br>');

    const result = content
     .split(String.fromCharCode(10))
     .join('<br>')
     .split('  ').join('&nbsp &nbsp');


    // result.forEach(item => console.log(item + ' ' + item.charCodeAt()));
    return this.sanitizer.bypassSecurityTrustHtml(result);
  }
}
