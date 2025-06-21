import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../types/product';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { OrderService } from '../../services/order.service';
import { Order } from '../../types/order';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent {
  cartService = inject(CartService);
  formbuilder = inject(FormBuilder);
  orderService = inject(OrderService);
  router = inject(Router);

  orderStep = 0;
  paymentType = 'cash';

  get cartItems() {
    return this.cartService.items;
  }

  ngOnInit() {
    // No need to call cartService.init() with localStorage version
  }

  sellingPrice(product: Product): number {
    return Math.round(product.price - (product.price * product.discount) / 100);
  }

  addToCart(product: Product, quantity: number) {
    this.cartService.addToCart(product, quantity); // no init needed
  }

  get totalAmmount(): number {
    return this.cartItems.reduce((total, item) => {
      return total + this.sellingPrice(item.product) * item.quantity;
    }, 0);
  }

  addressForm = this.formbuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
    address1: ['', Validators.required],
    address2: [''],
    city: ['', Validators.required],
    pincode: ['', Validators.required],
    paymentType: ['cash', Validators.required]  // ✅ Added this line
  });

  checkout() {
    this.orderStep = 1;
  }

  addAddress() {
    this.orderStep = 2;
  }

  completeOrder() {
    const order: Order = {
      items: this.cartItems,
      paymentType: this.paymentType,
      address: this.addressForm.value,
      date: new Date(),
    };

    this.orderService.addOrder(order).subscribe(() => {
      this.cartService.clearCart();
      this.orderStep = 0;
      //this.router.navigateByUrl('/orders');
      this.orderStep = 3;
    });
  }

  goToHome() {
    this.router.navigateByUrl('/');
  }
}
