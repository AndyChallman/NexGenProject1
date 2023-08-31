import { Component } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Warehouse } from '../models/warehouse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent {

  localWarehouses: any = [];
  chosenWarehouseId: number = 0;
  formAddress: string = '';
  formCapacity: number = 0;
  canDelete: boolean = false;
 

  constructor(private backendService: BackendService, private router: Router) {
    this.getAllWarehouse();
  }

  getAllWarehouse(): void {
    this.localWarehouses = [];
    this.backendService.getAllWarehouse().subscribe(
      {
        next: data => {

          for (let warehouses of data.body) {
            this.localWarehouses.push(new Warehouse(warehouses.warehouseId,
                                                    warehouses.address,
                                                    warehouses.capacity));
          }
        },
        error: errData => {console.log(errData) },
        complete: () => console.log('All warehouses returned!')
      }
    );
  }

  chooseWarehouse(warehouse: Warehouse) {
    this.chosenWarehouseId = (warehouse.warehouseId);
    this.backendService.currentWarehouseId = warehouse.warehouseId;
      console.log('warehouse' + this.chosenWarehouseId)
    this.router.navigate(['warehouse' + this.chosenWarehouseId]);
  }
}
