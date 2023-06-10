import { RecoverCode } from "../../domain/entities/recover-code";
import { ForgotPassword } from "../../domain/usecases/forgot-password";
import { MailSender } from "../protocols/mail";
import { CreateCode } from "../repositories/create-code";
import { FindUser } from "../repositories/find-user";

export class ForgotPasswordUseCase implements ForgotPassword{
    constructor(
        private readonly findUser: FindUser,
        private readonly mailSender: MailSender,
        private readonly createRecoverCode: CreateCode,
    ) {}

    generate(quantidade: number): string {
        const caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let resultado = '';
      
        for (let i = 0; i < quantidade; i++) {
          const indice = Math.floor(Math.random() * caracteres.length);
          resultado += caracteres.charAt(indice);
        }
      
        return resultado;
      }

    async execute(input: { email: string; }): Promise<void> {
        const { email } = input

        const code = this.generate(6)
        const user = await this.findUser.findByEmail(email)
        const recoverCode = new RecoverCode(
            user, code, true
        )

        try {
            await this.createRecoverCode.create(recoverCode)
            await this.mailSender.sendMail(email, code)
        } catch {
            throw new Error("erro at send mail to user")
        }
    }
}