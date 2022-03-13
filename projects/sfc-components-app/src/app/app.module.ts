import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSfcComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
