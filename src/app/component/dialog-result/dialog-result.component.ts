import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'elp-dialog-result',
  templateUrl: './dialog-result.component.html',
  styleUrls: ['./dialog-result.component.scss'],
})
export class DialogResultComponent implements OnInit {
  totalCusto: number = 0;
  totalKw: number = 0;

  quartoCusto: number = 0;
  salaCusto: number = 0;
  cozinhaCusto: number = 0;
  banheiroCusto: number = 0;

  result: any;
  value: any;
  comodoName: any;
  chart: any = [];

  constructor(private localStorageService: LocalStorageService) {
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    this.localStorageService.calculateTodosComodos();
    this.localStorageService.calculateQuarto();
    this.localStorageService.calculateCozinha();
    this.localStorageService.calculateBanheiro();
    this.localStorageService.calculateSala();

    this.localStorageService.returnTotalQuartoCusto.subscribe((res) => {
      this.quartoCusto = res;
    });

    this.localStorageService.returnTotalCozinhaCusto.subscribe((res) => {
      this.cozinhaCusto = res;
    });

    this.localStorageService.returnTotalSalaCusto.subscribe((res) => {
      this.salaCusto = res;
    });

    this.localStorageService.returnTotalBanheiroCusto.subscribe((res) => {
      this.banheiroCusto = res;
    });

    this.localStorageService.returnTotalComodosCusto.subscribe((res) => {
      this.totalCusto = res;
    });
    this.localStorageService.returnTotalComodosKw.subscribe((res) => {
      this.totalKw = res;
    });

    this.chart = new Chart('doughnut', {
      type: 'doughnut',
      data: {
        labels: ['Quarto', 'Sala', 'Cozinha', 'Banheiro'],
        datasets: [{
          label: 'My First Dataset',
          data: [this.quartoCusto, this.salaCusto, this.cozinhaCusto, this.banheiroCusto],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(122, 205, 86)'
          ],
          hoverOffset: 4
        }]
      },
    });
  }

  clear(){
    this.localStorageService.clear();
  }

}
