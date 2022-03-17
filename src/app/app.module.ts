import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RankingModule } from './presentation/pages/ranking/ranking.module';
import { SoldierRankingComponent } from './presentation/pages/ranking/soldier-ranking/soldier-ranking.component';
import { RegisterModule } from './presentation/pages/register/register.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RegisterModule,
    RankingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
