import { User } from "./user";

export class RecoverCode {
    constructor(
        public user: User,
        public code: string,
        public isActive: boolean
    ) {}
}