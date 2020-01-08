import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        translate: 'dashboard',
        type: 'group',
        children: [{
            id: 'dashboard',
            title: 'dashboard',
            type: 'item',
            icon: 'dashboard',
            url: '/dashboard'
        }]
    },
    {
        id: 'product',
        title: 'Product',
        translate: 'product',
        type: 'group',
        children: [{
            id: 'Product',
            title: 'Product',
            type: 'collapsable',
            icon: 'receipt',
            children: [
                {
                    id: 'category',
                    title: 'Categories',
                    type: 'item',
                    url: '/manage/category'
                },
                {
                    id: 'product',
                    title: 'Products',
                    type: 'item',
                    url: '/manage/product'
                }
            ]
        },
        {
            id: 'Quotation',
            title: 'Quotation',
            type: 'collapsable',
            icon: 'assessment',
            children: [
                
                {
                    id: 'quotations',
                    title: 'Quotations',
                    type: 'item',
                    url: '/quote/quotation'
                }
            ]
        },
        {
            id: 'sales',
            title: 'Sales',
            type: 'collapsable',
            icon: 'shopping_cart',
            children: [
                {
                    id: 'sales-list',
                    title: 'Sales List',
                    type: 'item',
                    url: '/sales/list'
                },
                {
                    id: 'sales-add',
                    title: 'Add Sales',
                    type: 'item',
                    url: '/sales/add'
                }
            ]
        }]
    },
    {
        id: 'people',
        title: 'People',
        translate: 'People',
        type: 'group',
        children: [{
            id: 'people',
            title: 'People',
            type: 'collapsable',
            icon: 'person',
            children: [
                {
                    id: 'user',
                    title: 'User',
                    type: 'item',
                    url: '/people/user'
                },
                {
                    id: 'customer',
                    title: 'Customer',
                    type: 'item',
                    url: '/people/customer'
                }
            ]
        }]
    },
    {
        id: 'settings',
        title: 'Settings',
        translate: 'Settings',
        type: 'group',
        children: [{
            id: 'settings',
            title: 'Settings',
            type: 'collapsable',
            icon: 'build',
            children: [
                {
                    id: 'warehouse',
                    title: 'Warehouse',
                    type: 'item',
                    url: '/settings/warehouse'
                },
                {
                    id: 'brand',
                    title: 'Brand',
                    type: 'item',
                    url: '/settings/brand'
                },
                {
                    id: 'unit',
                    title: 'Unit',
                    type: 'item',
                    url: '/settings/unit'
                },
                {
                    id: 'tax',
                    title: 'Tax',
                    type: 'item',
                    url: '/settings/tax'
                }
            ]
        }]
    }
];
