import { PrismaClient } from "@prisma/client";
import { CreateUseTimeRepository } from "../../../../data/repositories/create-use-time";
import { UseTime } from "../../../../domain/entities/use-time";
import { prisma } from "../instance";
import { CreateCode } from "../../../../data/repositories/create-code";
import { RecoverCode } from "../../../../domain/entities/recover-code";
import { FindCode } from "../../../../data/repositories/find-code";
import { User } from "../../../../domain/entities/user";

export class RecoverCodeRepository implements CreateCode, FindCode {
    private readonly prisma: PrismaClient = prisma

    async create(recoverCode: RecoverCode): Promise<void> {
        await this.prisma.recoverCode.create({
            data: {
                code: recoverCode.code,
                user: {
                    connect: {
                        email: recoverCode.user.email
                    }
                }
            },
        })
    }

    async findByCode(code: string): Promise<RecoverCode> {
        const recoverCode = await this.prisma.recoverCode.findUnique({
            where: { code },
            include: { user: true }
        })

        if(!recoverCode) throw new Error("")

        return new RecoverCode(
            new User(
                recoverCode.user.name,
                recoverCode.user.cpf,
                recoverCode.user.state,
                recoverCode.user.city,
                recoverCode.user.birthDate,
                recoverCode.user.password,
                recoverCode.user.gender,
                recoverCode.user.email,
            ), recoverCode?.code, true
        )
    }
}
