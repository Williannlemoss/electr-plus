import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Eletrodomestico } from 'src/models/eletrodomestico.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddComponent } from 'src/app/component/dialog-add/dialog-add.component';
import { DialogResultComponent } from 'src/app/component/dialog-result/dialog-result.component';

export interface PeriodicElement {
  qtd: number;
  aparelho: string;
  uso: number;
  kw: string;
  custo: number;
}

const ar = new Eletrodomestico(1, 'http://localhost:4566/s3localstack/media/1644618162600_telefone.png', 'ar condicionado', 3, 2, 750);
const tv = new Eletrodomestico(2, 'http://localhost:4566/s3localstack/media/1644618162600_telefone.png', 'tv', 2, 2, 220);
const som = new Eletrodomestico(3, 'http://localhost:4566/s3localstack/media/1644618162600_telefone.png', 'som', 1, 2, 110);
const telefone = new Eletrodomestico(4, 'http://localhost:4566/s3localstack/media/1644618162600_telefone.png', 'telefone', 1, 2, 220);

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

  dataSource: any = [];

  carouselValue: Eletrodomestico[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.localStorageService.set('ar', ar);
    this.localStorageService.set('tv', tv);
    this.localStorageService.set('som', som);
    this.localStorageService.set('telefone', telefone);

    this.carouselValue = this.localStorageService.getAll();

    console.log('carousel', this.carouselValue);
  }

  openDialog() {
    this.dialog.open(DialogAddComponent);
  }

  openDialogResult() {
    this.dialog.open(DialogResultComponent);
  }
}
