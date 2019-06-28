import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryStoresComponent } from './inventory-stores.component';

describe('InventaryStoresComponent', () => {
  let component: InventoryStoresComponent;
  let fixture: ComponentFixture<InventoryStoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryStoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
