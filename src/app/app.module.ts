import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiKeyInterceptor } from './core/interceptors/api-key.interceptor';
import { TrackerModule } from './tracker/tracker.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TrackerModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
