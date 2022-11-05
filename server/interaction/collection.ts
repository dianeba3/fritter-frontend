import FreetCollection from '../freet/collection';
import type {HydratedDocument, Types} from 'mongoose';
import type { Interaction } from "./model";
import InteractionModel from './model';
import UserCollection from '../user/collection';

/**
 * This files contains a class that has the functionality to explore interactions
 * stored in MongoDB, including adding, finding, updating, and deleting interactions.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<Interaction> is the output of the InteractionModel() constructor,
 * and contains all the information in Interaction. https://mongoosejs.com/docs/typescript.html
 */

 class InteractionCollection {

    /**
     * Add a freet to the collection
     *
     * @param {string} authorId - The id of the author of the interaction
     * @param {string} type - The type of interaction
     * @param {string} freetId - The id of the freet of the interaction
     * @param {string} content - The content of the interaction - nonempty if 'reply'
     * @return {Promise<HydratedDocument<Interaction>>} - The newly created interaction
     */
    static async addOne(authorId: Types.ObjectId | string, type: string, freetId: string, content: string): Promise<HydratedDocument<Interaction>> {
      const interaction = new InteractionModel({authorId, type, freetId, content});

      await interaction.save(); // Saves interaction to MongoDB
      return interaction.populate('authorId');
    }

    /**
     * Get all the interactions in the database
     *
     * @return {Promise<HydratedDocument<Interaction>[]>} - An array of all of the freets
     */
    static async findAll(): Promise<Array<HydratedDocument<Interaction>>> {
        // Retrieves interactions and sorts them from most to least recent
        return InteractionModel.find({}).populate('authorId');
    }

    /**
     * Find an interaction by interactionId
     *
     * @param {string} interactionId - The id of the freet to find
     * @return {Promise<HydratedDocument<Interaction>> | Promise<null> } - The freet with the given freetId, if any
     */
    static async findOne(interactionId: Types.ObjectId | string): Promise<HydratedDocument<Interaction>> {
        return InteractionModel.findOne({_id: interactionId}).populate('authorId');
    }

    /**
     * Get all the interactions with freetId
     *
     * @param {string} freetId - The freetId of the interactions
     * @return {Promise<HydratedDocument<Interaction>[]>} - An array of all of the freets
     */
    static async findAllByFreetId(freetId: string): Promise<Array<HydratedDocument<Interaction>>> {
        const freet = await FreetCollection.findOne(freetId);
        return InteractionModel.find({freetId: freetId}).populate('authorId');
    }

    /**
     * Get all the interactions with userId
     *
     * @param {string} userId - The userId of the interactions
     * @return {Promise<HydratedDocument<Interaction>[]>} - An array of all of the freets
     */
     static async findAllByUserId(userId: string): Promise<Array<HydratedDocument<Interaction>>> {
        const user = await UserCollection.findOneByUserId(userId);
        return InteractionModel.find({authorId: user._id}).populate('authorId');
    }

    /**
     * Get the number of interactions for a given interaction type for a freet with given freetId
     *
     * @param {string} freetId - The freetId of the interactions
     * @param {string} type - the type of interaction to get count for
     * @return {Promise<number>} - The number of all of the interactions of type
     */
     static async findNumByType(freetId: string, type: string): Promise<number> {
      let count = 0;
      const freets = await InteractionCollection.findAllByFreetId(freetId);
      for (let i=0; i<freets.length; i++){
        if (freets[i].type === type){
          count ++;
        }
      }
      return count;
    }

    /**
     * Update an interaction reply with the new content
     *
     * @param {string} interactionId - The id of the interaction to be updated
     * @param {string} content - The new content of the reply
     * @return {Promise<HydratedDocument<Interaction>>} - The newly updated interaction
     */
    static async updateOne(interactionId: Types.ObjectId | string, content: string): Promise<HydratedDocument<Interaction>> {
      const interaction = await InteractionModel.findOne({_id: interactionId});
      interaction.content = content;
      await interaction.save();
      return interaction.populate('authorId');
    }

    /**
     * Delete an interaction with given interactionID.
     *
     * @param {string} interactionID - The interactionID of the interaction to delete
     * @return {Promise<Boolean>} - true if the freet has been deleted, false otherwise
     */
    static async deleteOne(interactionID: Types.ObjectId | string): Promise<boolean> {
      const freet = await InteractionModel.deleteOne({_id: interactionID});
      return freet !== null;
    }

    /**
     * Delete all the interactions by the given freetId
     *
     * @param {string} freetId - The id of author of freets
     */
      static async deleteMany(freetId: Types.ObjectId | string): Promise<void> {
      await InteractionModel.deleteMany({freetId});
    }


}

export default InteractionCollection;
