import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'keepHtml', pure: false })
export class EscapeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(content) {
    const result = content
     .split(String.fromCharCode(10))
     .join('<br>')
     .split('  ').join('&nbsp &nbsp');
    return this.sanitizer.bypassSecurityTrustHtml(result);
  }
}
