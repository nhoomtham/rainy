import { BaseEntity, User } from './../../shared';

export class UserFavorite implements BaseEntity {
    constructor(
        public id?: number,
        public user?: User,
        public shop?: BaseEntity,
    ) {
    }
}
