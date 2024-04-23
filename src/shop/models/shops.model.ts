import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { LocationInput } from 'src/utility/constant/Location.input';

@Schema({
	timestamps: true,
})

export class Shop{
   @ApiProperty({ type: String })
   _id: mongoose.Types.ObjectId;

   @Prop({ required: true })
   @ApiProperty({ type: String })
   name: string;

   @Prop({})
   @ApiProperty({ type: String })
   description: string;

   @Prop({})
  @ApiProperty({ type: String })
  profileImage: string;

  @Prop({ type: [String] })
  @ApiProperty({ type: [String] })
  coverImages: string[];

  @Prop({})
  @ApiProperty({ type: String })
  category: string;

  @Prop({ default: 0 })
  @ApiProperty({ type: Number })
  followers: number;

  @Prop({ default: false })
  @ApiProperty({ type: Boolean })
  isFollowed: boolean;

  @Prop({ default: 0 })
  @ApiProperty({ type: Number })
  menuCounts: number;
  
  @Prop({ type: Number, default: 0 })
  reviewsCount: number;

  @Prop({
   type: [
     {
       type: String,
       enum: ['online-store', 'in-store', 'online & in-store'],
     },
   ],
   default: 'online & in-store',
 })
 storeType: string;

 @Prop()
 @ApiProperty({ type: String })
 address: string;

 @Prop()
 @ApiProperty({ type: String })
 phone: string;

 @Prop()
 @ApiProperty({ type: String })
 openingDate: string;

 @Prop({ type: [String] })
 @ApiProperty({ type: [String] })
 socialMediaLink: string[];

 @Prop({ default: 0 })
 @ApiProperty({ type: Number })
 ratings: number;

 @Prop({ default: 0 })
 @ApiProperty({ type: Number })
 ratingsCount: number;

 @Prop({ default: false })
  @ApiProperty({ type: Boolean })
  confirm: boolean; 

  @Prop({ default: false })
  @ApiProperty({ type: Boolean })
  verify: boolean;

  @Prop({ default: false })
  @ApiProperty({ type: Boolean })
  verificationRequest: boolean;

  @Prop({ required: true })
  @ApiProperty({ type: String })
  deliveryFees: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  @ApiProperty({ type: Types.ObjectId, description: 'User reference' })
  owner: Types.ObjectId;
 
  @ApiProperty({ type: LocationInput, required: false })
  @Prop({
    type: LocationInput,
  })
  location: LocationInput;

}