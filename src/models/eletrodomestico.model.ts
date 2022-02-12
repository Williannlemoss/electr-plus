export class Eletrodomestico {
  id?: number;

  imgUrl?: string;

  nome?: string;

  quantidade?: number;

  tempoDeUso?: number;

  potencia?: number;

  constructor(id?: number,  imgUrl?: string, nome?: string, quantidade?: number, tempoDeUso?: number, potencia?: number){
    this.id = id;
    this.imgUrl = imgUrl;
    this.nome = nome;
    this.quantidade = quantidade;
    this.tempoDeUso = tempoDeUso;
    this.potencia = potencia;
  }
}
