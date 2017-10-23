import { BaseEntity } from './../../shared';

export class Album implements BaseEntity {
    constructor(
        public id?: number,
        public url?: string,
        public shop?: BaseEntity,
    ) {
    }
}
