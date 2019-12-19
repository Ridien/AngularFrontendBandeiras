import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListaComponent } from './lista/lista.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaisComponent } from './pais/pais.component';
import { CountrydetailsComponent } from './countrydetails/countrydetails.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    PaisComponent,
    CountrydetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
