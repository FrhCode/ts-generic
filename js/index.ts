import User from "./model/Users.model";

const user = User.createUser({ name: "farhan" });

console.log(user.get("name"));
