import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class Category {
    id: string;
    category_name: string;
    handle: string;

    /**
     * Constructor
     *
     * @param category
     */
    constructor(category?) {
        category = category || {};
        this.id = category.id || FuseUtils.generateGUID();
        this.category_name = category.category_name || '';
        this.handle = FuseUtils.handleize(this.category_name) || '';
    }
}
