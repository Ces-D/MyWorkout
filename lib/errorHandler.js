import {
    AuthenticationError,
    FormatError,
    NotFoundError,
    BadRequest,
} from "./errors";

export const errorHandler = (error) => {
    // should be able to differentiate the kind of error and create appropriate response
    // function receives errors of certain instanceof and should respond
    if (error instanceof AuthenticationError) {
    }
    if (error instanceof FormatError) {
    }
    if (error instanceof NotFoundError) {
    }
    if (error instanceof BadRequest) {
    } else {
        
    }
};
