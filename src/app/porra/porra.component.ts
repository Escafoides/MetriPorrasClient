import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-porra',
  templateUrl: './porra.component.html',
  styleUrls: ['./porra.component.css']
})
export class PorraComponent implements OnInit {
  porras: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPorras();
  }


  getPorras(){
    this.http.get('http://localhost:3000/api/porras').subscribe(data => {
      this.porras = data;
    });
  }




} 
