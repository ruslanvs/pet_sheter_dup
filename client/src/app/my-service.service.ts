import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class MyServiceService {

  errors = {};

  constructor( private _myService: HttpClient ) {}

  constraints(){
    return this._myService.get( "constraints" );
  }

  // errors_rend( data ){
  //   console.log( "data in errors_rend in my-service.service:", data );
  //   if( data["error"]["code"] == 11000 )
  //   // {
  //   //   console.log ( "ERRORS:", this.errors )
  //   //   this.errors["name"] = `This name is already registered with another pet in the shelter. Please use a unique name.`
  //   //   // this.errors["name"] = `Name ${data["error"]["op"]["name"]} is already registered with another pet in the shelter. Please use a unique name.`
  //   //   console.log ( "ERRORS:", this.errors )
      
  //   // } else 
  //   // {
  //     for( let key in data["error"]["errors"] ){
  //       if( data["error"]["errors"][key]["kind"] == "minlength"){
  //         this.errors[key] = `${key} should have at least ${data["error"]["errors"][key]["properties"] [data["error"]["errors"][key]["kind"]] } characters.`
  //       }
  //       else if( data["error"]["errors"][key]["kind"] == "maxlength"){
  //         this.errors[key] = `${key} should not exceed ${data["error"]["errors"][key]["properties"] [data["error"]["errors"][key]["kind"]] } characters.`
  //       }
  //     }
  //   // }
  //   console.log ( "ERRORS:", this.errors )
  //   return this.errors
  // }
  
  pets_get(){
    return this._myService.get( "pets" );
  }

  pets_get_one( id ){
    return this._myService.get( `/pets/${id}` );
  }

  pets_create( new_pet ){
    return this._myService.post( "/pets", new_pet )
  }

  pets_update( id, updated_pet ){
    return this._myService.put( `/pets/${id}`, updated_pet );
  }

  pets_like( id ){
    return this._myService.get( `/pets/${id}/like` );
  }

  pets_delete_one( id ){
    return this._myService.delete( `/pets/${id}` );
  }
}