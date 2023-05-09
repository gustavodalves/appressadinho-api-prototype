import { PrismaClient } from "@prisma/client";
import { CreateUseTimeRepository } from "../../../../data/repositories/create-use-time";
import { UseTime } from "../../../../domain/entities/use-time";

export class UseTimeRepository implements CreateUseTimeRepository {
    constructor(
        private readonly prisma: PrismaClient
    ) {}

    async create(useTime: UseTime): Promise<void> {
        await this.prisma.useTime.create({
            data: {
                user: {
                    connect: {
                        cpf: useTime.user.cpf
                    }
                },
                endAt: useTime.endAt,
                startAt: useTime.startAt
            }
        })
    }
}
