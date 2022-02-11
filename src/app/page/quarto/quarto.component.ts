import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Eletrodomestico } from 'src/models/eletrodomestico.model';

export interface PeriodicElement {
  qtd: number;
  aparelho: string;
  uso: number;
  kw: string;
  custo: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { qtd: 1, aparelho: 'Hydrogen', uso: 1.0079, kw: 'H', custo: 2 },
  { qtd: 2, aparelho: 'Helium', uso: 4.0026, kw: 'He', custo: 2 },
  { qtd: 3, aparelho: 'Lithium', uso: 6.941, kw: 'Li', custo: 2 },
];

const eletrodomestico = new Eletrodomestico();
eletrodomestico.nome = 'ar condicionado';
eletrodomestico.potencia = 220;
eletrodomestico.quantidade = 1;
eletrodomestico.tempoDeUso = 8;

@Component({
  selector: 'elp-quarto',
  templateUrl: './quarto.component.html',
  styleUrls: ['./quarto.component.scss'],
})
export class QuartoComponent implements OnInit {
  displayedColumns: string[] = [
    'qtd',
    'aparelho',
    'uso',
    'kw',
    'custo',
    'acoes',
  ];
  dataSource = ELEMENT_DATA;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    console.log(this.localStorageService.getAll());
    
  }
}
