import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiKeyInterceptor } from './core/interceptors/api-key.interceptor';
import { ErrorCatchingInterceptor } from './core/interceptors/error-catching';
import { TrackerModule } from './tracker/tracker.module';
import { NavBarComponent } from './core/components/nav-bar/nav-bar.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { LoadingPipe } from './tracker/pipes/loading.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TrackerModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorCatchingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
