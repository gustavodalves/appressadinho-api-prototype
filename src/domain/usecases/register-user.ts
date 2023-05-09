import { User } from "../entities/user";

type Output = {
    user: User
    token: string
}

type Input = {
    name: string
    cpf: string
    state: string
    city: string
}

export interface RegisterUser {
    execute(input: Input): Promise<Output>
}
