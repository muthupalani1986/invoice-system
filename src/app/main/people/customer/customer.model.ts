import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class Customer {
    id: string;
    name: string;
    handle: string;
    company_name: string;
    email: string;
    phone_number: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;

    /**
     * Constructor
     *
     * @param customer
     */
    constructor(customer?) {
        customer = customer || {};
        this.id = customer.id || FuseUtils.generateGUID();
        this.name = customer.name || '';
        this.handle = FuseUtils.handleize(this.name) || '';
        this.company_name = customer.company_name || '';
        this.email = customer.email || '';
        this.phone_number = customer.phone_number || '';
        this.address = customer.address || '';
        this.city = customer.city || '';
        this.state = customer.state || '';
        this.postal_code = customer.postal_code || '';
        this.country = customer.country || '';
    }
}
