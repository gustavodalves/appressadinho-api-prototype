import { User } from "../../domain/entities/user";

export interface UpdateUser {
    update(user: User): Promise<void>
}