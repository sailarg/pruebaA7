import { Injectable } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products = new BehaviorSubject([]);

  constructor() {
    this.init();
   }

  create(product: IProduct) : any {
    return new Promise((resolve) => {
      let products: IProduct[] = JSON.parse(localStorage.getItem('products'));

      if(products == undefined || products == null) {
        products = [];
        product.id = 1;
      }
      else {
        product.id = products.length + 1;
      }

      products.push(product);
      localStorage.setItem('products', JSON.stringify(products));
  
      this.products.next(products);
      resolve();
    });
  }

  read() : any {
    return this.products;
  }

  update(product: IProduct) : any {
    return new Promise((resolve) => {
      let products: IProduct[] = JSON.parse(localStorage.getItem('products'));
      let index: number = -1;
      for(let i = 0; i < products.length; ++i) {
        if(products[i].id == product.id) {
          index = i;
          break;
        }
      }
  
      if (index > -1) {
        products.splice(index, 1, product);
        localStorage.setItem('products', JSON.stringify(products));
        this.products.next(products);
      }

      resolve();
    });
  }

  destroy(product: IProduct) : any {
    return new Promise((resolve) => {
      let products: IProduct[] = JSON.parse(localStorage.getItem('products'));
      let index: number = -1;

      for(let i = 0; i < products.length; ++i) {
        if(products[i].id == product.id) {
          index = i;
          break;
        }
      }

      if (index > -1) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        this.products.next(products);
      }

      resolve();
    });
  }

  private init() {
    let products: IProduct[] = JSON.parse(localStorage.getItem('products'));
    this.products.next(products);
  }

}
