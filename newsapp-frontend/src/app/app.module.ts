import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {initializeApp} from "firebase/app"
import {getAnalytics} from "firebase/analytics"

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { ResultViewComponent } from './result-view/result-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { RegisterComponent } from './register/register.component';

const app = initializeApp(environment.firebaseConfig)
const analytics = getAnalytics(app)

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultViewComponent,
    LoginComponent,
    SnackbarComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
  providers: [SnackbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
