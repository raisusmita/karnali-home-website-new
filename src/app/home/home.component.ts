import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  arrival:string;
  departure:string
  constructor() { }

  ngOnInit() {
    this.initialize()
  }

  initialize(){
    this.arrival =" Arrival Date"
    this.departure=" Departure Date"
  }

}
