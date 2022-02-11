import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { QuartoComponent } from './page/quarto/quarto.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'quarto', component: QuartoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
