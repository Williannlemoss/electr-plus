export class EletrodomesticoSimulado {
  id?: number;

  qtd?: number;

  aparelho?: string;

  dias?: number;

  uso?: number;

  kw?: number;

  custo?: number;

  constructor(id?: number,  qtd?: number, aparelho?: string, dias?: number, uso?: number, kw?: number, custo?: number){
    this.id = id;
    this.qtd = qtd;
    this.aparelho = aparelho;
    this.dias = dias;
    this.uso = uso;
    this.kw = kw;
    this.custo = custo;
  }
}
