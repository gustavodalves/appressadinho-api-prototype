import { User } from "./user";

export class UseTime {
    constructor(
        public readonly user: User,
        public readonly startAt: Date,
        public readonly endAt: Date,
    ) {}
}
