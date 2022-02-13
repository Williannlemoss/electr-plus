import { Component, Inject, OnChanges, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Eletrodomestico } from 'src/models/eletrodomestico.model';

@Component({
  selector: 'elp-dialog-eletro',
  templateUrl: './dialog-eletro.component.html',
  styleUrls: ['./dialog-eletro.component.scss'],
})
export class DialogEletroComponent implements OnInit, OnChanges {
  public eletro!: Eletrodomestico;
  public registerForm!: FormGroup;

  constructor(
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.eletro = this.data.eletro;
  }

  ngOnChanges(): void {
    this.registerForm = this.formBuilder.group({
      nome: [this.data.eletro.nome],
      qtd: [this.data.eletro.qtd],
      uso: [this.data.eletro.uso],
      potencia: [this.data.eletro.potencia],
    });
  }

  salvarEletrodomestico() {
    this.localStorageService.saveConsumer(this.data, this.registerForm.value);
  }
}
