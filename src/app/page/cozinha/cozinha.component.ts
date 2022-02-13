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
  styleUrls: ['./cozinha.component.scss']
})
export class CozinhaComponent implements OnInit {

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
    this.localStorageService.set('cozinha', cozinha);

    this.carouselValue = this.localStorageService.getEletrodomestico("cozinha")
    this.dataSource = this.localStorageService.getEletrodomesticoConsumer("cozinha-consumer")

    this.localStorageService.getEletrodomesticoConsumerQuarto
    }

  openDialogWithValue(eletro: Eletrodomestico) {
    this.dialog.open(DialogEletroComponent, {
      data: {eletro}
    });
  }

  openDialog() {
    this.dialog.open(DialogAddComponent, {
      data: "cozinha-consumer"
    });
  }

  openDialogResult() {
    this.dialog.open(DialogResultComponent);
  }

  deleteEletro(key: string, id: number){
    let consumer = this.localStorageService.getEletrodomesticoConsumer(key);
    let index = 0;

    consumer.map((cons: EletrodomesticoSimulado) => {
      if(cons.id === id){
        consumer.splice(index, 1)
      } else{
        index++
      }
    })

    this.localStorageService.set(key, consumer);
  }

}
