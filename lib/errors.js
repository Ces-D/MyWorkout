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
// trainer (string)
// Exercise (string)
// weight (int )
// Reps (int)
// dateTime (dateTime)
// client (id || username of Client)
// 
// Goal (Larger String)
// Notes (Larger String)

// 
// GymSession id
// sessionDate (Date defaults to tomorrow )
// sessionStart 
// sessionEnd
// trainer (defaults to self id || userName)
// client (defaults to self id || username of Client)
// Exercise (string)
// weight (int )
// Reps (int)
// Duration (int)

// Program
// programName
// purpose
// trainer

