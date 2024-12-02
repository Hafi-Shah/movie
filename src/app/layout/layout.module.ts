import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, LayoutRoutingModule, FormsModule],
})
export class LayoutModule {}
