import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Inventory } from '../models/inventory';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent {

  localInventory: Inventory = new Inventory(0, '', 0, '', 0, 0, 0);

  constructor(private backendService: BackendService,
              private activatedRoute: ActivatedRoute) {

    this.backendService.getInventoryById(this.activatedRoute.snapshot.params['id']).subscribe(data => {
      this.localInventory = new Inventory(data.body.id,
                                          data.body.name,
                                          data.body.weight,
                                          data.body.image,
                                          data.body.quantity,
                                          data.body.maxQuantity,
                                          data.body.warehosueId);
    })
              }
}
