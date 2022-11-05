import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import { User } from '../user/model';

/**
 * This file defines the properties stored in an Interaction
 */

// Type definition for Interaction on the backend
export type Interaction = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  authorId: Types.ObjectId;
  type: string; 
  freetId: string;
  content: string;
};
  
export type PopulatedInteraction = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  authorId: User;
  type: string; 
  freetId: string;
  content: string;
};

const InteractionShema = new Schema({
  // The user the profile belongs to
  authorId: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // the type of interaction: 'reply', 'like', 'dislike',
  type: {
    type: String,
    required: true,
  },
  // the id of the freet to which the interaction belongs to
  freetId: {
    type: String,
    required: true,
  },
  // if the type of interaction is a 'reply' then it will have a non empty content
  content: {
    type: String,
    required: true,
  },
  
});

const InteractionModel = model<Interaction>('Interaction', InteractionShema);
export default InteractionModel;
