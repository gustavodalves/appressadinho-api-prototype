import { RecoverCode } from "../../domain/entities/recover-code";

export interface FindCode {
    findByCode(code: string): Promise<RecoverCode>
}