import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { CartItem } from '../types/cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  http = inject(HttpClient);

  // BehaviorSubject to hold cart items
  private _items = new BehaviorSubject<CartItem[]>([]);
  
  // Observable to expose cart items
  readonly items$: Observable<CartItem[]> = this._items.asObservable();

  constructor() {}

  // Initialize and fetch cart items from backend, update BehaviorSubject
  init() {
    this.getCartItems().subscribe((result) => {
      this._items.next(result);
    });
  }

  // Current value getter
  get items(): CartItem[] {
    return this._items.value;
  }

  getCartItems() {
    return this.http.get<CartItem[]>(environment.apiUrl + '/customer/carts');
  }

  addToCart(productId: string, quantity: number) {
    return this.http
      .post(environment.apiUrl + '/customer/carts/' + productId, {
        quantity: quantity,
      })
      .pipe(
        tap(() => {
          this.init(); // Refresh cart after add
        })
      );
  }

  removeFromCart(productId: string) {
    return this.http
      .delete(environment.apiUrl + '/customer/carts/' + productId)
      .pipe(
        tap(() => {
          this.init(); // Refresh cart after remove
        })
      );
  }
}
