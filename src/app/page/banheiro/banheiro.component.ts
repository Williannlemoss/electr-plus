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

const banheiro: Eletrodomestico[] = [];
const secador = new Eletrodomestico(
  16,
  'https://electrplus.s3.us-west-2.amazonaws.com/banheiro/secador.png',
  'Secador',
  30, 
  1,
  1,
  250
);
const luminaria = new Eletrodomestico(
  17,
  'https://electrplus.s3.us-west-2.amazonaws.com/banheiro/luminaria.png',
  'Iluminação',
  30,
  1,
  3,
  75
);
const chuveiro = new Eletrodomestico(
  18,
  'https://electrplus.s3.us-west-2.amazonaws.com/banheiro/chuveiro.png',
  'Chuveiro Elétrico',
  30,
  1,
  2,
  110
);
const barbeador = new Eletrodomestico(
  19,
  'https://electrplus.s3.us-west-2.amazonaws.com/banheiro/barbeador.png',
  'Barbeador',
  30,
  1,
  1,
  110
);

banheiro.push(secador, luminaria, chuveiro, barbeador);

@Component({
  selector: 'elp-banheiro',
  templateUrl: './banheiro.component.html',
  styleUrls: ['./banheiro.component.scss'],
})
export class BanheiroComponent implements OnInit {
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

  comodo: string = 'banheiro-consumer';

  kwm: number = 0;
  custo: number = 0;

  constructor(
    private localStorageService: LocalStorageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.localStorageService.set('banheiro', banheiro);

    this.carouselValue =
      this.localStorageService.getEletrodomestico('banheiro');
    this.dataSource =
      this.localStorageService.getEletrodomesticoConsumer('banheiro-consumer');

    this.localStorageService.calculate('banheiro-consumer');

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
            'banheiro-consumer'
          );
      });
  }

  openDialog() {
    this.dialog
      .open(DialogAddComponent, {
        data: 'banheiro-consumer',
      })
      .afterClosed()
      .subscribe((res) => {
        this.dataSource =
          this.localStorageService.getEletrodomesticoConsumer(
            'banheiro-consumer'
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
      this.localStorageService.getEletrodomesticoConsumer('banheiro-consumer');
      this.localStorageService.calculate("banheiro-consumer");
  }
}
