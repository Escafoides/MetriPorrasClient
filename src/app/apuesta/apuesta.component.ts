import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import { AlertService } from '../_services/index';



@Component({
  selector: 'app-apuesta',
  templateUrl: './apuesta.component.html',
  styleUrls: ['./apuesta.component.css']
})
export class ApuestaComponent implements OnInit {
  
  apuestas: any;
  porraId:string;
  newApuesta =  {} ;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private alertService: AlertService) { }

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
    if(this.validarApuesta(this.newApuesta)){
      this.http.post(url, this.newApuesta)
      .subscribe(res => {
        let id = res['porraId'];
        this.getApuestas(id);
        this.cleanForm();
        this.success("Apuesta Creada");
        this.router.navigate(['porras',id,'apuestas']);
        }, (err) => {
          console.log(err);
        }
      );
    }else{
      this.error("Ya se ha apostado por ese resultado");
      this.cleanForm();
    }
  }

  cleanForm(){
    var formGroup = document.getElementById("myForm").children;
    for (var i = 0; i < formGroup.length; i++) {
      var formInputArray = formGroup[i].children;
      if (formInputArray.length > 1){
        var input = (<HTMLInputElement>formInputArray[1]);
        input.value = "";
      }else{
        var button = (<HTMLButtonElement>formInputArray[0]);
        button.disabled = true;
      }
    }
  }

  validarApuesta(apuesta) {
    var validado = true;
    this.apuestas.forEach(function(a){
      if(a.local == apuesta.local && a.visitante == apuesta.visitante){
        validado = false;  
      }
    });
    return validado;
  }

  success(message: string) {
    this.alertService.success(message);
}

  error(message: string) {
      this.alertService.error(message);
  }

  info(message: string) {
      this.alertService.info(message);
  }

  warn(message: string) {
      this.alertService.warn(message);
  }

  clear() {
      this.alertService.clear();
  }
}
