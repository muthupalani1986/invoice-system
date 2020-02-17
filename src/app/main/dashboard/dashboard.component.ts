import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _router:Router
  ) { }

  ngOnInit() {
  }
  navigateTo(pathName){
    this._router.navigate([pathName]);
  }
}
