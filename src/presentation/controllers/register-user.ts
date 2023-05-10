import { PrismaClient } from "@prisma/client";
import { TokenGenerator } from "../../data/protocols/authentication/token-generator";
import { Request, Response } from "express";

import { RegisterUserUseCase } from "../../data/usecases/register-user";
import { UserRepository } from "../../infra/db/prisma/repositories/user";

export class RegisterUserController {
    constructor(
        private tokenGenerator: TokenGenerator,
    ) {}

    async handle(request: Request, response: Response) {
        const { name, cpf, birthDate, city, state } = request.body;

        const birthDateInDate = new Date(birthDate)

        const userRepository = new UserRepository()

        const registerUserUseCase = new RegisterUserUseCase(
            this.tokenGenerator,
            userRepository,
            userRepository,
        )

        const { token, user } = await registerUserUseCase.execute({
            name, cpf, birthDate: birthDateInDate, city, state
        })

        return response.status(201).json({ token, user })
    }
}
