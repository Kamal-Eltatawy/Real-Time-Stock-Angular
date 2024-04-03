import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFondedComponent } from './Components/not-fonded/not-fonded.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { StockComponent } from './Components/stock/stock.component';
import { OrderComponent } from './Components/order/order.component';
import { OrderDetailsComponent } from './Components/order/order-details/order-details.component';
import { OrderCreateComponent } from './Components/order/order-create/order-create.component';
import { canActivate } from './RouteGuard/CanActive.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Stock', component: StockComponent, canActivate: [canActivate] },
  { path: 'Order', component: OrderComponent, canActivate: [canActivate] },
  {
    path: 'Order/:symbol',
    component: OrderCreateComponent,
    canActivate: [canActivate],
  },
  { path: 'Register', component: RegisterComponent },
  { path: '**', component: NotFondedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
