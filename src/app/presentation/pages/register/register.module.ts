import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSoldierComponent } from './new-soldier/new-soldier.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NewSoldierComponent 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports:[
    NewSoldierComponent 
  ]
})
export class RegisterModule { }
