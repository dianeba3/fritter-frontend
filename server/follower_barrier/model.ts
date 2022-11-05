import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

/**
 * This file defines the properties stored in a Follower Barrier
 */

// Type definition for Follower Barrier on the backend
export type FollowerBarrier = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  username: string;
  passcode: string; 
};

// Mongoose schema definition for interfacing with a MongoDB table
// Follower Barrier stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const FollowerBarrierSchema = new Schema({
  // The user the Follower Barrier belongs to
  username: {
    type: String,
    required: true,
  },
  passcode: {
    type: String,
    required: true,
  },
  
});

const FollowerBarrierModel = model<FollowerBarrier>('FollowerBarrier', FollowerBarrierSchema);
export default FollowerBarrierModel;
