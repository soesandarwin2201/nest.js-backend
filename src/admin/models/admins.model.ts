import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document , Types} from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, MaxLength } from 'class-validator';

@Schema({
	timestamps: true,
})

export class Admin {
   @ApiProperty({ type: String, description: 'Admin ID' })
   _id: mongoose.Types.ObjectId;

   @ApiProperty({ type: String })
	@Prop({ required: true })
	name: string;

   @ApiProperty({ type: String })
   @Prop()
   profileImage: string;

   @ApiProperty({ type: String })
	@Prop()
	bio: string;

   @ApiProperty({ type: String })
	@Prop({ required: true, unique: true })
	@IsPhoneNumber(null, { message: 'Invalid phone number' })
	phone: string;

   @ApiProperty({ type: String })
	@Prop({ required: true, unique: true })
	email: string;

   @ApiProperty({ type: String })
	@Prop({ required: true })
	password: string;

   @ApiProperty({ type: String })
	@Prop({ enum: ['MALE', 'FEMALE', 'OTHER'], default: 'MALE' })
	gender: string;

   @ApiProperty({ type: String })
	@Prop()
	@MaxLength(6, { message: 'Verification code must be 6 characters or less' })
	verificationCode: string;

   @ApiProperty({ type: Date })
	@Prop()
	verificationCodeExpiresAt: Date;

   @ApiProperty({ type: String, description: 'Admin ID' })
  @Prop({ type: Types.ObjectId, ref: 'Sale Person' })
   salePerson: Types.ObjectId;
}

export const AdminSchema = SchemaFactory.createForClass(Admin)
export interface AdminDocument extends Admin, Document {
	createdAt: Date;
	updatedAt: Date;
	_id: mongoose.Types.ObjectId;
 }