import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Inventory } from '../models/inventory';
import { FormBuilder, Validators } from '@angular/forms';
import { Warehouse } from '../models/warehouse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {

  localInventories: any = [];
  localWarehouses: any = [];

  constructor(private backendService: BackendService,
              private fb: FormBuilder, private router: Router) {

    if (this.backendService.currentWarehouseId === 0) 
    {this.getAllInventories()
    console.log('error here', this.localInventories)}
    else{
      this.backendService.getAllInventoryByWarehosueId(this.backendService.currentWarehouseId).subscribe(data => {

        console.log(data.body);

        for (let inventory of data.body) {
          this.localInventories.push(new Inventory(inventory.id,
                                                   inventory.name,
                                                   inventory.weight,
                                                   inventory.image,
                                                   inventory.quantity,
                                                   inventory.maxQuantity,
                                                   inventory.warehouseId));
        }

        console.log(this.localInventories);
      })
    }
    this.getAllWarehouses();
    }

    addForm = this.fb.group(
      {
        name: ['', Validators.compose([Validators.required,
                                        Validators.maxLength(1000)])],
        weight: ['', Validators.compose([Validators.required,
          Validators.maxLength(1000)])],
        image: ['', Validators.compose([Validators.required,
          Validators.maxLength(1000)])],
        quantity: ['', Validators.compose([Validators.required,
          Validators.maxLength(1000)])],
        maxQuantity: ['', Validators.compose([Validators.required,
          Validators.maxLength(1000)])],
        warehouseId: ['', Validators.compose([Validators.required,
          Validators.min(1),
          Validators.max(5)])],                                 
      }
    );

    get name() {
      return this.addForm.get('name');
    }
    get weight() {
      return this.addForm.get('weight');
    }
    get image() {
      return this.addForm.get('image');
    }
    get quantity() {
      return this.addForm.get('quantity');
    }
    get maxQuantity() {
      return this.addForm.get('maxQuantity');
    }
    get warehouseId() {
      return this.addForm.get('warehouseId')
    }

    getAllInventories(): void {
      this.localInventories = [];
      this.backendService.getAllInventory().subscribe( data => {

        console.log(data.body);

        for (let inventory of data.body) {
          this.localInventories.push(new Inventory(inventory.id,
                                                   inventory.name,
                                                   inventory.weight,
                                                   inventory.image,
                                                   inventory.quantity,
                                                   inventory.maxQuantity,
                                                   inventory.warehouseId));
        }

        console.log(this.localInventories);

      });
    }

    @Output() deleteInventoryEvent = new EventEmitter<Inventory>();
    @Input() inventory: Inventory = new Inventory(0, '', 0, '', 0, 0, 0)

    deleteInventory2(): void {
      this.deleteInventoryEvent.emit(this.inventory);
    }

    deleteInventory(inventory: Inventory): void {
      console.log(inventory)
      this.backendService.deleteInventoryById(inventory).subscribe(() => this.getAllInventories());
    }

    addInventory(): void {
      this.backendService.addInventoryInBody(new Inventory(0,
                                                this.name?.value!,
                                                Number(this.weight?.value!),
                                                this.image?.value!,
                                                Number(this.quantity?.value!),
                                                Number(this.maxQuantity?.value!),
                                                Number(this.warehouseId?.value!) ))
                                          .subscribe(() => this.getAllInventories());
    } 

    getAllWarehouses(): void {
      this.localWarehouses = [];

      this.backendService.getAllWarehouse().subscribe(data => {
        for (let warehouse of data.body) {
          this.localWarehouses.push(new Warehouse(warehouse.warehouseId,
                                                  warehouse.address,
                                                  warehouse.capacity));
        };

        this.localWarehouses.sort(( a: Warehouse, b: Warehouse) => a.warehouseId === (b.warehouseId));
        console.log(this.localWarehouses);
      });
    }
    chosenInventoryId: number = 0;
    chosenInventory: Inventory = this.inventory;
      chooseInventory(inventory: Inventory): void {
        this.chosenInventoryId = inventory.id;
    this.chosenInventory = inventory;
        this.addForm.setValue({
          name: inventory.name,
          weight: String(inventory.weight),
          image: inventory.image,
          quantity: String(inventory.quantity),
          maxQuantity: String(inventory.maxQuantity),
          warehouseId: String(inventory.warehouseId)
        })
        console.log('chosen inventory' + inventory.id);
      }

      cancelUpdate(): void {
        this.addForm.reset();
        this.chosenInventoryId = 0;
      }

      updateInventory(): void {
        console.log(new Inventory(this.chosenInventoryId,
          this.name?.value!,
          Number(this.weight?.value!),
          this.image?.value!,
          Number(this.quantity?.value!),
          Number(this.maxQuantity?.value!),
          Number(this.warehouseId?.value!)))
        this.backendService.updateInventoryWithParams(new Inventory(this.chosenInventoryId,
                                                                    this.name?.value!,
                                                                    Number(this.weight?.value!),
                                                                    this.image?.value!,
                                                                    Number(this.quantity?.value!),
                                                                    Number(this.maxQuantity?.value!),
                                                                    Number(this.warehouseId?.value!) ))
                                                        .subscribe(() => {
                                                          this.getAllInventories();
                                                          this.addForm.reset();
                                                          this.chosenInventoryId = 0;
                                                        });
                                                        console.log(this.name);                                                              
      }
    
    getInventoryDetail(id:Number){
      this.router.navigate(['items/find/' + id]);
    }

  }
