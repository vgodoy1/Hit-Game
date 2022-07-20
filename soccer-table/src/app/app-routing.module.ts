import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routing } from './app.routing';

@NgModule({
  imports: [routing],
  exports: [RouterModule],
})
export class AppRoutingModule {}
