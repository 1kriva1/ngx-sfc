import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSfcInputsModule } from 'ngx-sfc-inputs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSfcInputsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
