import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../../core/ui/material.module';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { CatalogsComponent } from './catalogs/catalogs.component';

@NgModule({
  declarations:
  [
  	CatalogComponent,
  	CatalogsComponent,
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    MaterialModule
  ]
})

export class CatalogModule { }
