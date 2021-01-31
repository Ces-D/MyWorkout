import crypto from "crypto";

export const encryptPassword = (value) => {
    const hmac = crypto.createHmac("sha256", process.env.ENCRYPT_SECRET);
    hmac.update(value);
    return hmac.digest("hex");
};
