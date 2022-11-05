import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import UserCollection from '../user/collection';
import FreetCollection from '../freet/collection';
import InteractionCollection from './collection';
import InteractionModel from './model';

/**
 * Checks if a freet with freetId in req.body exists
 */
const isFreetExistsBody = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.body.freetId);
  const freet = validFormat ? await FreetCollection.findOne(req.body.freetId) : '';
  if (!freet) {
    res.status(404).json({
      error: {
        freetNotFound: `Freet with freet ID ${req.body.freetId} does not exist.`
      }
    });
    return;
  }

  next();
};


/**
 * Checks if a freet with freetId is req.query exists
 */
 const isFreetExistsQuery = async (req: Request, res: Response, next: NextFunction) => {
    const validFormat = Types.ObjectId.isValid(req.query.freetId as string);
    const freet = validFormat ? await FreetCollection.findOne(req.query.freetId as string) : '';
    if (!freet) {
      res.status(404).json({
        error: {
          freetNotFound: `Freets with freet ID ${req.params.freetId} does not exist.`
        }
      });
      return;
    }
  
    next();
  };
  
/**
 * Checks if a user with userId in req.session exists
 */
 const isAuthorExists = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.userId) {
      res.status(400).json({
        error: 'Provided author username must be nonempty.'
      });
      return;
    }
  
    const user = await UserCollection.findOneByUserId(req.session.userId as string);
    if (!user) {
      res.status(404).json({
        error: `A user with username ${req.session.userId as string} does not exist.`
      });
      return;
    }
  
    next();
};

/**
 * Checks if the current user is the author of the freet whose freetId is in req.body
 */
const isValidFreetModifier = async (req: Request, res: Response, next: NextFunction) => {
    const freet = await FreetCollection.findOne(req.body.freetId);
    const userId = freet.authorId._id;
    if (req.session.userId !== userId.toString()) {
      res.status(403).json({
        error: 'Cannot modify other users\' freets.'
      });
      return;
    }
  
    next();
};

/**
 * Checks if the current user is the author of the interaction whose interaction is in req.params
 */
 const isValidFreetModifierFromId = async (req: Request, res: Response, next: NextFunction) => {
  const interaction = await InteractionCollection.findOne(req.params.interactionId);
  const freet = await FreetCollection.findOne(interaction.freetId);
  const userId = freet.authorId._id;
  if (req.session.userId !== userId.toString()) {
    res.status(403).json({
      error: 'Cannot modify other users\' replies.'
    });
    return;
  }

  next();
};

/**
 * Checks that the type of interaction is valid
 */
 const isValidType = async (req: Request, res: Response, next: NextFunction) => {
    const types = ["reply", "like", "dislike"];
    if (!types.includes(req.body.type)) {
      res.status(404).json({
        error: 'Not a valid type of interaction. Must be one of the following: reply, like, or dislike'
      });
      return;
    }
  
    next();
};

/**
 * Checks if the reply interaction is nonempty and no more than 140 chars long
 */
 const isValidReply = async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.type === "reply"){
        if (!req.body.content){
            res.status(404).json({
                error: 'Not a valid reply. Must be nonempty'});
                return;
        }
        if (req.body.content.length > 140) {
            res.status(413).json({
              error: 'Reply content must be no more than 140 characters.'
            });
            return;
        }
    }
  
    next();
};

/**
 * Checks if the reply interaction is nonempty and no more than 140 chars long
 */
 const isValidReplyContent = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.content){
        res.status(404).json({
            error: 'Not a valid reply. Must be nonempty'});
            return;
    }
    if (req.body.content.length > 140) {
        res.status(413).json({
          error: 'Reply content must be no more than 140 characters.'
        });
        return;
    }

  next();
};

/**
 * Checks if the interactionId in req.params exists
 */
 const isValidInteractionId = async (req: Request, res: Response, next: NextFunction) => {
    const validFormat = Types.ObjectId.isValid(req.params.interactionId);
    const interaction = validFormat ? await InteractionCollection.findOne(req.params.interactionId) : '';
    if (!interaction) {
    res.status(404).json({
      error: {
        freetNotFound: `Interaction with interaction ID ${req.params.interactionId} does not exist.`
      }
    });
    return;
  }

  next();
};

/**
 * Checks if the current user is the author of the interaction whose Id is in req.params
 */
 const isValidInteractionDeleter = async (req: Request, res: Response, next: NextFunction) => {
    const interaction = await InteractionCollection.findOne(req.params.interactionId);
    const userId = interaction.authorId._id;
    if (req.session.userId !== userId.toString()) {
      res.status(403).json({
        error: 'Cannot modify other users\' interactions.'
      });
      return;
    }
  
    next();
};

/**
 * Checks that the user is not both liking and disliking freet - only one
 */
 const isOnlyOneLikeorDislike = async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.type === 'dislike' || req.body.type === 'like'){

        const interactions = await InteractionModel.find({
            userId: req.session.userId,
            freetId: req.body.freetId
        }).populate('authorId');
        const numInteractions = interactions.length;
    
        if (numInteractions >= 1) {
            for (let i=0; i<numInteractions; i++){
                if (interactions[i].type === 'like' || interactions[i].type === 'dislike'){
                    res.status(403).json({
                        error: 'Already liked or disliked - delete that interaction first before liking or disliking again'
                      });
                      return;
                }
            }
          
        }
    }
    
    //no error if the user wants to reply or if they are liking or disliking for the frist time
    next();
};

export {
    isFreetExistsBody,
    isAuthorExists,
    isValidFreetModifier,
    isValidType,
    isValidReply,
    isValidInteractionId,
    isValidInteractionDeleter,
    isFreetExistsQuery,
    isOnlyOneLikeorDislike,
    isValidReplyContent,
    isValidFreetModifierFromId
  };