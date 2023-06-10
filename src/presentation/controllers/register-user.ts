import { PrismaClient } from "@prisma/client";
import { TokenGenerator } from "../../data/protocols/authentication/token-generator";
import { Request, Response } from "express";

import { RegisterUserUseCase } from "../../data/usecases/register-user";
import { UserRepository } from "../../infra/db/prisma/repositories/user";
import { BcryptAdapter } from "../../infra/adapters/bcrypt";

export class RegisterUserController {
    constructor(
        private tokenGenerator: TokenGenerator,
    ) {}

    async handle(request: Request, response: Response) {
        const { name, cpf, birthDate, city, state, email, gender, password } = request.body;

        const birthDateInDate = new Date(birthDate)

        const userRepository = new UserRepository()
        const bcryptAdapter = new BcryptAdapter(5)

        const registerUserUseCase = new RegisterUserUseCase(
            this.tokenGenerator,
            userRepository,
            userRepository,
            bcryptAdapter,
        )

        try {
            const { token, user } = await registerUserUseCase.execute({
                name, cpf, birthDate: birthDateInDate, city, state, email, gender, password 
            })
    
            return response.status(201).json({ token, user })
        } catch(err: any) {
            return response.status(400).json({ message: err.message })
        }

    }
}
