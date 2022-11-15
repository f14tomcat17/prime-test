import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { MarketValuesService, Quote } from "./market-values.service";

@Component({
  selector: 'app-market-values',
  templateUrl: './market-values.component.html',
  styleUrls: ['./market-values.component.scss'],
})
export class MarketValuesComponent implements OnInit, OnDestroy {

  QUOTE_KEY_TEST = '2970161-1058-814';

  QUOTE_FIELDS_TEST = ['LVAL_NORM','CLOSE_ADJ_NORM','NC2_PR_NORM','NC2_NORM','VOL','TUR','PY_CLOSE','YTD_PR_NORM'];

  quotes: Quote[] = [];

  displayIndex = 0;

  private destroy$ = new Subject<void>();

  constructor(private marketValuesService: MarketValuesService) {}

  ngOnInit(): void {
    this.marketValuesService.getQuotes(this.QUOTE_KEY_TEST, this.QUOTE_FIELDS_TEST).pipe(takeUntil(this.destroy$.asObservable())).subscribe((res) => {
      this.quotes = res.quotes;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectIndex(index: number): void {
    this.displayIndex = index;
  }
}
