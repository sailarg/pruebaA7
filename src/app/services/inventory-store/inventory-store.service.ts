import { Injectable } from '@angular/core';
import { IIventory } from 'src/app/models/inventory.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryStoreService {

  private inventories = new BehaviorSubject([]);

  constructor() {
    this.init();
   }

  create(inventory: IIventory) : any {
    return new Promise((resolve) => {
      let inventories: IIventory[] = JSON.parse(localStorage.getItem('inventories'));

      if(inventories == undefined || inventories == null) {
        inventories = [];
        inventory.id = 1;
      }
      else {
        inventory.id = inventories.length + 1;
      }

      inventories.push(inventory);
      localStorage.setItem('inventories', JSON.stringify(inventories));
  
      this.inventories.next(inventories);
      resolve();
    });
  }

  read() : any {
    return this.inventories;
  }

  update(inventory: IIventory) : any {
    return new Promise((resolve) => {
      let inventories: IIventory[] = JSON.parse(localStorage.getItem('inventories'));
      let index: number = -1;
      for(let i = 0; i < inventories.length; ++i) {
        if(inventories[i].id == inventory.id) {
          index = i;
          break;
        }
      }
  
      for(let i = 0; i < inventories.length; ++i) {
        if(inventories[i].id == inventory.id) {
          index = i;
          break;
        }
      }
  
      if (index > -1) {
        inventories.splice(index, 1, inventory);
        localStorage.setItem('inventories', JSON.stringify(inventories));
        this.inventories.next(inventories);
      }

      resolve();
    });
  }

  destroy(inventory: IIventory) : any {
    return new Promise((resolve) => {
      let inventories: IIventory[] = JSON.parse(localStorage.getItem('inventories'));
      let index: number = -1;

      for(let i = 0; i < inventories.length; ++i) {
        if(inventories[i].id == inventory.id) {
          index = i;
          break;
        }
      }

      if (index > -1) {
        inventories.splice(index, 1);
        localStorage.setItem('inventories', JSON.stringify(inventories));
        this.inventories.next(inventories);
      }

      resolve();
    });
  }

  private init() {
    let inventories: IIventory[] = JSON.parse(localStorage.getItem('inventories'));
    this.inventories.next(inventories);
  }
}
