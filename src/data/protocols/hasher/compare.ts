export interface Comparer {
    compare(text: string, hash: string): boolean
}