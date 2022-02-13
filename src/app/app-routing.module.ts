import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BanheiroComponent } from './page/banheiro/banheiro.component';
import { CozinhaComponent } from './page/cozinha/cozinha.component';
import { HomeComponent } from './page/home/home.component';
import { QuartoComponent } from './page/quarto/quarto.component';
import { SalaComponent } from './page/sala/sala.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'quarto', component: QuartoComponent },
  { path: 'cozinha', component: CozinhaComponent },
  { path: 'banheiro', component: BanheiroComponent },
  { path: 'sala', component: SalaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
