import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EletrodomesticoSimulado } from 'src/models/eletro-simulado.model';
import { Eletrodomestico } from 'src/models/eletrodomestico.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
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
    eletrodomesticoToSaved.kw = (eletrodometico.potencia! *eletrodometico.uso! * eletrodometico.qtd! * 30)/1000;
    eletrodomesticoToSaved.custo = eletrodomesticoToSaved.kw * 0.82;
      

    if (arrayEletros && arrayEletros.length !== 0) {
      eletrodomesticoToSaved.id = arrayEletros[arrayEletros.length - 1].id! + 1;
      arrayEletros.push(eletrodomesticoToSaved);

      this.set(key, arrayEletros);
    } else {
      eletrodomesticoToSaved.id = 1;
      this.set(key, [eletrodomesticoToSaved]);
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
