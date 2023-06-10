import { Hasher } from "../../data/protocols/hasher/hasher";
import { RecoverPasswod } from "../../data/usecases/recover-password";
import { RecoverCodeRepository } from "../../infra/db/prisma/repositories/recover-code";
import { UserRepository } from "../../infra/db/prisma/repositories/user";

import { Request, Response } from "express";

export class RecoverPasswordController {
    constructor(
        private readonly hasher: Hasher,
    ) {}

    async handle(request: Request, response: Response) {
        const recoverCodeRepository = new RecoverCodeRepository()
        const userRepository = new UserRepository()
        const useCase = new RecoverPasswod(
            recoverCodeRepository, this.hasher, userRepository,
        )

        const { code, password } = request.body

        try {
            await useCase.execute({ code, password })

            return response.sendStatus(200)
        } catch (err) {
            return response.sendStatus(400)
        }
    }
}