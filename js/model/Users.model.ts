import userProps from "../interface/userProps";
import Attributes from "./Attributes";
import Collections from "./Collections";
import Events from "./Events";
import Model from "./Model";
import Sync from "./Sync";

class User extends Model<userProps> {
    static createUser(attr: userProps): User {
        return new User(
            new Attributes(attr),
            new Sync("http://localhost:3000/users"),
            new Events()
        );
    }

    static buildUserCollections(): Collections<User, userProps> {
        return new Collections<User, userProps>(
            "http://localhost:3000/users",
            (json: userProps) => User.createUser(json)
        );
    }

    isAdmin(): boolean {
        return this.get("id") == 1;
    }
}

export default User;
