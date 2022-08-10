import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { SharedModule } from '../shared/shared.module';

const components = [
  HeaderComponent,
  FooterComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    SharedModule,
    TabMenuModule
  ],
  exports: [...components]
})
export class CoreModule { }
