import Users from "./Users";
import Exercises from "./Exercises";
import Programs from "./Programs";
import Workouts from "./Workouts";

Users.hasMany(Programs);
Users.hasMany(Workouts);
Users.hasMany(Exercises);

export { Users, Exercises, Programs, Workouts };
