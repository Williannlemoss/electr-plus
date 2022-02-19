import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { EletrodomesticoSimulado } from 'src/models/eletro-simulado.model';
import { Eletrodomestico } from 'src/models/eletrodomestico.model';

const quarto: Eletrodomestico[] = [];
const sala: Eletrodomestico[] = [];
const banheiro: Eletrodomestico[] = [];
const cozinha: Eletrodomestico[] = [];

const quartoConsumer: EletrodomesticoSimulado[] = [];
const salaConsumer: EletrodomesticoSimulado[] = [];
const banheiroConsumer: EletrodomesticoSimulado[] = [];
const cozinhaConsumer: EletrodomesticoSimulado[] = [];

@Component({
  selector: 'elp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.localStorageService.set('quarto', quarto);
    this.localStorageService.set('sala', sala);
    this.localStorageService.set('banheiro', banheiro);
    this.localStorageService.set('cozinha', cozinha);

    this.localStorageService.set('quarto-consumer', quartoConsumer);
    this.localStorageService.set('sala-consumer', salaConsumer);
    this.localStorageService.set('banheiro-consumer', banheiroConsumer);
    this.localStorageService.set('cozinha-consumer', cozinhaConsumer);
  }

}
