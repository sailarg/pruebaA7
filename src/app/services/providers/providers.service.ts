import { Injectable } from '@angular/core';
import { IProvider } from 'src/app/models/provider.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  private providers = new BehaviorSubject([]);

  constructor() {
    this.init();
   }

  create(provider: IProvider) : any {
    return new Promise((resolve) => {
      let providers: IProvider[] = JSON.parse(localStorage.getItem('providers'));

      if(providers == undefined || providers == null) {
        providers = [];
        provider.id = 1;
      }
      else {
        provider.id = providers.length + 1;
      }

      providers.push(provider);
      localStorage.setItem('providers', JSON.stringify(providers));
  
      this.providers.next(providers);
      resolve();
    });
  }

  read() : any {
    return this.providers;
  }

  update(provider: IProvider) : any {
    return new Promise((resolve) => {
      let providers: IProvider[] = JSON.parse(localStorage.getItem('providers'));
      let index: number = -1;
      for(let i = 0; i < providers.length; ++i) {
        if(providers[i].id == provider.id) {
          index = i;
          break;
        }
      }
  
      for(let i = 0; i < providers.length; ++i) {
        if(providers[i].id == provider.id) {
          index = i;
          break;
        }
      }
  
      if (index > -1) {
        providers.splice(index, 1, provider);
        localStorage.setItem('providers', JSON.stringify(providers));
        this.providers.next(providers);
      }

      resolve();
    });
  }

  destroy(provider: IProvider) : any {
    return new Promise((resolve) => {
      let providers: IProvider[] = JSON.parse(localStorage.getItem('providers'));
 
      console.log(provider);

      let index: number = -1;

      for(let i = 0; i < providers.length; ++i) {
        if(providers[i].id == provider.id) {
          index = i;
          break;
        }
      }

      console.log(index);

      if (index > -1) {
        providers.splice(index, 1);
        localStorage.setItem('providers', JSON.stringify(providers));
        this.providers.next(providers);
      }

      resolve();
    });
  }

  private init() {
    let providers: IProvider[] = JSON.parse(localStorage.getItem('providers'));
    this.providers.next(providers);
  }

}
