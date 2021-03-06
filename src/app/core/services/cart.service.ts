import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ICart } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartListSubject = new BehaviorSubject([]);

  constructor() { }

  addToCart(cart: ICart) {
    let current = this.cartListSubject.getValue();
    let dup = current.find(c => c.book.id === cart.book.id);
    if (dup) dup.quantity += cart.quantity;
    else current.push(cart);
    this.cartListSubject.next(current);
  }

  removeCart(index: number) {
    let current = this.cartListSubject.getValue();
    current.splice(index, 1);
    this.cartListSubject.next(current);
  }

  reloadCart(cartList: ICart[]) {
    this.cartListSubject.next(cartList);
  }

  clearCart() {
    this.cartListSubject.next([]);
  }

}
