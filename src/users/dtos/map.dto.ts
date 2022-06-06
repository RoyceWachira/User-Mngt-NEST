import { Roles } from "./users.dto";

export class UserDto{
    constructor (public username,public usermail, public userdob,public usergender, public Role){
        this.username=username;
        this.userdob=userdob;
        this.usergender=usergender;
        this.usermail=usermail;
        this.Role=Role;
    }
}