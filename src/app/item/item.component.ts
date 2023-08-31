import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Inventory } from '../models/inventory';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  constructor(private router: Router) {}

  @Output() deleteInventoryEvent = new EventEmitter<Inventory>();
  @Output() updateInventoryEvent = new EventEmitter<Inventory>();

  @Input() inventory: Inventory = new Inventory(0, '', 0, '', 0, 0, 0);

deleteInventory(): void {
  this.deleteInventoryEvent.emit(this.inventory);
}

updateInventory(): void {
  this.deleteInventoryEvent.emit(this.inventory);
}

getInventoryDetails() {
  this.router.navigate(['inventory/details/' + this.inventory.id])
}

}