import { PrismaClient } from "@prisma/client";
import { CreateUserRepository } from "../../../../data/repositories/create-user";
import { FindUser } from "../../../../data/repositories/find-user";
import { User } from "../../../../domain/entities/user";
import { prisma } from "../instance";

export class UserRepository implements FindUser, CreateUserRepository {
    private readonly prisma: PrismaClient = prisma
    constructor(
    ) {}

    async create(user: User): Promise<void> {
        await this.prisma.user.create({
            data: {
                birthDate: user.birthDate,
                city: user.city,
                name: user.name,
                cpf: user.cpf,
                state: user.state
            }
        })        
    }

    async findByCpf(cpf: string): Promise<User> {
        const prismaUser = await this.prisma.user.findUnique({
            where: {
                cpf,
            }
        })

        if(!prismaUser) throw new Error('User not found')

        return new User(
            prismaUser.name, prismaUser.cpf, prismaUser.state, prismaUser.city, prismaUser.birthDate
        )
    }
}