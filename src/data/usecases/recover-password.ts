import { Hasher } from "../protocols/hasher/hasher";
import { FindCode } from "../repositories/find-code";
import { UpdateUser } from "../repositories/update-user";

export class RecoverPasswod {
    constructor(
        private readonly findCode: FindCode,
        private readonly hasher: Hasher,
        private readonly updateUser: UpdateUser
    ) {}

    async execute(
        input: { code: string, password: string}
    ) {
        const recoverCode = await this.findCode.findByCode(input.code)

        if(!recoverCode || !recoverCode.isActive) throw new Error("invalid code")

        const password = this.hasher.encrypt(input.password)

        recoverCode.user.password = password

        await this.updateUser.update(recoverCode.user)
    }
}
