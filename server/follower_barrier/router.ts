import type { NextFunction, Request, Response } from "express";
import express from "express";
import * as util from "./util";
import UserCollection from "../user/collection";
import * as userValidator from "../user/middleware";
import * as interactionValidator from "../interaction/middleware";
import * as followingValidator from "../following/middleware";
import * as followerBarrierValidator from "./middleware";
import FollowerBarrierCollection from "./collection";

const router = express.Router();

/**
 * Create a new followerBarrier
 *
 * @name POST /api/followerBarrier
 *
 * @param {string} passcode - The user's new passcode
 * @return {FollowerBarrierResponse} - An object with user's details 
 * @throws {403} - if the user is not logged in or if the user already has a follower barrier
 * @throws {400} - If password is  not in the correct format,
 *                 or missing in the req
 * @throws {404} - if user is not a recognized username of any user
 */
 router.post(
    "/",
    [
        userValidator.isUserLoggedIn,
        interactionValidator.isAuthorExists,
        followerBarrierValidator.isValidPasscode,
        followerBarrierValidator.doesNotAlreadyExist,
    ],
    async (req: Request, res: Response) => {
      const userFollower = (req.session.userId as string) ?? ""; // Will not be an empty string since its validated in isUserLoggedIn
      const user = await UserCollection.findOneByUserId(userFollower);
      const newFollowerBarrier = await FollowerBarrierCollection.addOne(
        user.username as string,
        req.body.passcode as string,
      );
  
      res.status(201).json({
        message: `Your follower barrier was created successfully.`,
        followerBarrier: util.constructFollowerBarrierResponse(newFollowerBarrier),
      });
    }
);

/**
 * Update a user's follower barrier passcode
 *
 * @name PUT /api/follower_barrier
 *
 * @param {string} password - The user's new password
 * @return {FollowerBarrierResponse} - The updated user
 * @throws {403} - if the user is not logged in or if the user does not have a follower barrier
 * @throws {400} - If password is  not in the correct format,
 *                 or missing in the req
 * @throws {413} - if the new passcode is more than 15 characters long
 * @throws {404} - if user is not a recognized username of any user
 */
 router.put(
    "/",
    [
        userValidator.isUserLoggedIn,
        followerBarrierValidator.doesAlreadyExist,
        followerBarrierValidator.isValidPasscode,

    ],
    async (req: Request, res: Response) => {
        const userFollower = (req.session.userId as string) ?? ""; // Will not be an empty string since its validated in isUserLoggedIn
        const user = await UserCollection.findOneByUserId(userFollower);      
        
        const newFollowerBarrier = await FollowerBarrierCollection.updateOne(user.username, req.body.passcode as string);
        
        res.status(200).json({
            message: "Your follower barrier passcode was updated successfully.",
            followerBarrier: util.constructFollowerBarrierResponse(newFollowerBarrier),
        });
    }
  );

/**
 * Delete a follower barrier.
 *
 * @name DELETE /api/followerBarrier
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or the follower barrier does not exist
 */
 router.delete(
    "/",
    [
        userValidator.isUserLoggedIn,
        followerBarrierValidator.doesAlreadyExist,
    ],
    async (req: Request, res: Response) => {
      const userId = (req.session.userId as string) ?? ""; // Will not be an empty string since its validated in isUserLoggedIn
      const user = await UserCollection.findOneByUserId(userId);
      await FollowerBarrierCollection.deleteOne(user.username);
      
      res.status(200).json({
        message: "Your follower barrier has been deleted successfully.",
      });
    }
  );

export { router as followerBarrierRouter };

