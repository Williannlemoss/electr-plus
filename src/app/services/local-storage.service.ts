import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { EletrodomesticoSimulado } from 'src/models/eletro-simulado.model';
import { Eletrodomestico } from 'src/models/eletrodomestico.model';

interface Comodo {
  name: string;
  value: number;
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage: Storage;
  private totalKw: BehaviorSubject<number> = new BehaviorSubject(0);
  private totalCusto: BehaviorSubject<number> = new BehaviorSubject(0);

  private totalComodosKw: BehaviorSubject<number> = new BehaviorSubject(0);
  private totalComodosCusto: BehaviorSubject<number> = new BehaviorSubject(0);

  private quartoCusto: BehaviorSubject<number> = new BehaviorSubject(0);
  private salaCusto: BehaviorSubject<number> = new BehaviorSubject(0);
  private banheiroCusto: BehaviorSubject<number> = new BehaviorSubject(0);
  private cozinhaCusto: BehaviorSubject<number> = new BehaviorSubject(0);

  get returnTotalKw(): Observable<number> {
    return this.totalKw.asObservable();
  }

  get returnTotalCusto(): Observable<number> {
    return this.totalCusto.asObservable();
  }

  get returnTotalComodosKw(): Observable<number> {
    return this.totalComodosKw.asObservable();
  }

  get returnTotalComodosCusto(): Observable<number> {
    return this.totalComodosCusto.asObservable();
  }

  get returnTotalQuartoCusto(): Observable<number> {
    return this.quartoCusto.asObservable();
  }

  get returnTotalCozinhaCusto(): Observable<number> {
    return this.cozinhaCusto.asObservable();
  }

  get returnTotalSalaCusto(): Observable<number> {
    return this.salaCusto.asObservable();
  }

  get returnTotalBanheiroCusto(): Observable<number> {
    return this.banheiroCusto.asObservable();
  }

  constructor() {
    this.storage = window.localStorage;
  }

  calculate(key: string) {
    const stringTudo = this.storage.getItem(key);
    const eletrodomesticos: EletrodomesticoSimulado[] = JSON.parse(stringTudo!);

    this.totalCusto.next(0);
    this.totalKw.next(0);

    eletrodomesticos.forEach((eletro) => {
      this.totalCusto.next(this.totalCusto.getValue() + eletro.custo!);
      this.totalKw.next(this.totalKw.getValue() + eletro.kw!);
    });
  }

  calculateQuarto() {
    const stringTudo = this.storage.getItem('quarto-consumer');
    const eletrodomesticos: EletrodomesticoSimulado[] = JSON.parse(stringTudo!);

    this.quartoCusto.next(0);

    eletrodomesticos.forEach((eletro) => {
      this.quartoCusto.next(this.quartoCusto.getValue() + eletro.custo!);
    });
  }

  calculateCozinha() {
    const stringTudo = this.storage.getItem('cozinha-consumer');
    const eletrodomesticos: EletrodomesticoSimulado[] = JSON.parse(stringTudo!);

    this.cozinhaCusto.next(0);

    eletrodomesticos.forEach((eletro) => {
      this.cozinhaCusto.next(this.cozinhaCusto.getValue() + eletro.custo!);
    });
  }

  calculateBanheiro() {
    const stringTudo = this.storage.getItem('banheiro-consumer');
    const eletrodomesticos: EletrodomesticoSimulado[] = JSON.parse(stringTudo!);

    this.banheiroCusto.next(0);

    eletrodomesticos.forEach((eletro) => {
      this.banheiroCusto.next(this.banheiroCusto.getValue() + eletro.custo!);
    });
  }

  calculateSala() {
    const stringTudo = this.storage.getItem('sala-consumer');
    const eletrodomesticos: EletrodomesticoSimulado[] = JSON.parse(stringTudo!);

    this.salaCusto.next(0);

    eletrodomesticos.forEach((eletro) => {
      this.salaCusto.next(this.salaCusto.getValue() + eletro.custo!);
    });
  }

  calculateTodosComodos() {
    const valueQuarto = this.storage.getItem('quarto-consumer');
    const valueSala = this.storage.getItem('sala-consumer');
    const valueCozinha = this.storage.getItem('cozinha-consumer');
    const valueBanheiro = this.storage.getItem('banheiro-consumer');

    const eletrodomesticosQuarto: EletrodomesticoSimulado[] = JSON.parse(
      valueQuarto!
    );
    const eletrodomesticosSala: EletrodomesticoSimulado[] = JSON.parse(
      valueSala!
    );
    const eletrodomesticosCozinha: EletrodomesticoSimulado[] = JSON.parse(
      valueCozinha!
    );
    const eletrodomesticosBanheiro: EletrodomesticoSimulado[] = JSON.parse(
      valueBanheiro!
    );

    this.totalComodosCusto.next(0);
    this.totalComodosKw.next(0);

    eletrodomesticosQuarto.forEach((eletro) => {
      this.totalComodosCusto.next(
        this.totalComodosCusto.getValue() + eletro.custo!
      );
      this.totalComodosKw.next(this.totalComodosKw.getValue() + eletro.kw!);
    });

    eletrodomesticosSala.forEach((eletro) => {
      this.totalComodosCusto.next(
        this.totalComodosCusto.getValue() + eletro.custo!
      );
      this.totalComodosKw.next(this.totalComodosKw.getValue() + eletro.kw!);
    });

    eletrodomesticosCozinha.forEach((eletro) => {
      this.totalComodosCusto.next(
        this.totalComodosCusto.getValue() + eletro.custo!
      );
      this.totalComodosKw.next(this.totalComodosKw.getValue() + eletro.kw!);
    });

    eletrodomesticosBanheiro.forEach((eletro) => {
      this.totalComodosCusto.next(
        this.totalComodosCusto.getValue() + eletro.custo!
      );
      this.totalComodosKw.next(this.totalComodosKw.getValue() + eletro.kw!);
    });
  }

  set(key: string, value: any): boolean {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  getEletrodomestico(key: string): Eletrodomestico[] {
    if (key) {
      const stringTudo = this.storage.getItem(key);
      return JSON.parse(stringTudo!);
    }

    return [];
  }

  getEletrodomesticoConsumer(key: string): EletrodomesticoSimulado[] {
    if (key) {
      const stringTudo = this.storage.getItem(key);
      return JSON.parse(stringTudo!);
    }

    return [];
  }

  saveConsumer(key: string, eletrodometico: Eletrodomestico) {
    const arrayEletros: EletrodomesticoSimulado[] =
      this.getEletrodomesticoConsumer(key);

    let eletrodomesticoToSaved: EletrodomesticoSimulado =
      new EletrodomesticoSimulado();

    eletrodomesticoToSaved.aparelho = eletrodometico.nome!;
    eletrodomesticoToSaved.qtd = eletrodometico.qtd!;
    eletrodomesticoToSaved.uso = eletrodometico.uso!;
    eletrodomesticoToSaved.dias = eletrodometico.dias!;
    eletrodomesticoToSaved.kw =
      (eletrodometico.potencia! *
        eletrodometico.uso! *
        eletrodometico.qtd! *
        eletrodometico.dias!) /
      1000;
    eletrodomesticoToSaved.custo = eletrodomesticoToSaved.kw * 0.68;

    if (arrayEletros && arrayEletros.length !== 0) {
      eletrodomesticoToSaved.id = arrayEletros[arrayEletros.length - 1].id! + 1;
      arrayEletros.push(eletrodomesticoToSaved);

      this.set(key, arrayEletros);
      this.calculate(key);
    } else {
      eletrodomesticoToSaved.id = 1;
      this.set(key, [eletrodomesticoToSaved]);
      this.calculate(key);
    }
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }
}
