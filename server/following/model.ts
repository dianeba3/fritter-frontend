import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

/**
 * This file defines the properties stored in a Following
 */

// Type definition for Following on the backend
export type Following = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  username: string;
  following: string; 
};

// Mongoose schema definition for interfacing with a MongoDB table
// Following stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const FollowingSchema = new Schema({
  // The user the Following belongs to
  username: {
    // Use Types.ObjectId outside of the schema
    type: String,
    required: true,
  },
  following: {
    // Use Types.ObjectId outside of the schema
    type: String,
    required: true,
  },
  
});

const FollowingModel = model<Following>('Following', FollowingSchema);
export default FollowingModel;
