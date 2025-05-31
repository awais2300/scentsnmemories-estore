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
import { NgModule } from '@angular/core';
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
    CommonModule
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent {
  cartService = inject(CartService);
  ngOnInit() {
    this.cartService.init();
  }
  get cartItems() {
    return this.cartService.items;
  }

  sellingPrice(product: Product) {
    return Math.round(product.price - (product.price * product.discount) / 100);
  }
  addToCart(productId: string, quantity: number) {
    this.cartService.addToCart(productId, quantity).subscribe((result) => {
      this.cartService.init();
    });
  }
  get totalAmmount() {
    let ammount = 0;
    for (let index = 0; index < this.cartItems.length; index++) {
      const element = this.cartItems[index];
      ammount += this.sellingPrice(element.product) * element.quantity;
    }
    return ammount;
  }
  orderStep: number = 0;
  formbuilder = inject(FormBuilder);
  paymentType = 'cash';
  addressForm = this.formbuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
    address1: ['', Validators.required],
    address2: [''],
    city: ['', Validators.required],
    pincode: ['', Validators.required]
  });
  checkout() {
    this.orderStep = 1;
  }
  addAddress() {
    this.orderStep = 2;
  }
  orderService = inject(OrderService);
  router = inject(Router);
  completeOrder() {
    let order: Order = {
      items: this.cartItems,
      paymentType: this.paymentType,
      address: this.addressForm.value,
      date: new Date(),
    };
    this.orderService.addOrder(order).subscribe((result) => {
      alert('Your order is completed');
      this.cartService.init();
      this.orderStep = 0;
      this.router.navigateByUrl('/orders');
    });
  }
}
