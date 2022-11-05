import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import {User} from '../user/model';


/**
 * This file defines the properties stored in a Profile
 */

// Type definition for Profile on the backend
export type Profile = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  userId: Types.ObjectId;
  picture: string; // for now - need to find type for image
  bio: string;

};

export type PopulatedProfile = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  userId: User;
  picture: string; // for now - need to find type for image
  bio: string;

};


// Mongoose schema definition for interfacing with a MongoDB table
// Profile stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const ProfileSchema = new Schema({
  // The user the profile belongs to
  userId: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // the profile picture
  picture: {
    type: String,
    required: true,
  },
  // the profile bio
  bio: {
    type: String,
    required: true,
  },
  
});

const ProfileModel = model<Profile>('Profile', ProfileSchema);
export default ProfileModel;
