import jwt from 'jsonwebtoken';
import { TokenGenerator } from '../../data/protocols/authentication/token-generator';

export class JwtAdapter implements TokenGenerator {
    constructor(private readonly secret: string) {}

    generate(plaintext: string): string {
        return jwt.sign({
            cpf: plaintext
        }, this.secret)
    }
}
