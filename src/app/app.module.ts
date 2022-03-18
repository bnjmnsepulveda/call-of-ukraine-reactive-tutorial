import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RegisterModule } from './presentation/pages/register/register.module';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { NewSoldierComponent } from './presentation/pages/register/new-soldier/new-soldier.component';
import { GameComponent } from './presentation/pages/game/game/game.component';
import { GameModule } from './presentation/pages/game/game.module';

const routes: Routes = [
  {
    path: '', 
    redirectTo: '/register', 
    pathMatch: 'full' 
  },
  { 
    path: 'register', 
    component: NewSoldierComponent
  },
  { 
    path: 'game', 
    component: GameComponent
  },
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    RegisterModule,
    GameModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
