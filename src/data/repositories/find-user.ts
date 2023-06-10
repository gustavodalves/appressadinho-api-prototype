import { User } from "../../domain/entities/user";

export interface FindUser {
    findByCpf(cpf: string): Promise<User>;
    findByEmail(email: string): Promise<User>
}
