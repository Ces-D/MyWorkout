import {
    AuthenticationError,
    FormatError,
    NotFoundError,
    BadRequest,
} from "./errors.js";

export default function errorHandler (error) {
    // should be able to differentiate the kind of error and create appropriate response
    // function receives errors of certain instanceof and should respond

    let options = {
        errorTitle: error.name,
        errorMessage: error.message,
    };
    if (error instanceof AuthenticationError) {
        res.status(401).render("error", options);
    }
    if (error instanceof FormatError) {
        res.status(400).render("error", options);
    }
    if (error instanceof NotFoundError) {
        res.status(404).render("error", options);
    }
    if (error instanceof BadRequest) {
        res.status(400).render("error", options);
    } else {
        res.status(500).render("error", options);
    }
};
