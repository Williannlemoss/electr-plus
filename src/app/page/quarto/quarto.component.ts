import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Eletrodomestico } from 'src/models/eletrodomestico.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddComponent } from 'src/app/component/dialog-add/dialog-add.component';
import { DialogResultComponent } from 'src/app/component/dialog-result/dialog-result.component';
import { EletrodomesticoSimulado } from 'src/models/eletro-simulado.model';
import { DialogEletroComponent } from 'src/app/component/dialog-eletro/dialog-eletro.component';

export interface PeriodicElement {
  qtd: number;
  aparelho: string;
  dias: number,
  uso: number;
  kw: string;
  custo: number;
}

const quarto: Eletrodomestico[] = [];
const ar = new Eletrodomestico(
  1,
  'https://electrplus.s3.us-west-2.amazonaws.com/quarto/ar-cond.png',
  'Ar Condicionado',
  30,
  1,
  7,
  950
);
const tv = new Eletrodomestico(
  2,
  'https://electrplus.s3.us-west-2.amazonaws.com/quarto/tv-certa.png',
  'Televisão',
  30,
  1,
  6,
  150
);
const luz = new Eletrodomestico(
  3,
  'https://electrplus.s3.us-west-2.amazonaws.com/quarto/luminaria.png',
  'Iluminação',
  30,
  1,
  12,
  75
);
const ventilador = new Eletrodomestico(
  4,
  'https://electrplus.s3.us-west-2.amazonaws.com/quarto/ventilador.png',
  'Ventilador',
  30,
  1,
  10,
  150
);

const computador = new Eletrodomestico(
  5,
  'https://electrplus.s3.us-west-2.amazonaws.com/quarto/notebook.png',
  'Computador',
  30,
  1,
  8,
  50
);

quarto.push(ar, tv, luz, ventilador, computador);

@Component({
  selector: 'elp-quarto',
  templateUrl: './quarto.component.html',
  styleUrls: ['./quarto.component.scss'],
})
export class QuartoComponent implements OnInit {
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

  comodo: string = 'quarto-consumer';

  kwm: number = 0;
  custo: number = 0;

  constructor(
    private localStorageService: LocalStorageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.localStorageService.set('quarto', quarto);

    this.carouselValue = this.localStorageService.getEletrodomestico('quarto');
    this.dataSource =
      this.localStorageService.getEletrodomesticoConsumer('quarto-consumer');

    this.localStorageService.calculate('quarto-consumer');

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
          this.localStorageService.getEletrodomesticoConsumer(
            'quarto-consumer'
          );
      });
  }

  openDialog() {
    this.dialog
      .open(DialogAddComponent, {
        data: 'quarto-consumer',
      })
      .afterClosed()
      .subscribe((res) => {
        this.dataSource =
          this.localStorageService.getEletrodomesticoConsumer(
            'quarto-consumer'
          );
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
      this.localStorageService.getEletrodomesticoConsumer('quarto-consumer');
    this.localStorageService.calculate('quarto-consumer');
  }
}
