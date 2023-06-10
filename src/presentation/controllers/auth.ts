import { TokenGenerator } from "../../data/protocols/authentication/token-generator";
import { AuthUseCase } from "../../data/usecases/auth";
import { BcryptAdapter } from "../../infra/adapters/bcrypt";
import { UserRepository } from "../../infra/db/prisma/repositories/user";

import { Request, Response } from "express";

export class AuthController {
    constructor(
        private tokenGenerator: TokenGenerator,
    ) {}

    async handle(request: Request, response: Response) {
        const userRepository = new UserRepository()
        const bcryptAdapter = new BcryptAdapter(5)

        const authUseCase = new AuthUseCase(
            userRepository,
            bcryptAdapter,
            this.tokenGenerator,
        )

        const { email, password } = request.body;

        try {
            const authResponse = await authUseCase.execute({ email, password })

            return response.status(200).send(authResponse)
        } catch(err: any) {
            return response.status(400).send({
                message: JSON.stringify(err)
            })
        }


        
    }
}