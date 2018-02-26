import { AllComponent } from "./all/all.component";
import { DetailsComponent } from "./details/details.component";
import { EditComponent } from "./edit/edit.component";
import { NewComponent } from "./new/new.component";

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: "all", component: AllComponent },
  { path: "", component: AllComponent },
  { path: "details/:id", component: DetailsComponent },
  { path: "edit/:id", component: EditComponent },
  { path: "new", component: NewComponent },
  // { path: "", pathMatch: "full", redirectTo: "all" },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot( routes )],
  exports: [RouterModule]
})
export class AppRoutingModule {}
