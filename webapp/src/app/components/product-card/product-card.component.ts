import { Component, inject, Input } from '@angular/core';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatIconModule, MatTooltipModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;

  wishlistService = inject(WishlistService);
  cartService = inject(CartService);

  get sellingPrice() {
    return Math.round(
      this.product.price - (this.product.price * this.product.discount) / 100
    );
  }

  addToWishList(product: Product) {
    if (this.isInWishlist(product)) {
      this.wishlistService.removeFromWishlists(product._id!).subscribe(() => {
        this.wishlistService.init();
      });
    } else {
      this.wishlistService.addInWishlist(product._id!).subscribe(() => {
        this.wishlistService.init();
      });
    }
  }

  isInWishlist(product: Product): boolean {
    return !!this.wishlistService.wishlists.find(x => x._id === product._id);
  }

  addToCart(product: Product) {
    if (!this.isProductInCart(product._id!)) {
      this.cartService.addToCart(product._id!, 1);
    } else {
      this.cartService.removeFromCart(product._id!);
    }
    //this.cartService.init(); // Refresh cart from localStorage
  }

  isProductInCart(productId: string): boolean {
    return !!this.cartService.items.find(x => x.product._id === productId);
  }
}
