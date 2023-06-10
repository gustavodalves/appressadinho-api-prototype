import { User } from "../entities/user";

type Output = void

type Input = {
    email: string
}

export interface ForgotPassword {
    execute(input: Input): Promise<Output>
}
