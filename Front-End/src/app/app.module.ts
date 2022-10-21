import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RequestsService } from './services/request.service';
import { ResultEventComponent } from './result-event/result-event.component';
import { RegisterResultEventComponent } from './register-result-event/register-result-event.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ResultEventComponent,
    RegisterResultEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    RequestsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
