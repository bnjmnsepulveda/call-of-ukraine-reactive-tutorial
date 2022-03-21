import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './component/title/title.component';
import { SubtitleComponent } from './component/subtitle/subtitle.component';



@NgModule({
  declarations: [
    TitleComponent,
    SubtitleComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    TitleComponent,
    SubtitleComponent
  ]
})
export class SharedModule { }
