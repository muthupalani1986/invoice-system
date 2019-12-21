import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
{
        id       : 'dashboard',
        title    : 'Dashboard',
        translate: 'dashboard',
        type     : 'group',
        children : [{
                id      : 'dashboard',
                title   : 'dashboard',
                type    : 'item',
                icon    : 'dashboard',
                url     : '/dashboard'
                }]
    },    
    {
        id       : 'product',
        title    : 'Product',
        translate: 'product',
        type     : 'group',
        children : [{
                id      : 'Product',
                title   : 'Product',
                type    : 'collapsable',
                icon    : 'receipt',
                children: [
                    {
                        id   : 'category',
                        title: 'Category',
                        type : 'item',
                        url  : '/product/category'
                    },
                    {
                        id   : 'product-list',
                        title: 'Product list',
                        type : 'item',
                        url  : '/product/list'
                    },
                    {
                        id   : 'add-product',
                        title: 'Add product',
                        type : 'item',
                        url  : '/product/new'
                    }
                ]
                },
                {
                id      : 'Quotation',
                title   : 'Quotation',
                type    : 'collapsable',
                icon    : 'assessment',
                children: [
                    {
                        id   : 'quotation-list',
                        title: 'Quotation list',
                        type : 'item',
                        url  : '/quotation/list'
                    },
                    {
                        id   : 'quotation-add',
                        title: 'Add Quotation',
                        type : 'item',
                        url  : '/quotation/add'
                    }
                ]
                },
                {
                id      : 'sales',
                title   : 'Sales',
                type    : 'collapsable',
                icon    : 'shopping_cart',
                children: [
                    {
                        id   : 'sales-list',
                        title: 'Sales List',
                        type : 'item',
                        url  : '/sales/list'
                    },
                    {
                        id   : 'sales-add',
                        title: 'Add Sales',
                        type : 'item',
                        url  : '/sales/add'
                    }
                ]
                }]
    },
    {
        id       : 'people',
        title    : 'People',
        translate: 'People',
        type     : 'group',
        children : [{
                id      : 'people',
                title   : 'People',
                type    : 'collapsable',
                icon    : 'person',
                children: [
                    {
                        id   : 'user-list',
                        title: 'User list',
                        type : 'item',
                        url  : '/people/user-list'
                    },
                    {
                        id   : 'add-user',
                        title: 'Add User',
                        type : 'item',
                        url  : '/people/add-user'
                    },
                    {
                        id   : 'customer-list',
                        title: 'Customer list',
                        type : 'item',
                        url  : '/people/customer-list'
                    },
                    {
                        id   : 'add-customer',
                        title: 'Add Customer',
                        type : 'item',
                        url  : '/people/add-customer'
                    }
                ]
                }]
    },
    {
        id       : 'settings',
        title    : 'Settings',
        translate: 'Settings',
        type     : 'group',
        children : [{
                id      : 'settings',
                title   : 'Settings',
                type    : 'collapsable',
                icon    : 'build',
                children: [
                    {
                        id   : 'warehouse',
                        title: 'Warehouse',
                        type : 'item',
                        url  : '/settings/warehouse'
                    },
                    {
                        id   : 'brand',
                        title: 'Brand',
                        type : 'item',
                        url  : '/settings/brand'
                    },
                    {
                        id   : 'unit',
                        title: 'Unit',
                        type : 'item',
                        url  : '/settings/unit'
                    },
                    {
                        id   : 'customer-group',
                        title: 'Customer Group',
                        type : 'item',
                        url  : '/settings/customer-group'
                    },
                    {
                        id   : 'tax',
                        title: 'Tax',
                        type : 'item',
                        url  : '/settings/tax'
                    }
                ]
                }]
    }
];
