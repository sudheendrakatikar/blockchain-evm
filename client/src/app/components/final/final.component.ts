import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.css']
})
export class FinalComponent implements OnInit {

  transaction_id: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.transaction_id = localStorage.getItem('transaction_id');
    setTimeout(() => {
      localStorage.clear();
      this.router.navigate(['login']);
    }
    ,3000);
  }

}
