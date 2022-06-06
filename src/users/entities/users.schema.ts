import { Prop, Schema,SchemaFactory} from "@nestjs/mongoose";
import { Document} from "mongoose";
import { Roles } from "../dtos/users.dto";

export type UserDocument = User & Document;
@Schema()
export class User{
    @Prop()
    username:string;
    @Prop()
    password:string;
    @Prop()
    confirmpassword:string;
    @Prop()
    userdob:Date;
    @Prop()
    usergender:string;
    @Prop()
    usermail:string;
    @Prop()
    Roles:Roles[];
}
export const UserSchema = SchemaFactory.createForClass(User);