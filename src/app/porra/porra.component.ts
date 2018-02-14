import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-porra',
  templateUrl: './porra.component.html',
  styleUrls: ['./porra.component.css']
})
export class PorraComponent implements OnInit {
  porras: any;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getPorras();
  }


  getPorras(){
    this.http.get('http://192.168.1.101:3000/api/porras').subscribe(data => {
      this.porras = data;
    });
  }

  deletePorra(id) {
    this.http.delete('http://192.168.1.101:3000/api/porras/'+id)
      .subscribe(res => {
          this.getPorras();
          this.router.navigate(['/porras']);
        }, (err) => {
          console.log(err);
        }
      );
  }




} 
