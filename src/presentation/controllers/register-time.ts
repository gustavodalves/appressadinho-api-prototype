import { PrismaClient } from "@prisma/client";
import { TokenGenerator } from "../../data/protocols/authentication/token-generator";
import { Request, Response } from "express";

import { RegisterUserUseCase } from "../../data/usecases/register-user";
import { UserRepository } from "../../infra/db/prisma/repositories/user";
import { UseAppUseCase } from "../../data/usecases/use-time";
import { UseTimeRepository } from "../../infra/db/prisma/repositories/use-time";
import { UseTime } from "../../domain/entities/use-time";

export class RegisterTimeController {
    constructor(
        private readonly prisma: PrismaClient,
    ) {}

    async handle(request: Request, response: Response) {
        const { cpf, startAt, endAt } = request.body;

        const userRepository = new UserRepository(this.prisma)
        const useTimeRepository = new UseTimeRepository(this.prisma)

        const useAppUseCase = new UseAppUseCase(
            userRepository,
            useTimeRepository
        )
        const startAtDateInDate = new Date(startAt)
        const endAtDateInDate = new Date(endAt)

        const useTime = await useAppUseCase.execute({cpf, startAt: startAtDateInDate, endsAt: endAtDateInDate})

        return response.status(201).json({ useTime })
    }
}
