import { User } from "../entities/user";

type Output = {
    token: string
}

type Input = {
    email: string
    password: string
}

export interface Auth {
    execute(input: Input): Promise<Output>
}
