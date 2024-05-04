import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document , Types} from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';

@Schema({
	timestamps: true,
})

export class SalePerson {
   @ApiProperty({ type: String, description: 'User ID' })
   _id: mongoose.Types.ObjectId;

   @ApiProperty({ type: String })
	@Prop({ required: true })
	name: string;

   @ApiProperty({ type: String })
   @Prop()
   profileImage: string;

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

   @Prop({ type: Types.ObjectId, ref: 'Admin' })
   @ApiProperty({ type: Types.ObjectId, description: 'Admin reference' })
   admin: Types.ObjectId;
}

export const SalePersonSchema = SchemaFactory.createForClass(SalePerson)
export interface SalePersonDocument extends SalePerson, Document {
	createdAt: Date;
	updatedAt: Date;
	_id: mongoose.Types.ObjectId;
 }