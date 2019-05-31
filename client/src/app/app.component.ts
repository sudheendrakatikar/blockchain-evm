import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private router: Router) { }

  endTime: any = '2019-05-30 10:20:00';
  started: boolean = false;

  startElection() {
    this.started = true;
    this.router.navigate(['/login']);
  }
  endElection() {
    this.endTime = '2020-01-01 00:00:00';
    this.router.navigate(['/over']);
  }
}
