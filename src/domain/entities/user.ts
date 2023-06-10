export class User {
    constructor(
        private _name: string,
        private _cpf: string,
        private _state: string,
        private _city: string,
        private _birthDate: Date,
        public password: string,
        public gender: string,
        public email: string,
    ) {}

    get name() {
        return this._name
    }

    get cpf() {
        return this._cpf
    }

    get state() {
        return this._state
    }

    get city() {
        return this._city
    }

    get birthDate() {
        return this._birthDate
    }
}
