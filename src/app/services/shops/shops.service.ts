import { Injectable } from '@angular/core';
import { IShop } from 'src/app/models/shop.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  private shops = new BehaviorSubject([]);

  constructor() {
    this.init();
   }

  create(shop: IShop) : any {
    return new Promise((resolve) => {
      let shops: IShop[] = JSON.parse(localStorage.getItem('shops'));

      if(shops == undefined || shops == null) {
        shops = [];
        shop.id = 1;
      }
      else {
        shop.id = shops.length + 1;
      }

      shops.push(shop);
      localStorage.setItem('shops', JSON.stringify(shops));
  
      this.shops.next(shops);
      resolve();
    });
  }

  read() : any {
    return this.shops;
  }

  update(shop: IShop) : any {
    return new Promise((resolve) => {
      let shops: IShop[] = JSON.parse(localStorage.getItem('shops'));
      let index: number = -1;
      for(let i = 0; i < shops.length; ++i) {
        if(shops[i].id == shop.id) {
          index = i;
          break;
        }
      }
  
      for(let i = 0; i < shops.length; ++i) {
        if(shops[i].id == shop.id) {
          index = i;
          break;
        }
      }
  
      if (index > -1) {
        shops.splice(index, 1, shop);
        localStorage.setItem('shops', JSON.stringify(shops));
        this.shops.next(shops);
      }

      resolve();
    });
  }

  destroy(shop: IShop) : any {
    return new Promise((resolve) => {
      let shops: IShop[] = JSON.parse(localStorage.getItem('shops'));
      let index: number = -1;

      for(let i = 0; i < shops.length; ++i) {
        if(shops[i].id == shop.id) {
          index = i;
          break;
        }
      }

      if (index > -1) {
        shops.splice(index, 1);
        localStorage.setItem('shops', JSON.stringify(shops));
        this.shops.next(shops);
      }

      resolve();
    });
  }

  private init() {
    let shops: IShop[] = JSON.parse(localStorage.getItem('shops'));
    this.shops.next(shops);
  }
}
