import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { EletrodomesticoSimulado } from 'src/models/eletro-simulado.model';
import { Eletrodomestico } from 'src/models/eletrodomestico.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage: Storage;
  private totalKw: BehaviorSubject<number> = new BehaviorSubject(0);
  private totalCusto: BehaviorSubject<number> = new BehaviorSubject(0);

  get returnTotalKw(): Observable<number> {
    return this.totalKw.asObservable();
  }

  get returnTotalCusto(): Observable<number> {
    return this.totalCusto.asObservable();
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
      console.log(this.totalCusto, this.totalKw);
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
    eletrodomesticoToSaved.kw =
      (eletrodometico.potencia! *
        eletrodometico.uso! *
        eletrodometico.qtd! *
        30) /
      1000;
    eletrodomesticoToSaved.custo = eletrodomesticoToSaved.kw * 0.54;

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

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }
}
