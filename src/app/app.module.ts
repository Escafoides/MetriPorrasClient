import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PorraComponent } from './porra/porra.component';
import { ApuestaComponent } from './apuesta/apuesta.component';
import { RouterModule, Routes } from '@angular/router';
import { PorraCreateComponent } from './porra-create/porra-create.component';

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
    PorraCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
