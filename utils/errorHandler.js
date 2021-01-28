export class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = "Authentication Error";
    }
}

// UserName (unique string max 50) 
// Password (encrypted string max 120)
// created_at (dateTime)
// updated_at (dateTime)
// 
// Exercise (string)
// weight (int )
// Reps (int)
// dateTime (dateTime)
// client (id || username of Client)
// 
// Goal (Larger String)
// Notes (Larger String)

// 