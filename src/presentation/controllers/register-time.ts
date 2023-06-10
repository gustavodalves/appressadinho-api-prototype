import { Request, Response } from "express";

import { RegisterUserUseCase } from "../../data/usecases/register-user";
import { UserRepository } from "../../infra/db/prisma/repositories/user";
import { UseAppUseCase } from "../../data/usecases/use-time";
import { UseTimeRepository } from "../../infra/db/prisma/repositories/use-time";

export class RegisterTimeController {
    async handle(request: Request, response: Response) {
        const { cpf, startAt, endAt } = request.body;

        const userRepository = new UserRepository()
        const useTimeRepository = new UseTimeRepository()

        const useAppUseCase = new UseAppUseCase(
            userRepository,
            useTimeRepository
        )
        const startAtDateInDate = new Date(startAt)
        const endAtDateInDate = new Date(endAt)

        const useTime = await useAppUseCase.execute({cpf, startAt: startAtDateInDate, endsAt: endAtDateInDate})

        return response.status(201).json(useTime)
    }
}
