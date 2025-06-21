import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { CartItem } from '../types/cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly STORAGE_KEY = 'guest_cart';

  // BehaviorSubject to hold cart items
  private _items = new BehaviorSubject<CartItem[]>([]);
  readonly items$: Observable<CartItem[]> = this._items.asObservable();

  constructor() {
    this.loadCartFromStorage(); // Load on service init
  }

  // Load cart from localStorage
  private loadCartFromStorage() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this._items.next(parsed);
      } catch (e) {
        console.error('Invalid cart in localStorage');
        this._items.next([]);
      }
    }
  }

  // Save cart to localStorage
  private saveCartToStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._items.value));
  }

  // Getter
  get items(): CartItem[] {
    return this._items.value;
  }

  // Add or update quantity in cart
  addToCart(product: any, quantity: number) {
    const updated = [...this.items];
    const index = updated.findIndex(item => item.product._id === product._id);

    if (index > -1) {
      updated[index].quantity += quantity;
      if (updated[index].quantity <= 0) {
        updated.splice(index, 1); // remove if quantity zero or less
      }
    } else if (quantity > 0) {
      updated.push({ product, quantity });
    }

    this._items.next(updated);
    this.saveCartToStorage();
  }

  // Remove item completely
  removeFromCart(productId: string) {
    const updated = this.items.filter(item => item.product._id !== productId);
    this._items.next(updated);
    this.saveCartToStorage();
  }

  clearCart() {
    this._items.next([]);
    localStorage.removeItem('cart');
  }
}
