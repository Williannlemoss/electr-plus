import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";

import { HeaderComponent } from './header.component';
import {NavbarModule} from "../navbar/navbar.module";



@NgModule({
  declarations: [
    HeaderComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        NavbarModule
    ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
