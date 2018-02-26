import { Component, OnInit } from '@angular/core';
import { MyServiceService } from "./../my-service.service";
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  pets_one = {};
  pets_delete_res = {};
  pets_like_res = {};
  clicked: boolean;

  constructor(
    private _myServiceService: MyServiceService,
    private _route: ActivatedRoute,
    private _router: Router,
  ){}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log( "params id", params['id']);
      this.pets_get_one( params['id'] );
    })
    
  }

  pets_get_one( id ){
    let observable = this._myServiceService.pets_get_one( id );
    observable.subscribe( data => {
      this.pets_one = data["data"][0];
      console.log( "pets_get_one in details.component.ts:", this.pets_one );
    })
  }

  pets_delete_one( id ){
    let observable = this._myServiceService.pets_delete_one( id );
    observable.subscribe( data => {
      this.pets_delete_res = data;
      console.log( "pets_delete_one in details.component.ts:", this.pets_delete_one );
      this.home();
    })
  }

  pets_like( id ){ //>> good way to handle redundancy?
    console.log( "pets_like in details.component.ts", id )
    let observable = this._myServiceService.pets_like( id )
    observable.subscribe( data => {
      this.pets_like_res = data;
      console.log( "pets_like observable in details.component.ts:", this.pets_like_res );
      this.pets_get_one( id );// >> this is not needed when pets_like is called from all.component
      this.clicked = true;
    })

  }

  home(){
    console.log( "home in details.component.ts" );
    this._router.navigate( ["/all"] );
  }

  edit( id ){
    console.log( "edit in details.component.ts" );
    this._router.navigate( [`/edit/${id}`])
  }


}
