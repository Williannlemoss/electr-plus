import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddComponent } from 'src/app/component/dialog-add/dialog-add.component';
import { DialogEletroComponent } from 'src/app/component/dialog-eletro/dialog-eletro.component';
import { DialogResultComponent } from 'src/app/component/dialog-result';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { EletrodomesticoSimulado } from 'src/models/eletro-simulado.model';
import { Eletrodomestico } from 'src/models/eletrodomestico.model';

export interface PeriodicElement {
  qtd: number;
  aparelho: string;
  uso: number;
  kw: string;
  custo: number;
}

const sala: Eletrodomestico[] = [];

const luz = new Eletrodomestico(
  6,
  'https://electrplus.s3.us-west-2.amazonaws.com/sala/luminaria.png',
  'Iluminação',
  1,
  12,
  75
);

const telefone = new Eletrodomestico(
  7,
  'https://electrplus.s3.us-west-2.amazonaws.com/sala/telefone.png',
  'Telefone',
  1,
  1,
  75
);
const som = new Eletrodomestico(
  8,
  'https://electrplus.s3.us-west-2.amazonaws.com/sala/som.png',
  'Som',
  1,
  2,
  220
);
const ar = new Eletrodomestico(
  9,
  'https://electrplus.s3.us-west-2.amazonaws.com/sala/dvd.png',
  'DVD',
  1,
  5,
  950
);
const televisão = new Eletrodomestico(
  10,
  'https://electrplus.s3.us-west-2.amazonaws.com/sala/tv.png',
  'Televisão',
  1,
  6,
  220
);

sala.push(luz, telefone, som, ar, televisão);

@Component({
  selector: 'elp-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.scss'],
})
export class SalaComponent implements OnInit {
  eletrodomesticos!: Eletrodomestico[];

  displayedColumns: string[] = [
    'qtd',
    'aparelho',
    'uso',
    'kw',
    'custo',
    'acoes',
  ];

  dataSource: EletrodomesticoSimulado[] = [];

  carouselValue: any = [];

  constructor(
    private localStorageService: LocalStorageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.localStorageService.set('sala', sala);

    this.carouselValue = this.localStorageService.getEletrodomestico('sala');
    this.dataSource =
      this.localStorageService.getEletrodomesticoConsumer('sala-consumer');

    this.localStorageService.getEletrodomesticoConsumerQuarto;
  }

  openDialogWithValue(eletro: Eletrodomestico) {
    this.dialog.open(DialogEletroComponent, {
      data: { eletro },
    });
  }

  openDialog() {
    this.dialog.open(DialogAddComponent, {
      data: 'sala-consumer',
    });
  }

  openDialogResult() {
    this.dialog.open(DialogResultComponent);
  }

  deleteEletro(key: string, id: number) {
    let consumer = this.localStorageService.getEletrodomesticoConsumer(key);
    let index = 0;

    consumer.map((cons: EletrodomesticoSimulado) => {
      if (cons.id === id) {
        consumer.splice(index, 1);
      } else {
        index++;
      }
    });

    this.localStorageService.set(key, consumer);
  }
}