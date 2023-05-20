export class Insured {

    constructor(name, email, insuredType) {
        this._name = name;
        this._email = email;
        this._insuredType = insuredType;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get insuredType() {
        return this._insuredType;
    }

    set insuredType(value) {
        this._insuredType = value;
    }
}