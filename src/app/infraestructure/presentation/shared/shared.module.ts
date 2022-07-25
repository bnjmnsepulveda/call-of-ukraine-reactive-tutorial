import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './component/title/title.component';
import { SubtitleComponent } from './component/subtitle/subtitle.component';
import { NotifyComponent } from './component/notify/notify.component';
import { PanelComponent } from './component/panel/panel.component';
import { SectionPanelComponent } from './component/section-panel/section-panel.component';



@NgModule({
  declarations: [
    TitleComponent,
    SubtitleComponent,
    NotifyComponent,
    PanelComponent,
    SectionPanelComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    TitleComponent,
    SubtitleComponent,
    NotifyComponent,
    PanelComponent,
    SectionPanelComponent
  ]
})
export class SharedModule { }
