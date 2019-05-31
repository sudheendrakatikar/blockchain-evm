import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-over',
  templateUrl: './over.component.html',
  styleUrls: ['./over.component.css']
})
export class OverComponent implements OnInit {

  login_id: any;
  password: any;
  constructor(private router: Router) { }

  ngOnInit() { }

  goToResults() {
    if (this.login_id != undefined && this.password != undefined) {
      this.router.navigate(['/results']);
    }
    else {
      alert('Please fill in all the fields');
    }
  }

}
