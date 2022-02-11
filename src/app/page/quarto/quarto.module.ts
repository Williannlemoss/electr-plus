import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {HeaderModule} from "../../component/header_component";
import {FooterModule} from "../../component/footer";
import { QuartoComponent } from './quarto.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
    declarations: [
        QuartoComponent
    ],
    exports: [
        QuartoComponent
    ],
    imports: [
        CommonModule,
        HeaderModule,
        FooterModule,
        MatTableModule,
        MatIconModule
    ]
})
export class QuartoModule { }
