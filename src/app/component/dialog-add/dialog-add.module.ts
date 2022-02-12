import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddComponent } from './dialog-add.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [DialogAddComponent],
  exports: [DialogAddComponent],
  imports: [CommonModule, MatTableModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule],
})
export class DialogAddModule {}
