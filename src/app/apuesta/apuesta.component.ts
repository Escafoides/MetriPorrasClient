import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-apuesta',
  templateUrl: './apuesta.component.html',
  styleUrls: ['./apuesta.component.css']
})
export class ApuestaComponent implements OnInit {
  apuestas: any;
  porraId:string;
  newApuesta =  {} ;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.porraId = this.route.snapshot.params['id'];
    this.getApuestas(this.route.snapshot.params['id']);
  }

  getApuestas(id) {
    this.http.get('http://localhost:3000/api/porras/'+id+'/apuestas').subscribe(data => {
      this.apuestas = data;
    });
  }

  deleteApuesta(id) {
    this.http.delete('http://localhost:3000/api/apuestas/'+id)
      .subscribe(res => {
          this.getApuestas(this.route.snapshot.params['id']);
          this.router.navigate(['porras',this.route.snapshot.params['id'],'apuestas']);
        }, (err) => {
          console.log(err);
        }
      );
  }

  addApuesta() {
    var url = 'http://localhost:3000/api/porras/'+this.porraId+'/apuestas';
    this.http.post(url, this.newApuesta)
    .subscribe(res => {
      let id = res['porraId'];
      this.getApuestas(id);
      this.cleanForm();
      this.router.navigate(['porras',id,'apuestas']);
      }, (err) => {
        console.log(err);
      }
    );
  }

  cleanForm(){
    var form = document.getElementById("myForm");
  }

}
