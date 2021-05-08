import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { CarListComponent } from './components/car/car-list/car-list.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { ColorListComponent } from './components/color/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserComponent } from './components/user/user.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cars', component: CarComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'rentals', component: RentalComponent },

  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: "cars/filter/:brandId/:colorId", component: CarComponent },
  { path: 'cars/car-detail/:carId', component: CarDetailComponent },

  { path: "rental/:carId", component: RentalComponent },
  { path: "payment/:rental", component: PaymentComponent },

  { path: 'cars/add', component: CarAddComponent, canActivate: [LoginGuard] },
  { path: "cars/list", component: CarListComponent, canActivate: [LoginGuard] },

  { path: "brands/add", component: BrandAddComponent, canActivate: [LoginGuard] },
  { path: "brands/list", component: BrandListComponent, canActivate: [LoginGuard] },
  { path: "brands/update/:brandId", component: BrandUpdateComponent, canActivate: [LoginGuard] },

  { path: "colors/list", component: ColorListComponent, canActivate: [LoginGuard] },
  { path: "colors/add", component: ColorAddComponent, canActivate: [LoginGuard] },
  { path: "colors/update/:colorId", component: ColorUpdateComponent, canActivate: [LoginGuard] },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: "user", component: UserComponent },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
