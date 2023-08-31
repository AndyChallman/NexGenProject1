import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { WarehousesComponent } from './warehouses/warehouses.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemComponent } from './item/item.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent 
  },
  {
    path: 'inventory',
    component: InventoryComponent
  },
  {
    path: 'warehouses',
    component: WarehousesComponent
  },
  {
    path: 'items/find/:id',
    component: ItemDetailsComponent
  },
  {
    path: '**',
    component: ItemComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
