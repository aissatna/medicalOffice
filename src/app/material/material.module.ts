import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';
@NgModule({
  declarations: [],
  imports: [
    Material.MatToolbarModule,
   Material.MatCardModule,
    CommonModule
  ],
  exports: [
    Material.MatToolbarModule,
    Material.MatCardModule
  ]
})
export class MaterialModule { }
