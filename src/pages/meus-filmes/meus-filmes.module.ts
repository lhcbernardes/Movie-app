import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeusFilmes } from './meus-filmes';

@NgModule({
  declarations: [
    MeusFilmes,
  ],
  imports: [
    IonicPageModule.forChild(MeusFilmes),
  ],
})
export class SearchPageModule {}
