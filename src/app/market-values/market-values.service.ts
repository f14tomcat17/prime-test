import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

interface QuoteField {
  d: number;
  dly: number;
  gen: number;
  v: number;
  z: number;
}

export interface Quote {
  listingKey: string;
  fields: {
    [key: string]: QuoteField;
  }
}

export interface QuotesResponse {
  quotes: Quote[];
}

@Injectable()
export class MarketValuesService {

  constructor(private http: HttpClient) {}

  getQuotes(quoteKey: string, fields: string[]): Observable<QuotesResponse> {
    return this.http.get<QuotesResponse>(`${environment.urls.webapi}/quotes?quoteKey=${quoteKey}&fields=${fields.join(',')}`);
  }
}
