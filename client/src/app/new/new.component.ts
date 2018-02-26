import { Component, OnInit } from '@angular/core';
import { MyServiceService } from "./../my-service.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  new_pet = {};
  lim = {};
  errors = {};

  constructor(
    private _myServiceService: MyServiceService,
    private _router: Router,
  ){}

  ngOnInit() {
    this.constraints();
  }

  constraints(){
    let observable = this._myServiceService.constraints()
    observable.subscribe( data => {
      this.lim = data
    })
  }

  pets_create(){
    console.log( "pets.create", this.new_pet )
    let observable = this._myServiceService.pets_create( this.new_pet )
    observable.subscribe( data => {
      // if( "error" in data ){ this.errors_rend( data ) }
      if( "error" in data ){ 
        this.errors = data["error"]["errors"]
        console.log( "errors in new.component:", this.errors )
       }
      else{ this.home() }
    })
  }

  // errors_rend( data ){
  //   this.errors = this._myServiceService.errors_rend( data )
  // }

  home(){
    console.log( "home in new.component.ts");
    this._router.navigate( ["/all"] );
  }
}
