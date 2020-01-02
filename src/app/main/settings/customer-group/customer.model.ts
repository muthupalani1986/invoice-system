import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class Customer {
    id: string;
    name: string;
    handle: string;

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
    }
}
