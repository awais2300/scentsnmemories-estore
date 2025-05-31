import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';
import { ProductsComponent } from './components/manage/products/products.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RegisterComponent } from './components/register/register.component';
// import { LoginComponent } from './components/login/login.component';
import { authGaurd } from './core/auth-guard';
import { AdminDashbaordComponent } from './components/manage/admin-dashbaord/admin-dashbaord.component';
import { adminGaurd } from './core/admin-guard';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { WishlistsComponent } from './components/wishlists/wishlists.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CustomerOrdersComponent } from './components/customer-orders/customer-orders.component';
import { OrdersComponent } from './components/manage/orders/orders.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    //canActivate: [authGaurd],
  },
  {
    path: 'admin',
    component: AdminDashbaordComponent,
    //canActivate: [adminGaurd],
  },
  {
    path: 'admin/categories',
    component: CategoriesComponent,
    //canActivate: [adminGaurd],
  },
  {
    path: 'admin/categories/add',
    component: CategoryFormComponent,
    //canActivate: [adminGaurd],
  },
  {
    path: 'admin/categories/:id',
    component: CategoryFormComponent,
    //canActivate: [adminGaurd],
  },
  {
    path: 'admin/brands',
    component: BrandsComponent,
    //canActivate: [adminGaurd],
  },
  {
    path: 'admin/brands/add',
    component: BrandFormComponent,
    //canActivate: [adminGaurd],
  },
  {
    path: 'admin/brands/:id',
    component: BrandFormComponent,
    //canActivate: [adminGaurd],
  },
  {
    path: 'admin/products',
    component: ProductsComponent,
    //canActivate: [adminGaurd],
  },
  {
    path: 'admin/products/add',
    component: ProductFormComponent,
    //canActivate: [adminGaurd],
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent,
    //canActivate: [adminGaurd],
  },
  {
    path: 'admin/orders',
    component: OrdersComponent,
    //canActivate: [adminGaurd],
  },
  {
    path: 'products',
    component: ProductListComponent,
    //canActivate: [authGaurd],
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    //canActivate: [authGaurd],
  },
  {
    path: 'profile',
    component: CustomerProfileComponent,
    //canActivate: [authGaurd],
  },
  {
    path: 'wishlists',
    component: WishlistsComponent,
    //canActivate: [authGaurd],
  },
  {
    path: 'cart',
    component: ShoppingCartComponent,
    //canActivate: [authGaurd],
  },
  {
    path: 'orders',
    component: CustomerOrdersComponent,
    //canActivate: [authGaurd],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
];
