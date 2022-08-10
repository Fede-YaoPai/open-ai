import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

const components = [
  LoaderComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    ProgressSpinnerModule
  ],
  exports: [...components]
})
export class SharedModule { }
