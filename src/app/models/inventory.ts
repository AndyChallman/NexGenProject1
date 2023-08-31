export class Inventory {
    id: number = 0;
    name: string = '';
    weight: number = 0;
    image: string = '';
    quantity: number = 0;
    maxQuantity: number = 0;
    warehouseId: number = 0;

    constructor(id: number,
                name: string,
                weight: number,
                image: string,
                quantity: number,
                maxQuantity: number,
                warehouseId: number) {
                    this.id = id;
                    this.name = name;
                    this.weight = weight;
                    this.image = image;
                    this.quantity = quantity;
                    this.maxQuantity = maxQuantity;
                    this.warehouseId = warehouseId;

                }
}
