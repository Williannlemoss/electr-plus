import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddComponent } from './dialog-add.component';

@NgModule({
  declarations: [DialogAddComponent],
  exports: [DialogAddComponent],
  imports: [CommonModule, MatTableModule, MatIconModule, MatDialogModule],
})
export class DialogAddModule {}
