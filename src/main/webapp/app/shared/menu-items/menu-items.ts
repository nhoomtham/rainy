import { Injectable } from '@angular/core';

export interface BadgeItem {
    type: string;
    value: string;
}
export interface Saperator {
    name: string;
    type?: string;
}
export interface ChildrenItems {
    state: string;
    name: string;
    type?: string;
    icon?: string;
}

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    badge?: BadgeItem[];
    saperator?: Saperator[];
    children?: ChildrenItems[];
}

const MENUITEMS = [
    {
        state: '',
        name: 'global.menu.find-shop.main',
        type: 'sub',
        icon: 'search',
        children: [
            {
                state: 'shop',
                name: 'global.menu.find-shop.by-distance',
                icon: 'navigation'
            },
            {
                state: 'shop-status-all',
                name: 'global.menu.find-shop.by-status',
                icon: 'update'
            },
            {
                state: 'shop-favorite',
                name: 'global.menu.find-shop.by-faverite',
                icon: 'favorite'
            },
        ]
    }
];

@Injectable()

export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }

}
