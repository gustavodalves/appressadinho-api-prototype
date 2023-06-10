import { Comparer } from "../../data/protocols/hasher/compare";
import { Hasher } from "../../data/protocols/hasher/hasher";

import bcrypt from "bcrypt"

export class BcryptAdapter implements Hasher, Comparer {
    constructor(private salts: number) {

    }

    compare(text: string, hash: string): boolean {
        return bcrypt.compareSync(text, hash)
    }

    encrypt(plaintext: string): string {
        return bcrypt.hashSync(plaintext, this.salts)
    }
}