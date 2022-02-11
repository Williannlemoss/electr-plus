import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

import {HeaderModule} from "../../component/header_component";
import {FooterModule} from "../../component/footer";



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
    ]
})
export class HomeModule { }
