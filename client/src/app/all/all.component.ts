import { Component, OnInit } from '@angular/core';
import { MyServiceService } from "./../my-service.service";
import { Router } from "@angular/router";
import { DetailsComponent } from "./../details/details.component";


@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  pets_all = {};
  clicked = {};

  constructor(
    private _myServiceService: MyServiceService,
    private _router: Router,
    private _detailsComponent: DetailsComponent,
  ){}

  ngOnInit() {
    this.pets_get();
  }

  pets_get(){
    let observable = this._myServiceService.pets_get();
    observable.subscribe( data => {
      this.pets_all = data;
      console.log( "pets_get in all.component.ts says:", this.pets_all );
    })
  }

  details( id ){
    this._router.navigate([`/details/${id}`]);
  }

  edit( id ){
    this._router.navigate([`/edit/${id}`]);
  }

  pets_like( id ){ //>> good way to handle redundancy?
    console.log( "pets_like in all.component.ts" );
    this._detailsComponent.pets_like( id );
    this.clicked[id] = true;//>> what whould be a better way?
    console.log( "clicked in all.componenets", this.clicked );
    this.pets_get()
  }

  pets_delete_one( id ){
    this._detailsComponent.pets_delete_one( id );
    this.pets_get()
  }
}
