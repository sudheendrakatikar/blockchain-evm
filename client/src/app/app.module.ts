import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { MatInputModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountdownTimerModule } from 'ngx-countdown-timer';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { VoteComponent } from './components/vote/vote.component';
import { FinalComponent } from './components/final/final.component';
import { ResultsComponent } from './components/results/results.component';
import { VerifyComponent } from './components/verify/verify.component';
import { OverComponent } from './components/over/over.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'vote',
    component: VoteComponent
  },
  {
    path: 'final',
    component: FinalComponent
  },
  {
    path: 'over',
    component: OverComponent
  },
  {
    path: 'results',
    component: ResultsComponent
  },
  {
    path: 'verify',
    component: VerifyComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VoteComponent,
    FinalComponent,
    NavbarComponent,
    ResultsComponent,
    VerifyComponent,
    OverComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgQrScannerModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    BrowserAnimationsModule,
    CountdownTimerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
