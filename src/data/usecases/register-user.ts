import { User } from "../../domain/entities/user";
import { RegisterUser } from "../../domain/usecases/register-user";
import { TokenGenerator } from "../protocols/authentication/token-generator";
import { Hasher } from "../protocols/hasher/hasher";
import { CreateUserRepository } from "../repositories/create-user";
import { FindUser } from "../repositories/find-user";

export class RegisterUserUseCase implements RegisterUser {
    constructor(
        private tokenGenerator: TokenGenerator,
        private readonly createUser: CreateUserRepository,
        private readonly findUser: FindUser,
        private readonly hasher: Hasher
    ) {}

    async execute(input: { name: string; cpf: string; state: string; city: string; birthDate: Date; password: string; gender: string; email: string; }): Promise<{ user: User; token: string; }> {

            const rawUser = await this.findUser.findByCpf(String(input.cpf))
        if(rawUser) {
            throw new Error("User already exists")
        }
            const password = this.hasher.encrypt(input.password)
            const user = new User(
                input.name,
                input.cpf,
                input.state,
                input.city,
                input.birthDate,
                password,
                input.gender,
                input.email
            )

            await this.createUser.create(user)

            const token = this.tokenGenerator.generate(input.cpf)

            return {
                user,
                token,
            }
    }
}
