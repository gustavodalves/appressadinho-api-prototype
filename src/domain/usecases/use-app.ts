import { UseTime } from "../entities/use-time"

type Input = {
    cpf: string
    startAt: Date
    endsAt: Date
}

export interface UseApp {
    execute(input: Input): Promise<UseTime>
}
