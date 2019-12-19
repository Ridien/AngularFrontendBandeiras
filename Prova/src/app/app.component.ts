import { Component, OnInit, ViewChild } from '@angular/core';
import { ListaComponent } from './lista/lista.component';
import { PaisComponent } from './pais/pais.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tela:number = 1;
  menu = 'Pais';
  countrydetails: String;
  selectedRegion: String;
  selectedCountry: String;
  mostrar = 0;
  regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  Countries: any;
  constructor(private httpClient: HttpClient) { }

  @ViewChild(ListaComponent, {static: false}) childreg: ListaComponent;
    submitregiao(event) {
      this.selectedCountry = '';
      this.mostrar=0;
      this.menu = 'ListaReg';
      if(this.childreg)
      this.childreg.selectregion(event);

    }


  @ViewChild(PaisComponent, {static: false}) childcoun: PaisComponent;
    submitpais(event) {
      this.selectedRegion = '';
      this.mostrar=0;
      this.menu = 'Pais';
      if(this.childcoun)
      this.childcoun.selectpais(event);
    }

  ngOnInit() {
      
    this.Countries = [];
    const req2 = this.httpClient.get('https://restcountries.eu/rest/v2/').toPromise();
    req2.then((countries) => {
     this.Countries = countries;
    })

  }



  receiveMessage($event) {
    this.Countries = $event;
  }

  showDetails($event){
    this.countrydetails = $event;
    this.tela=2;

  }

  backSearch($event){
    this.tela=1;
    console.log(this.tela);
    
  }

}

