import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class Category
{
    id: string;
    name: string;

    /**
     * Constructor
     *
     * @param category
     */
    constructor(product?)
    {
        product = product || {};
        this.id = product.id || FuseUtils.generateGUID();
        this.name = product.name || '';
    }
}
