import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  getAll() {
    var eletrodomesticos: Eletrodomestico[] = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      const eletro = this.storage.getItem(keys[i]);

      if (eletro) {
        const eletroConverter = JSON.parse(eletro);
        eletrodomesticos.push(eletroConverter);
      }
    }

    return eletrodomesticos;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }
}
