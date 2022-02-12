import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'elp-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss'],
})


export class DialogAddComponent implements OnInit {

  public registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      qtd: ['', [Validators.required]],
      uso: ['', [Validators.required]],
      potencia:['', [Validators.required]],
    });
  }

  salvarEletrodomestico(){
    console.log(this.registerForm.value)
  }
}
