import { Component } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Warehouse } from '../models/warehouse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  localInventories: any = [];
  localWarehouses: any = [];

  constructor(private backendService: BackendService) {
    this.getAllWarehouse();
  }

  getAllWarehouse(): void {
    this.localWarehouses = [];
    this.backendService.getAllWarehouse().subscribe({
      next: data => {

        for (let warehouses of data.body) {
          this.localWarehouses.push(new Warehouse(warehouses.warehouseId,
                                                  warehouses.address,
                                                  warehouses.capacity));
        }
      },

      error: errData => {
        console.log(errData)
      },

      complete: () => console.log('All warehouses returned!')
    });
  }
}
