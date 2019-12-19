import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-countrydetails',
  templateUrl: './countrydetails.component.html',
  styleUrls: ['./countrydetails.component.css']
})
export class CountrydetailsComponent implements OnInit {

  @Input() counDetails: string;


  @Output() backS = new EventEmitter<any>();

  constructor(private httpClient: HttpClient) { }
  country:any = {};
  borderlist:any = [];
  languagelist:any = [];

  ngOnInit() {
    var fetchurl = 'https://restcountries.eu/rest/v2/alpha/' + this.counDetails;
    const req = this.httpClient.get(fetchurl).toPromise();

    req.then((country) => {
     this.country = country;
     this.updateBorders();
     this.updateLanguages();
     
    })


  }

  updateLanguages(){
    this.country.languages.forEach(element =>{
      this.languagelist.push(element.nativeName);
    })

  }

  updateBorders(){
    this.country.borders.forEach(element => {
      var fetchurl = 'https://restcountries.eu/rest/v2/alpha/' + element;
      const req = this.httpClient.get(fetchurl).toPromise();

      req.then((country) => {
       this.borderlist.push(country);
      })
  

    });
  }

  changeCountry($event){
    console.log(event);
    this.borderlist = []
    this.languagelist = []
    let selection = event.target.src;
    console.log(selection);
    selection = selection.replace('https://restcountries.eu/data/','');
    selection = selection.replace('.svg', '');
    console.log(selection);

    var fetchurl = 'https://restcountries.eu/rest/v2/alpha/' + selection;
    const req = this.httpClient.get(fetchurl).toPromise();

    req.then((country) => {
     this.country = country;
     this.updateBorders();
     this.updateLanguages();
     
    })


  };

  backSearch(event){
    console.log('done');
    
    this.sendMessage();

  }
    
  sendMessage() {
    console.log('done');
    
    this.backS.emit('done');
  }


}
