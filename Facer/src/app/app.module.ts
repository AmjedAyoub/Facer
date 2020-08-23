import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TimeagoModule, TimeagoIntl, TimeagoFormatter, TimeagoCustomFormatter } from 'ngx-timeago';


import { AppRoutingModule } from './app.routing';
import { AuthService } from './_services/auth.service';
import { AuthInterceptor } from './_services/auth-interceptor';

import { FacersListResolver } from './_resolvers/facers-list.resolver';

import { AppComponent } from './app.component';
import { LoggingComponent } from './logging/logging.component';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { FacersComponent } from './facers/facers.component';
import { PhotoComponent } from './photo/photo.component';

@NgModule({
  declarations: [	
    AppComponent,
    LoggingComponent,
    HeaderComponent,
      ListComponent,
      HomeComponent,
      FacersComponent,
      PhotoComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TimeagoModule.forRoot({
      intl: { provide: TimeagoIntl},
      formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
    }),
    FontAwesomeModule
  ],
  providers: [
    AuthService,
    FacersListResolver,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
