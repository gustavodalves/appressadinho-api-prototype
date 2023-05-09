import { User } from "../../domain/entities/user";
import { RegisterUser } from "../../domain/usecases/register-user";
import { TokenGenerator } from "../protocols/authentication/token-generator";
import { CreateUserRepository } from "../repositories/create-user";
import { FindUser } from "../repositories/find-user";

export class RegisterUserUseCase implements RegisterUser {
    constructor(
        private readonly tokenGenerator: TokenGenerator,
        private readonly createUser: CreateUserRepository,
        private readonly findUser: FindUser,
    ) {}

    async execute(input: { name: string; cpf: string; state: string; city: string; birthDate: Date }): Promise<{ user: User; token: string; }> {
        try {
            this.findUser.findByCpf(input.cpf)

            const user = new User(
                input.name,
                input.cpf,
                input.state,
                input.city,
                input.birthDate
            )

            await this.createUser.create(user)

            const token = this.tokenGenerator.generate(input.cpf)

            return {
                user,
                token,
            }

        } catch {
            throw new Error('User already exists')
        }
    }
}
