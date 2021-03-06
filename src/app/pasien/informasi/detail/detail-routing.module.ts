import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPage } from './detail.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPage
  },
  {
    path: ':dokterId',
    loadChildren: () => import('./dokter/dokter.module').then( m => m.DokterPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPageRoutingModule {}
