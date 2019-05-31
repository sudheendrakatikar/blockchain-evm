import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: String;

  constructor() { }

  ngOnInit() {
  }

  userLoggedIn() {
    if (localStorage.getItem('voter') == undefined) {
      return false;
    }
    else {
      this.currentUser = JSON.parse(localStorage.getItem('voter')).name;
      return true;
    }
  }

}
