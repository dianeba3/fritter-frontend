import type { NextFunction, Request, Response } from "express";
import express from "express";
import * as userValidator from "../user/middleware";
import * as interactionValidator from "./middleware";
import InteractionCollection from "./collection";
import * as util from "./util";


const router = express.Router();

/**
 * Get all the interactions
 *
 * @name GET /api/interaction
 *
 * @return {InteractionResponse[]} - A list of all the interactions
 */
/**
 * Get interactions by freetID.
 *
 * @name GET /api/interaction?freetId=id
 *
 * @return {InteractionResponse[]} - An array of interactions created by freet with id, freetId
 * @throws {400} - If freetId is not given
 * @throws {403} - If the user is not logged in
 * @throws {404} - If freet with freetId does not exist
 *
 */
/**
 * Get num of interactions with freetID and type.
 *
 * @name GET /api/interaction?freetId=id&interType=type
 *
 * @return {InteractionResponse[]} - An array of interactions created by freet with id, freetId
 * @throws {400} - If freetId is not given
 * @throws {403} - If the user is not logged in
 * @throws {404} - If freet with freetId does not exist
 *
 */
 router.get(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
      if (req.query.freetId !== undefined) {
        next();
        return;
      }
  
      const allFreets = await InteractionCollection.findAll();
      const response = allFreets.map(util.constructInteractionResponse);
      res.status(200).json(response);
    },
    [
      userValidator.isUserLoggedIn,
      interactionValidator.isFreetExistsQuery
    ],
    async (req: Request, res: Response) => {
      const num = await InteractionCollection.findNumByType(req.query.freetId as string, req.query.interType as string)
      res.status(200).json(num);
    },
    [
      userValidator.isUserLoggedIn,
      interactionValidator.isFreetExistsQuery
    ],
    async (req: Request, res: Response) => {
      const interactionFreets = await InteractionCollection.findAllByFreetId(req.query.freetId as string);
      const response = interactionFreets.map(util.constructInteractionResponse);
      res.status(200).json(response);
    }
  );

/**
 * Create an new user interaction
 *
 * @name POST /api/interaction
 *
 * @param {string} username - The user's username
 * @param {string} type - The type of interaction
 * @param {string} freetId - The interaction's freetId
 * @param {string} content - The interaction's content - nonempty if 'reply'
 * @return {InteractionResponse} - An object with user's details
 * @throws {403} - If if the user is not logged in or user wants to like/dislike a freet that is already liked/disliked
 * @throws {404} if authorId is not a recognized username of any user
 * @throws {404} if freetId is invalid
 * @throws {404} if type is not a recognized type of interaction
 * @throws {413} if the new freet interaction content is more than 140 characters long
 * 
 */
 router.post(
    "/",
    [
        userValidator.isUserLoggedIn,
        interactionValidator.isAuthorExists,
        interactionValidator.isFreetExistsBody,
        interactionValidator.isValidType,
        interactionValidator.isValidReply,
        interactionValidator.isOnlyOneLikeorDislike

    ],
    async (req: Request, res: Response) => {
      const username = (req.session.userId as string) ?? ""; // Will not be an empty string since its validated in isUserLoggedIn
      
      let content;
      if (!req.body.content){ //type is not reply - no content
        content = " ";
      }else{
        content = req.body.content;
      }
      const interaction = await InteractionCollection.addOne(
        username,
        req.body.type,
        req.body.freetId,
        content,
      );
  
      res.status(201).json({
        message: `Your interaction was created successfully.`,
        interaction: util.constructInteractionResponse(interaction),
      });
    }
);

/**
 * Delete an interaction.
 *
 * @name DELETE /api/interaction/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of the interaction
 * @throws {404} - If the interactionId is not valid

 */
 router.delete(
    "/:interactionId?",
    [
        userValidator.isUserLoggedIn,
        interactionValidator.isValidInteractionId,
        interactionValidator.isValidInteractionDeleter,
    ],
    async (req: Request, res: Response) => {
      const userId = (req.session.userId as string) ?? ""; // Will not be an empty string since its validated in isUserLoggedIn
      await InteractionCollection.deleteOne(req.params.interactionId);
      res.status(200).json({
        message: "Your interaction has been deleted successfully.",
      });
    }
);

/**
 * Modify an interaction - change the content of the reply
 *
 * @name PUT /api/interaction/:id
 *
 * @param {string} content - the new content for the reply
 * @return {InteractionResponse} - the updated interaction
 * @throws {400} - If the reply content is empty or a stream of empty spaces
 * @throws {403} - if the user is not logged in or not the author of
 *                 of the reply
 * @throws {404} - If the interactionId is not valid
 * @throws {413} - If the reply is more than 140 characters long
 */
 router.put(
    '/:interactionId?',
    [
      userValidator.isUserLoggedIn,
      interactionValidator.isValidInteractionId,
      interactionValidator.isValidFreetModifierFromId,
      interactionValidator.isValidReplyContent
    ],
    async (req: Request, res: Response) => {
      const interaction = await InteractionCollection.updateOne(req.params.interactionId, req.body.content);
      res.status(200).json({
        message: 'Your reply was updated successfully.',
        freet: util.constructInteractionResponse(interaction)
      });
    }
);
  

export {router as interactionRouter};
