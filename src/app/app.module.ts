import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule, QuartoModule } from "./page";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogAddModule } from './component/dialog-add';
import { DialogResultModule } from './component/dialog-result/dialog-result.module';


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
    DialogResultModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
