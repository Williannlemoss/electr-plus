import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

import {HeaderModule} from "../../component/header_component";
import {FooterModule} from "../../component/footer";
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
    declarations: [
        HomeComponent
    ],
    exports: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        HeaderModule,
        FooterModule,
        AppRoutingModule  
    ]
})
export class HomeModule { }
