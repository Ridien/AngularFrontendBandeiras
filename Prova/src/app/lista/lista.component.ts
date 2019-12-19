import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit{
  countries: any;
  selectedRegion;
  @Input() selectReg: string;

  @Output() clickEvent = new EventEmitter<any>();
  constructor(private httpClient: HttpClient) { }
  

  ngOnInit() {
      
     this.countries = [];
     var fetchurl = 'https://restcountries.eu/rest/v2/region/' + this.selectReg;
     const req = this.httpClient.get(fetchurl).toPromise();

     req.then((countries) => {
      this.countries = countries;
     })

   }

  selectregion(event):any{
    var fetchurl = 'https://restcountries.eu/rest/v2/region/' + event.target.value;

    const req = this.httpClient.get(fetchurl).toPromise();

    req.then((countries) => {
      this.countries = countries;
    })

    

  }

  onClick(event){
    let selection = event.target.src;
    selection = selection.replace('https://restcountries.eu/data/','');
    selection = selection.replace('.svg', '');
    this.sendMessage(selection)
    
    
  }

  
  sendMessage(message) {
    this.clickEvent.emit(message)
  }



}
