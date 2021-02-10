import csurf from "csurf";

export const csurfProtection = csurf({ cookie: true });
