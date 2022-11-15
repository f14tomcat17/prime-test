import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MarketValuesComponent } from './market-values.component';
import { MarketValuesService } from './market-values.service';

const routes = [
  {
    path: '',
    component: MarketValuesComponent
  }
];

@NgModule({
  declarations: [MarketValuesComponent],
  imports: [CommonModule, RouterModule.forChild(routes), TranslateModule],
  providers: [MarketValuesService],
})
export class MarketValuesModule {}
