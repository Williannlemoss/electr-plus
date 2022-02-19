import { Component, OnChanges, OnInit } from '@angular/core';
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

const cozinha: Eletrodomestico[] = [];

const lavadora = new Eletrodomestico(
  11,
  'https://electrplus.s3.us-west-2.amazonaws.com/cozinha/maquina.png',
  'Lavadora',
  1,
  8,
  75
);

const fogao = new Eletrodomestico(
  12,
  'https://electrplus.s3.us-west-2.amazonaws.com/cozinha/fogao.png',
  'Fogão',
  1,
  3,
  3000
);

const geladeira = new Eletrodomestico(
  13,
  'https://electrplus.s3.us-west-2.amazonaws.com/cozinha/geladeira.png',
  'Geladeira',
  1,
  24,
  250
);

const cafeteira = new Eletrodomestico(
  14,
  'https://electrplus.s3.us-west-2.amazonaws.com/cozinha/cafeteira.png',
  'Cafeteira',
  1,
  1,
  220
);

cozinha.push(lavadora, fogao, geladeira, cafeteira);

@Component({
  selector: 'elp-cozinha',
  templateUrl: './cozinha.component.html',
  styleUrls: ['./cozinha.component.scss'],
})
export class CozinhaComponent implements OnInit, OnChanges {
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

  comodo: string = 'cozinha-consumer';

  kwm: number = 0;
  custo: number = 0;

  constructor(
    private localStorageService: LocalStorageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.localStorageService.set('cozinha', cozinha);

    this.carouselValue = this.localStorageService.getEletrodomestico('cozinha');
    this.dataSource =
      this.localStorageService.getEletrodomesticoConsumer('cozinha-consumer');

      this.localStorageService.calculate('cozinha-consumer');

    this.localStorageService.returnTotalCusto.subscribe((res) => {
      this.custo = res;
    });
    this.localStorageService.returnTotalKw.subscribe((res) => {
      this.kwm = res;
    });
  }

  ngOnChanges(): void {}

  openDialogWithValue(eletro: Eletrodomestico) {
    this.dialog
      .open(DialogEletroComponent, {
        data: [eletro, this.comodo],
      })
      .afterClosed()
      .subscribe((res) => {
        this.dataSource =
          this.localStorageService.getEletrodomesticoConsumer(
            'cozinha-consumer'
          );
      });
  }

  openDialog() {
    this.dialog
      .open(DialogAddComponent, {
        data: 'cozinha-consumer',
      })
      .afterClosed()
      .subscribe((res) => {
        this.dataSource =
          this.localStorageService.getEletrodomesticoConsumer(
            'cozinha-consumer'
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
      this.localStorageService.getEletrodomesticoConsumer('cozinha-consumer');
    this.localStorageService.calculate('cozinha-consumer');
  }
}
