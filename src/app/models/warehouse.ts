export class Warehouse {
    warehouseId: number = 0;
    address: string = '';
    capacity: number = 0;

    constructor(warehouseId: number,
        address: string,
        capacity: number) {
            this.warehouseId = warehouseId;
            this.address = address;
            this.capacity = capacity;
        }
}
