import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Eletrodomestico } from 'src/models/eletrodomestico.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddComponent } from 'src/app/component/dialog-add/dialog-add.component';
import { DialogResultComponent } from 'src/app/component/dialog-result/dialog-result.component';
import { EletrodomesticoSimulado } from 'src/models/eletro-simulado.model';

export interface PeriodicElement {
  qtd: number;
  aparelho: string;
  uso: number;
  kw: string;
  custo: number;
}

const quarto: Eletrodomestico[] = [];
const ar = new Eletrodomestico(
  1,
  'http://localhost:4566/s3localstack/media/1644691292349_tv.png',
  'tv',
  3,
  2,
  750
);
const tv = new Eletrodomestico(
  2,
  'http://localhost:4566/s3localstack/media/1644691283815_dvd.png',
  'dvd',
  2,
  2,
  220
);
const som = new Eletrodomestico(
  3,
  'http://localhost:4566/s3localstack/media/1644691276630_notebook.png',
  'notebook',
  1,
  2,
  110
);
const telefone = new Eletrodomestico(
  4,
  'http://localhost:4566/s3localstack/media/1644691262571_telefone.png',
  'telefone',
  1,
  2,
  220
);

quarto.push(ar, tv, som, telefone);

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
    this.localStorageService.set('quartos', quarto);

    this.carouselValue = this.localStorageService.getEletrodomestico("quartos")
    this.dataSource = this.localStorageService.getEletrodomesticoConsumer("quartos-consumer")

    this.localStorageService.getEletrodomesticoConsumerQuarto
    }

  openDialog() {
    this.dialog.open(DialogAddComponent);
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
