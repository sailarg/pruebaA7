import { Component, OnInit } from '@angular/core';
import { IProvider } from 'src/app/models/provider.model';
import { ProvidersService } from 'src/app/services/providers/providers.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit  {

  isShowForm: boolean = false;
  isUpdate:  boolean = false;
  providerForm: IProvider = {id: 0, name: "", age: 0, username: ""};

  dataSource: IProvider[];
  displayedColumns: string[] = ['id', 'name', 'age', 'username', 'actions'];

  constructor(
    private providerService:  ProvidersService,
    private toastr: ToastrService, 
    private spinnerService: NgxSpinnerService
    ) { 
  }

  ngOnInit() {
    this.providerService.read().subscribe((data: any) => {
      this.dataSource = data;
    });
  }

  showForm() : void {
    this.isShowForm = !this.isShowForm;
    this.isUpdate = false;
    this.providerForm =  {id: 0, name: "", age: 0, username: ""};
  }

  add() : void {

    if(this.providerForm.name == "" || this.providerForm.name == undefined) {
      this.toastr.error('El campo nombre es obligatorio');
      return;
    }

    if(this.providerForm.age == 0 ) {
      this.toastr.error('El campo edad es obligatorio');
      return;
    }

    this.spinnerService.show();

    this.providerService.create(this.providerForm).then(() => {
      this.providerForm = {id: 0, name: "", age: 0, username: ""};
      this.isShowForm = false;
      this.spinnerService.hide();
    });

  }

  showUpdate(provider: IProvider) { 
    this.providerForm = provider;
    this.isUpdate = true;
    this.isShowForm = true;
  }

  update() {

    this.spinnerService.show();

    this.providerService.update(this.providerForm).then(() => {
      this.providerForm = {id: 0, name: "", age: 0, username: ""};
      this.isShowForm = false;
      this.isUpdate = false;
      this.spinnerService.hide();
    });
  }

  destroy(provider: IProvider) {

    this.spinnerService.show();

    this.providerService.destroy(provider).then(() => {
      this.providerForm = {id: 0, name: "", age: 0, username: ""};
      this.isShowForm = false;
      this.spinnerService.hide();
    });
  }

}
