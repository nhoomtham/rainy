import { BaseEntity } from './../../shared';

export const enum Ra_type {
    'MALE',
    'FEMALE',
    'LADY_BOY_S',
    'LADY_BOY',
    'TOM'
}

export class Shop implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public pic_cover?: string,
        public tel?: string,
        public line_uname?: string,
        public description?: string,
        public age?: number,
        public category?: Ra_type,
        public price?: number,
        public albums?: BaseEntity[],
    ) {
    }
}
