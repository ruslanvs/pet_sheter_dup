import { Component, OnInit } from '@angular/core';
import { MyServiceService } from "./../my-service.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  pets_one = {};
  lim = {};
  errors = {};

  constructor(
    private _myServiceService: MyServiceService,
    private _route: ActivatedRoute,
    private _router: Router,
  ){}

  ngOnInit(){
    this.constraints();
    this._route.params.subscribe( ( params: Params ) => {
      console.log( "params id", params["id"] );
      this.pets_get_one( params["id"] );
    })
  }

  constraints(){
    let observable = this._myServiceService.constraints()
    observable.subscribe( data => {
      this.lim = data
    })
  }

  pets_get_one( id ){
    let observable = this._myServiceService.pets_get_one( id );
    observable.subscribe( data => {
      this.pets_one = data["data"][0];
    })
  }

  pets_update( form_data ){
    console.log( form_data )
    let observable = this._myServiceService.pets_update( form_data._id, form_data );
    observable.subscribe( data => {
      if( "error" in data ){ this.errors = data["error"]["errors"] }
      else{ this.details( form_data._id ) }
    })
  }

  details( id ){
    // console.log( "home route" );
    this._router.navigate( [`/details/${id}`] )
  }

  // errors_rend( data ){
  //   this.errors = this._myServiceService.errors_rend( data )
  // }

  home(){
    // console.log( "home route" );
    this._router.navigate( ["/all"] )
  }
}
