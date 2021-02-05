export class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = "Authentication Error";
    }
}

export class FormatError extends Error {
    constructor(message) {
        super(message);
        this.name = "Format Error";
    }
}
export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "404 Error";
    }
}

export class BadRequest extends Error {
    constructor(message) {
        super(message);
        this.name = "Bad Request Error";
    }
}
