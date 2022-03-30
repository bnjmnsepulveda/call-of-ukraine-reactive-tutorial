import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSoldierComponent } from './new-soldier/new-soldier.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    NewSoldierComponent 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports:[
    NewSoldierComponent 
  ]
})
export class RegisterModule { }
