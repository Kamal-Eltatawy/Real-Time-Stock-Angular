import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { NotFondedComponent } from './Components/not-fonded/not-fonded.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { StockComponent } from './Components/stock/stock.component';
import { OrderComponent } from './Components/order/order.component';
import { OrderCreateComponent } from './Components/order/order-create/order-create.component';
import { OrderDetailsComponent } from './Components/order/order-details/order-details.component';
import { HomeContentComponent } from './Components/home/home-content/home-content.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './Services/AuthInterceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NotFondedComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    StockComponent,
    OrderComponent,
    OrderCreateComponent,
    OrderDetailsComponent,
    HomeContentComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
