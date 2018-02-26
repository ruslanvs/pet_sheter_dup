import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { MyServiceService } from "./my-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Pet Shelter Dup';

  constructor( 
    private _myServiceService: MyServiceService,
    private _route: ActivatedRoute,
    private _router: Router,
  ){}

  ngOnInit(){
  }

  doHome(){
    this._router.navigate( ["/home"] );
  }
}
