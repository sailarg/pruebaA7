import { Component, OnInit } from '@angular/core';
import { ProvidersService } from 'src/app/services/providers/providers.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProduct } from 'src/app/models/product.model';
import { IProvider } from 'src/app/models/provider.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  isShowForm: boolean = false;
  isUpdate:  boolean = false;
  productForm: IProduct = {id: 0, name : "",  description: "",  providers: []};
  providers: IProvider[] = [];

  dataSource: IProduct[];
  displayedColumns: string[] = ['id', 'name', 'description', 'providers', 'actions'];

  constructor(
    private productService:  ProductsService,
    private providersService: ProvidersService,
    private toastr: ToastrService, 
    private spinnerService: NgxSpinnerService
    ) { 
      this.providersService.read().subscribe((providers: IProvider[]) => {
        this.providers = providers;
      })
  }

  ngOnInit() {
    this.productService.read().subscribe((data: any) => {
      this.dataSource = data;
    });
  }

  showForm() : void {
    this.isShowForm = !this.isShowForm;
    this.isUpdate = false;
    this.productForm =  {id: 0, name : "",  description: "",  providers: [{}]};
  }

  getProviderName(id: number) : string {
    let text: string;
    for(let i = 0; i< this.providers.length; i++) {
      if(this.providers[i].id == id) {
        text = this.providers[i].name;
        break;
      }
    }

    return text;
  }

  add() : void {

    if(this.productForm.name == "" || this.productForm.name == undefined) {
      this.toastr.error('El campo nombre es obligatorio');
      return;
    }

    if(this.productForm.description == "" || this.productForm.description == undefined ) {
      this.toastr.error('El campo descripción es obligatorio');
      return;
    }

    this.spinnerService.show();

    this.productService.create(this.productForm).then(() => {
      this.productForm = {id: 0, name : "",  description: "",  providers: [{}]};
      this.isShowForm = false;
      this.spinnerService.hide();
    });

  }

  showUpdate(provider: IProduct) { 
    this.productForm = provider;
    this.isUpdate = true;
    this.isShowForm = true;
  }

  update() {

    this.spinnerService.show();

    this.productService.update(this.productForm).then(() => {
      this.productForm = {id: 0, name : "",  description: "",  providers: [{}]};
      this.isShowForm = false;
      this.isUpdate = false;
      this.spinnerService.hide();
    });
  }

  destroy(provider: IProduct) {

    this.spinnerService.show();

    this.productService.destroy(provider).then(() => {
      this.productForm = {id: 0, name : "",  description: "",  providers: [{}]};
      this.isShowForm = false;
      this.spinnerService.hide();
    });
  }

}
