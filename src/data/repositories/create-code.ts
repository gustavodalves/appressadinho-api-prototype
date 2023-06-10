import { RecoverCode } from "../../domain/entities/recover-code";

export interface CreateCode {
    create(recoverCode: RecoverCode): Promise<void>
}