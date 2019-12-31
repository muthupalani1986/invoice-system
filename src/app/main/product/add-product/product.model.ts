import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class Product {
    id: string;
    name: string;
    handle: string;
    description: string;
    category: number;
    image: string;
    sellingPrice: number;
    buyingPrice: number;
    taxRate: number;
    quantity: number;
    salesUnit: number;
    code: number;
    /**
     * Constructor
     *
     * @param product
     */
    constructor(product?) {
        product = product || {};
        this.id = product.id || FuseUtils.generateGUID();
        this.name = product.name || '';
        this.handle = product.handle || FuseUtils.handleize(this.name);
        this.description = product.description || '';
        this.image = product.image || ''
        this.buyingPrice = product.buyingPrice || 0;
        this.sellingPrice = product.sellingPrice || 0;
        this.taxRate = product.taxRate || 0;
        this.quantity = product.quantity || 0;
        this.category = product.category || '';
        this.salesUnit = product.salesUnit || '';
        this.code = product.code || 0
    }
}
