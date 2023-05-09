export interface TokenGenerator {
    generate(plaintext: string): string
}
