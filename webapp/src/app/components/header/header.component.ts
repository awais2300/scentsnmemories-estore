import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../types/category';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, MatIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  customerService = inject(CustomerService);
  categoryList: Category[] = [];
  authService = inject(AuthService);
  router = inject(Router);
  cartService = inject(CartService);
  mobileMenuOpen = false;
  searchTerm!: string;
  cartItemCount = 0;
  private cartSub!: Subscription;

  ngOnInit() {
    // Load categories
    this.customerService.getCategories().subscribe((result) => {
      this.categoryList = result;
    });

    // Subscribe to cart item changes
    this.cartSub = this.cartService.items$.subscribe((items) => {
      this.cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    });

    // Initialize cart items if not already done
    //this.cartService.init();
  }

  onSearch(e: any) {
    if (e.target.value) {
      this.router.navigateByUrl('/products?search=' + e.target.value);
    }
  }

  searchCategory(id: string) {
    this.searchTerm = '';
    this.router.navigateByUrl('/products?categoryId=' + id);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy() {
    if (this.cartSub) this.cartSub.unsubscribe();
  }
}
