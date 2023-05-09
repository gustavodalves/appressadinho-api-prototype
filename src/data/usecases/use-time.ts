import { UseTime } from "../../domain/entities/use-time";
import { UseApp } from "../../domain/usecases/use-app";
import { CreateUseTimeRepository } from "../repositories/create-use-time";
import { FindUser } from "../repositories/find-user";

export class UseAppUseCase implements UseApp {
    constructor(
        private readonly findUser: FindUser,
        private readonly createTime: CreateUseTimeRepository,
    ) {}

    async execute(input: { cpf: string; startAt: Date; endsAt: Date; }): Promise<UseTime> {
        const user = await this.findUser.findByCpf(input.cpf)

        const useTime = new UseTime(
            user, input.startAt, input.endsAt
        )

        await this.createTime.create(useTime)

        return useTime
    }
}
