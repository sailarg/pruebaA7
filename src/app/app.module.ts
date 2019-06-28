import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule, MatTableModule } from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { ProductsComponent } from './components/products/products.component';
import { InventoryStoresComponent } from './components/inventory-stores/inventory-stores.component';
import { ShopsComponent } from './components/shops/shops.component';
import { ProvidersService } from './services/providers/providers.service';


@NgModule({
  declarations: [
    AppComponent,
    ProvidersComponent,
    ProductsComponent,
    InventoryStoresComponent,
    ShopsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [ProvidersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
