import { FindCode } from "../repositories/find-code";

export class ValidateToken {
    constructor(
        private readonly findCode: FindCode
    ) {}
    async execute(token: string) {
        try {
            const recoverCode = await this.findCode.findByCode(token)

            return !!recoverCode?.isActive
        } catch {
            throw new Error("invalid code")
        }
    }
}
