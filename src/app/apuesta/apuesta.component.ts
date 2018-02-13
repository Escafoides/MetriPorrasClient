import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-apuesta',
  templateUrl: './apuesta.component.html',
  styleUrls: ['./apuesta.component.css']

})
export class ApuestaComponent implements OnInit {
  apuestas: any;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
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

}
