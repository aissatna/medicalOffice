import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatTabsModule,
    Material.MatGridListModule,
    Material.MatCardModule,
    Material.MatTableModule,
    Material.MatButtonModule,
    Material.MatFormFieldModule,
    Material.MatSelectModule,
    Material.MatInputModule

  ],
  exports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatTabsModule,
    Material.MatGridListModule,
    Material.MatCardModule,
    Material.MatTableModule,
    Material.MatButtonModule,
    Material.MatFormFieldModule,
    Material.MatSelectModule,
    Material.MatInputModule

  ]
})
export class MaterialModule { }
