import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../product-card/product-card.component';
import { WishlistService } from '../../services/wishlist.service';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    MatButtonModule,
    ProductCardComponent,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  customerService = inject(CustomerService);
  route = inject(ActivatedRoute);
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);

  product!: Product;
  mainImage!: string;
  similarProducts: Product[] = [];

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.getProductDetail(params.id);
    });
  }

  getProductDetail(id: string) {
    this.customerService.getProductById(id).subscribe((result) => {
      this.product = result;
      this.mainImage = this.product.images[0];

      this.customerService
        .getProducts('', this.product.categoryId, '', -1, '', 1, 4)
        .subscribe((products) => {
          this.similarProducts = products;
        });
    });
  }

  changeImage(url: string) {
    this.mainImage = url;
  }

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

  isInWishlist(product: Product) {
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

  isProductInCart(productId: string) {
    return !!this.cartService.items.find(x => x.product._id === productId);
  }
}
