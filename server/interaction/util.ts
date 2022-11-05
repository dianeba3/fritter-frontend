import type {HydratedDocument} from 'mongoose';
import type {PopulatedInteraction, Interaction} from './model';

// Update this if you add a property to the User type!
type InteractionResponse = {
    _id: string;
    authorId: string;
    type: string;
    freetId: string;
    content: string;
};

/**
 *
 * @param {HydratedDocument<Interaction>} interaction - A user object
 * @returns {InteractionResponse} - The user object
 */
 const constructInteractionResponse = (interaction: HydratedDocument<Interaction>): InteractionResponse => {
    const interactionCopy: PopulatedInteraction = {
      ...interaction.toObject({
        versionKey: false // Cosmetics; prevents returning of __v property
      })
    };
    const {username} = interactionCopy.authorId;
    delete interactionCopy.authorId;
    return {
      ...interactionCopy,
      _id: interactionCopy._id.toString(),
      authorId: username,
      type: interactionCopy.type,
      freetId: interactionCopy.freetId,
      content: interactionCopy.content
    };
  };
  
  export {
    constructInteractionResponse
  };

