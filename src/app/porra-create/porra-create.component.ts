import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  savePorra() {
    this.http.post('http://localhost:3000/api/porras', this.porra)
      .subscribe(res => {
          let id = res['id'];
          this.router.navigate(['/porras']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
