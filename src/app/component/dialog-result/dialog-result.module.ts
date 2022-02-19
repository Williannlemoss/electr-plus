import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogResultComponent } from '.';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [DialogResultComponent],
  exports: [DialogResultComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    NgxChartsModule,
    AppRoutingModule,
  ],
})
export class DialogResultModule {}
