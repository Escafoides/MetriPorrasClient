import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PorraComponent } from './porra/porra.component';
import { ApuestaComponent } from './apuesta/apuesta.component';
import { RouterModule, Routes } from '@angular/router';
import { PorraCreateComponent } from './porra-create/porra-create.component';

// import alert service and component
import { AlertComponent } from './_directives/index';
import { AlertService } from './_services/index';

const appRoutes: Routes = [
  {
    path: 'porras',
    component: PorraComponent,
    data: { title: 'Lista de Porras' }
  },
  {
    path: 'porras/:id/apuestas',
    component: ApuestaComponent,
    data: { title: 'Apuestas de la Porra' }
  },
  {
    path: 'porra-create',
    component: PorraCreateComponent,
    data: { title: 'Nueva Porra' }
  },
  { path: '',
    redirectTo: '/porras',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PorraComponent,
    ApuestaComponent,
    AlertComponent,
    PorraCreateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, //Animaciones
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
