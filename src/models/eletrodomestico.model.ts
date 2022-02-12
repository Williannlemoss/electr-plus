export class Eletrodomestico {
  id?: number;

  imgUrl?: string;

  nome?: string;

  qtd?: number;

  uso?: number;

  potencia?: number;

  constructor(id?: number,  imgUrl?: string, nome?: string, qtd?: number, uso?: number, potencia?: number){
    this.id = id;
    this.imgUrl = imgUrl;
    this.nome = nome;
    this.qtd = qtd;
    this.uso = uso;
    this.potencia = potencia;
  }
}
