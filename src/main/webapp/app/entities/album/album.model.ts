import { BaseEntity } from './../../shared';

export class Album implements BaseEntity {
    constructor(
        public id?: number,
        public url?: string,
        public url_medium?: string,
        public url_large?: string,
        public shop?: BaseEntity,
    ) {
    }
}
