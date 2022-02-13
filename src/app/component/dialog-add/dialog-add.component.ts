import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Eletrodomestico } from 'src/models/eletrodomestico.model';

@Component({
  selector: 'elp-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss'],
})
export class DialogAddComponent implements OnInit {
  public registerForm!: FormGroup;
  

  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      qtd: ['', [Validators.required]],
      uso: ['', [Validators.required]],
      potencia: ['', [Validators.required]],
    });

    
  }

  salvarEletrodomestico(key: string) {
    this.localStorageService.saveConsumer(key, this.registerForm.value);
  }
}
