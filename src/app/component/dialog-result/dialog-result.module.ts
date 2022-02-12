import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogResultComponent } from '.';

@NgModule({
  declarations: [DialogResultComponent],
  exports: [DialogResultComponent],
  imports: [CommonModule, MatTableModule, MatIconModule, MatDialogModule],
})
export class DialogResultModule {}
