import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-porra-create',
  templateUrl: './porra-create.component.html',
  styleUrls: ['./porra-create.component.css']
})
export class PorraCreateComponent implements OnInit {
  porra = {};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  addPorra() {
    this.http.post('http://192.168.1.101:3000/api/porras', this.porra)
      .subscribe(res => {
          let id = res['id'];
          this.router.navigate(['/porras']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
