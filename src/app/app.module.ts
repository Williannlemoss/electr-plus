import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule, QuartoModule } from "./page";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogAddComponent } from './component/dialog-add/dialog-add.component';
import { DialogAddModule } from './component/dialog-add';


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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
