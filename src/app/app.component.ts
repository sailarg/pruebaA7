import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prueba';

  option: number = 3;

  pages: any[] = [
    {id: 1, name: "proveedores"},
    {id: 2, name: 'tienda'},
    {id: 3, name: 'producto'},
    {id: 4, name: 'inventario'}
  ];

}
