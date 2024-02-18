import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Boolean, default: false }) // Para probar como lo guarda en la base de datos
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
