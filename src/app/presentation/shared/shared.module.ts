import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './component/title/title.component';
import { SubtitleComponent } from './component/subtitle/subtitle.component';
import { NotifyComponent } from './component/notify/notify.component';



@NgModule({
  declarations: [
    TitleComponent,
    SubtitleComponent,
    NotifyComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    TitleComponent,
    SubtitleComponent,
    NotifyComponent
  ]
})
export class SharedModule { }
