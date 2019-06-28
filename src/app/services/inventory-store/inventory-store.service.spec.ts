import { TestBed } from '@angular/core/testing';

import { InventoryStoreService } from './inventory-store.service';

describe('InventaryStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InventoryStoreService = TestBed.get(InventoryStoreService);
    expect(service).toBeTruthy();
  });
});
