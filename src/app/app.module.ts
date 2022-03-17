import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RankingModule } from './presentation/pages/ranking/ranking.module';
import { RegisterModule } from './presentation/pages/register/register.module';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { NewSoldierComponent } from './presentation/pages/register/new-soldier/new-soldier.component';

const routes: Routes = [
  { 
    path: 'register', 
    component: NewSoldierComponent
  },
  {
    path: '', 
    redirectTo: '/register', 
    pathMatch: 'full' 
  }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    RegisterModule,
    RankingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
