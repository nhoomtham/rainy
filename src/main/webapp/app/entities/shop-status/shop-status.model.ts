import { BaseEntity } from './../../shared';

export class ShopStatus implements BaseEntity {
    constructor(
        public id?: number,
        public message?: string,
        public shop?: BaseEntity,
        public lastModifiedDate?: Date,

    ) {
    }
}
