import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {HeaderModule} from "../../component/header_component";
import {FooterModule} from "../../component/footer";
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { MatCarouselModule } from 'ng-mat-carousel';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CozinhaComponent } from './cozinha.component';


@NgModule({
    declarations: [
        CozinhaComponent
    ],
    exports: [
        CozinhaComponent
    ],
    imports: [
        CommonModule,
        HeaderModule,
        FooterModule,
        MatTableModule,
        MatIconModule,
        MatDialogModule,
        MatCarouselModule.forRoot(),
        AppRoutingModule
        
    ]
})
export class CozinhaModule { }
