import { Component, OnInit } from '@angular/core';
import { IShop } from 'src/app/models/shop.model';
import { ShopsService } from 'src/app/services/shops/shops.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {

  isShowForm: boolean = false;
  isUpdate:  boolean = false;
  shopForm: IShop = {id: 0, name: ""};

  dataSource: IShop[];
  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(
    private shopService:  ShopsService,
    private toastr: ToastrService, 
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.shopService.read().subscribe((data: any) => {
      this.dataSource = data;
    });
  }

  showForm() : void {
    this.isShowForm = !this.isShowForm;
    this.isUpdate = false;
    this.shopForm = {id: 0, name: ""};
  }

  add() : void {

    if(this.shopForm.name == "" || this.shopForm.name == undefined) {
      this.toastr.error('El campo nombre es obligatorio');
      return;
    }

    this.spinnerService.show();

    this.shopService.create(this.shopForm).then(() => {
      this.shopForm = {id: 0, name: ""};
      this.isShowForm = false;
      this.spinnerService.hide();
    });

  }

  showUpdate(shop: IShop) { 
    this.shopForm = shop;
    this.isUpdate = true;
    this.isShowForm = true;
  }

  update() {

    this.spinnerService.show();

    this.shopService.update(this.shopForm).then(() => {
      this.shopForm = {id: 0, name: ""};
      this.isShowForm = false;
      this.isUpdate = false;
      this.spinnerService.hide();
    });
  }

  destroy(shop: IShop) {

    this.spinnerService.show();

    this.shopService.destroy(shop).then(() => {
      this.shopForm = {id: 0, name: ""};
      this.isShowForm = false;
      this.spinnerService.hide();
    });
  }

}
