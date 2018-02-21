import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import { AlertService } from '../_services/index';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';




@Component({
  selector: 'app-apuesta',
  templateUrl: './apuesta.component.html',
  styleUrls: ['./apuesta.component.css'],
  animations: [

    trigger('apuestas', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true}),
          
          query(':leave', stagger('300ms', [
            animate('1s ease-in', keyframes([
              style({opacity: 1, transform: 'translateY(0)', offset: 0}),
              style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
              style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
            ]))]), {optional: true})
      ])
    ])

  ]
})
export class ApuestaComponent implements OnInit {
  apuestaCreada = ['Bien, apuesta creada','Generacion de apuesta correcta','Apuesta Lista','Hey, conseguiste crearla al fin','Ya era hora de que crearas una apuesta','La apuesta esta lista','Apuesta a = new Apuesta()','Creacion de apuesta finalizada'] ;
  resultadoRepetido = ['Tio, no te das cuenta de que ese resultado ya esta creado?','A quien hay que quejarse para que quiten a este palurdo del teclado porque macho...','Hola? No ves que ese resultado YA ESTA!','Ese resultado ya existe','Memnudo cegato macho, que ya existe ese resultado!','Tienes que poner un resultado no repetido','A tu familia le da una paguita por tenerte no? Porque no entiendo como no puedes ver que ya existe ese resultado tio','Que no, que no puedes poner un resultado que ya esta en la lista'] ;
  nombreRepetido = ['No puedes repetir nombre','Ese nombre ya esta en la lista, cegato','No intentes poner mas de una apuesta, listillo','Hey, esta muy feo poner dos apuestas a tu nombre, pierde la magia el temita','A ver, tonto, no ves que ese nombre ya esta cogido?','A lo mejor en tu casa puedes hacer lo que quieras, pero aqui tenemos normas y dos nombres repetidos no se pueden','Nombre repetido, utiliza otro','Si hay dos personas con el mismo nombre en la oficina, mete un mote porque se te han adelantado macho'];
  apuestas: any;
  porraId:string;
  newApuesta =  {} ;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private alertService: AlertService) { }

  ngOnInit() {
    this.porraId = this.route.snapshot.params['id'];
    this.getApuestas(this.route.snapshot.params['id']);
  }

  getApuestas(id) {
    this.http.get('http://192.168.1.101:3000/api/porras/'+id+'/apuestas').subscribe(data => {
      this.apuestas = data;
    });
  }

  deleteApuesta(id) {
    this.http.delete('http://192.168.1.101:3000/api/apuestas/'+id)
      .subscribe(res => {
          this.getApuestas(this.route.snapshot.params['id']);
          //this.router.navigate(['porras',this.route.snapshot.params['id'],'apuestas']);
        }, (err) => {
          console.log(err);
        }
      );
  }

  addApuesta() {
    var url = 'http://192.168.1.101:3000/api/porras/'+this.porraId+'/apuestas';
    if(this.validarNombre(this.newApuesta)){
      if(this.validarApuesta(this.newApuesta)){ 
        this.http.post(url, this.newApuesta)
        .subscribe(res => {
          let id = res['porraId'];
          this.getApuestas(id);
          this.cleanForm();
          this.success(this.apuestaCreada[this.getRandom()]);
          //this.router.navigate(['porras',id,'apuestas']);
          }, (err) => {
            console.log(err);
          }
        );
      }else{
        this.error(this.resultadoRepetido[this.getRandom()]);
        this.cleanForm();
      }
    }else{
      this.error(this.nombreRepetido[this.getRandom()]);
      this.cleanForm();
    }
  }

  cleanForm(){
    var form = (<HTMLFormElement>document.getElementById("myForm"));
    form.reset();
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

  validarNombre(apuesta) {
    var validado = true;
    this.apuestas.forEach(function(a){
      if(a.participante == apuesta.participante){
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

  getRandom(){
    return Math.floor((Math.random() * 8));
  };
}
