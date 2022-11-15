import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { AuthService } from '../common/services/auth.service';
import { MarketValuesComponent } from './market-values.component';
import { MarketValuesService } from './market-values.service';

@Injectable()
class MarketValuesServiceStub extends MarketValuesService {
  override getQuotes = jest.fn().mockReturnValue(of());
}


@Injectable()
class AuthServiceStub extends AuthService {
  override authenticate = jest.fn().mockReturnValue(of());
}

describe('MarketValuesComponent', () => {
  let fixture: ComponentFixture<MarketValuesComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketValuesComponent],
      providers: [
        {
          provide: MarketValuesService,
          useClass: MarketValuesServiceStub,
        },
        {
          provide: AuthService,
          useClass: AuthServiceStub
        }
      ],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(MarketValuesComponent);
    expect(fixture).toBeTruthy();
  });
});
