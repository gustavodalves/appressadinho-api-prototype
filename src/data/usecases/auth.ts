import { Auth } from "../../domain/usecases/auth";
import { TokenGenerator } from "../protocols/authentication/token-generator";
import { Comparer } from "../protocols/hasher/compare";
import { FindUser } from "../repositories/find-user";

export class AuthUseCase implements Auth {
    constructor(
        private readonly findUser: FindUser,
        private readonly comparer: Comparer,
        private readonly tokenGenerator: TokenGenerator,
    ) {}

    async execute(input: { email: string; password: string; }): Promise<{ token: string; }> {
        const user = await this.findUser.findByEmail(input.email)
        
        if(!user) {
            throw new Error("User not found")
        }

        const isValidPassword = this.comparer.compare(input.password, user.password)

        if(!isValidPassword) {
            throw new Error("Invalid password")
        }

        const token = this.tokenGenerator.generate(user.cpf)

        return {
            token
        }
    }
}
