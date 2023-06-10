import { PrismaClient } from "@prisma/client";
import { CreateUserRepository } from "../../../../data/repositories/create-user";
import { FindUser } from "../../../../data/repositories/find-user";
import { User } from "../../../../domain/entities/user";
import { prisma } from "../instance";
import { UpdateUser } from "../../../../data/repositories/update-user";

export class UserRepository implements FindUser, CreateUserRepository, UpdateUser {
    private readonly prisma: PrismaClient = prisma

    async create(user: User): Promise<void> {
        await this.prisma.user.create({
            data: {
                birthDate: user.birthDate,
                city: user.city,
                name: user.name,
                cpf: user.cpf,
                state: user.state,
                email: user.email,
                gender: user.gender,
                password: user.password,
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
            prismaUser.name,
            prismaUser.cpf,
            prismaUser.state,
            prismaUser.city,
            prismaUser.birthDate,
            prismaUser.password,
            prismaUser.gender,
            prismaUser.email,
        )
    }

    async findByEmail(email: string): Promise<User> {
        const prismaUser = await this.prisma.user.findUnique({
            where: {
                email,
            }
        })

        if(!prismaUser) throw new Error('User not found')

        return new User(
            prismaUser.name,
            prismaUser.cpf,
            prismaUser.state,
            prismaUser.city,
            prismaUser.birthDate,
            prismaUser.password,
            prismaUser.gender,
            prismaUser.email,
        )
    }

    async update(user: User): Promise<void> {
        const prismaUser = await this.prisma.user.update({
            where: { email: user.email },
            data: {
                ...user
            }
        })
    }
}