import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RegisterModule } from './presentation/pages/register/register.module';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { NewSoldierComponent } from './presentation/pages/register/new-soldier/new-soldier.component';
import { GameComponent } from './presentation/pages/game/game/game.component';
import { GameModule } from './presentation/pages/game/game.module';
import { SharedModule } from './presentation/shared/shared.module';
import { DocumentProvider } from './core/application/providers/document.provider';
import { InMemoryDocumentService } from './core/application/service/in-memory.document.service';

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

export const DOCUMENT_SERVICE = new InjectionToken<DocumentProvider>('app.document.service');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    RegisterModule,
    GameModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [{
    provide: DOCUMENT_SERVICE,
    useClass: InMemoryDocumentService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
