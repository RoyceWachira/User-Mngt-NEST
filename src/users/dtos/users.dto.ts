export enum Roles{
    User="User",
    Admin="Admin"
}


export class CreateUsersDto{
    username:string;
    password:string;
    confirmpassword:string;
    userdob:Date;
    usergender:string;
    usermail:string;
    Role:Roles[];
}