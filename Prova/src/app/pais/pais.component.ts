import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})

export class PaisComponent implements OnInit{
  countries: any;
  selectedCountry;
  selected: any;
  @Input() selectCoun: string;
  @Output() messageEvent = new EventEmitter<any>();
  @Output() clickEvent = new EventEmitter<any>();
  
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
      
    this.countries = [];
    const req2 = this.httpClient.get('https://restcountries.eu/rest/v2/').toPromise();
    if(this.selectCoun){    
      var fetchurl = 'https://restcountries.eu/rest/v2/name/' + this.selectCoun + '?fullText=true';
      const req = this.httpClient.get(fetchurl).toPromise();
      req.then((selected) => {
        this.selected = selected;
      })
    }

    req2.then((countries) => {
     this.countries = countries;
    })

  }

  selectpais(event):any{
    var fetchurl = 'https://restcountries.eu/rest/v2/name/' + event.target.value + '?fullText=true';

    const req = this.httpClient.get(fetchurl).toPromise();

    req.then((selected) => {
      this.selected = selected;
    })

    

  }

  onClick(event){
    console.log(event);
    
    let selection = event.target.src;
    selection = selection.replace('https://restcountries.eu/data/','');
    selection = selection.replace('.svg', '');
    console.log(selection);
    
    this.sendClick(selection)
    
    
  }

  sendMessage() {
    this.messageEvent.emit(this.countries)
  }

  sendClick(message){
    this.clickEvent.emit(message)
  }


}