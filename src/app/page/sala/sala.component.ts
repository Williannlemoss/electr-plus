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
  dias: number;
  uso: number;
  kw: string;
  custo: number;
}

const sala: Eletrodomestico[] = [];

const luz = new Eletrodomestico(
  6,
  'https://electrplus.s3.us-west-2.amazonaws.com/sala/luminaria.png',
  'Iluminação',
  30,
  1,
  12,
  75
);

const telefone = new Eletrodomestico(
  7,
  'https://electrplus.s3.us-west-2.amazonaws.com/sala/telefone.png',
  'Telefone',
  30,
  1,
  1,
  75
);
const som = new Eletrodomestico(
  8,
  'https://electrplus.s3.us-west-2.amazonaws.com/sala/som.png',
  'Som',
  30,
  1,
  2,
  220
);
const ar = new Eletrodomestico(
  9,
  'https://electrplus.s3.us-west-2.amazonaws.com/sala/dvd.png',
  'DVD',
  30,
  1,
  5,
  950
);
const televisão = new Eletrodomestico(
  10,
  'https://electrplus.s3.us-west-2.amazonaws.com/sala/tv.png',
  'Televisão',
  30,
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
    'dias',
    'uso',
    'kw',
    'custo',
    'acoes',
  ];

  dataSource: EletrodomesticoSimulado[] = [];

  carouselValue: any = [];

  comodo: string = 'sala-consumer';

  kwm: number = 0;
  custo: number = 0;

  constructor(
    private localStorageService: LocalStorageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.localStorageService.set('sala', sala);

    this.carouselValue = this.localStorageService.getEletrodomestico('sala');
    this.dataSource =
      this.localStorageService.getEletrodomesticoConsumer('sala-consumer');
    this.localStorageService.calculate('sala-consumer');

    this.localStorageService.returnTotalCusto.subscribe((res) => {
      this.custo = res;
    });
    this.localStorageService.returnTotalKw.subscribe((res) => {
      this.kwm = res;
    });
  }

  openDialogWithValue(eletro: Eletrodomestico) {
    this.dialog
      .open(DialogEletroComponent, {
        data: [eletro, this.comodo],
      })
      .afterClosed()
      .subscribe((res) => {
        this.dataSource =
          this.localStorageService.getEletrodomesticoConsumer('sala-consumer');
      });
  }

  openDialog() {
    this.dialog
      .open(DialogAddComponent, {
        data: 'sala-consumer',
      })
      .afterClosed()
      .subscribe((res) => {
        this.dataSource =
          this.localStorageService.getEletrodomesticoConsumer('sala-consumer');
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
    this.dataSource =
      this.localStorageService.getEletrodomesticoConsumer('sala-consumer');
    this.localStorageService.calculate('sala-consumer');
  }
}
