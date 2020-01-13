import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class Quotation {
    id: number;
    inv_number: string;
    quotation_number: string;
    status: number;
    note: string;
    order_discount: number;
    shipping_cost: number;
    customer_id: number;
    order_tax: number;
    orders: Order[];

    /**
     * Constructor
     *
     * @param quotation
     */
    constructor(quotation?) {
        quotation = quotation || {};
        this.id = quotation.id || 0;
        this.inv_number = quotation.inv_number || '';
        this.quotation_number = quotation.quotation_number || '';
        this.status = quotation.status || 1;
        this.note = quotation.note || '';
        this.order_discount = quotation.order_discount || 0;
        this.shipping_cost = quotation.shipping_cost || 0;
        this.customer_id = quotation.customer_id || '';
        this.order_tax = quotation.order_tax || 0;
        this.orders = quotation.orders || [];
    }
}
export class Order {
    id: number;
    quotation_id: number;
    product_id: number;
    quantity: number;
    unit_price: number;
    discount: number;
    tax: number;
    name: string;
    code: string;
}
