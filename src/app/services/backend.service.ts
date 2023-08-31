import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Inventory } from '../models/inventory';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  currentWarehouseId: number = 0;
  url: string = environment.backendURL;
  constructor( private http: HttpClient) { }

  getAllInventory(): Observable<HttpResponse<any>> {
    console.log('here')
    return this.http.get<any>(this.url + 'inventory',
    { observe: 'response'});
  }

  deleteInventoryById(inventory: Inventory): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.url}inventory/${inventory.id}`,
                                  { observe: 'response' });
  }

  deleteInventoryInBody(inventory: Inventory): Observable<HttpResponse<any>> {
    return this.http.delete<any>(this.url + 'inventory',
                                  { observe: 'response', body: inventory});
  }

  getInventoryById(id: number): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.url + 'inventory/', + id,
                                { observe: 'response'});
  }

  addInventoryInBody(inventory: Inventory): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.url + 'inventory', inventory,
                                 { observe: 'response' });
  }

  updateInventoryWithParams(inventory: Inventory): Observable<HttpResponse<any>> {

    let parameters = new HttpParams().set('name', inventory.name)
                                     .set('weight', inventory.weight)
                                     .set('image', inventory.image)
                                     .set('quantity', inventory.quantity)
                                     .set('maxQuantity', inventory.maxQuantity)
                                     .set('warehosueId', inventory.warehouseId); 
                                  
    return this.http.put<any>(this.url + 'inventory/update' , inventory, { observe: 'response',
                                                                           params: parameters});
  }

  getAllWarehouse(): Observable<any> {
    return this.http.get<any>(this.url + 'warehouse',
                                          { observe: 'response' });
  }

  getAllInventoryByWarehosueId(warehouseId: number): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.url + 'items/find/warehouse/' + warehouseId ,
                              { observe: 'response' });
  }
} 
