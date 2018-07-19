import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ROUTES } from './app-routes';

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, {
      useHash: false,
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
