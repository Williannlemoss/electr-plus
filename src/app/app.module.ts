import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule, QuartoModule } from "./page";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogAddModule } from './component/dialog-add';
import { DialogResultModule } from './component/dialog-result/dialog-result.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogEletroModule } from './component/dialog-eletro';
import { SalaModule } from './page/sala';
import { CozinhaModule } from './page/cozinha';
import { BanheiroModule } from './page/banheiro';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    QuartoModule,
    DialogAddModule,
    BrowserAnimationsModule,
    DialogResultModule,
    FormsModule, 
    ReactiveFormsModule,
    DialogEletroModule,
    SalaModule,
    CozinhaModule,
    BanheiroModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
