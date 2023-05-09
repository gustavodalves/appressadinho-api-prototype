import { UseTime } from "../../domain/entities/use-time";

export interface CreateUseTimeRepository {
    create(useTime: UseTime): Promise<void>
}