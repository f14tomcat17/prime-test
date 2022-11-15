import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './common/interceptors/auth.interceptor';
import { authSimulationInitializer } from './common/post-initializers/auth-simulation.post-initializer';
import { AuthService } from './common/services/auth.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const httpLoaderFactory: (http: HttpClient) => TranslateLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, '../assets/i18n/', '.json');

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, TranslateModule.forRoot({
    defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
  }), NgbModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      // TODO remove with proper user authentication, used to simulate an user already identified
      useFactory: authSimulationInitializer,
      deps: [AuthService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private translateService: TranslateService) {
    this.translateService.use('en');
  }
}
