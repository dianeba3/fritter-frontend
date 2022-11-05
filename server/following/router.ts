import type { NextFunction, Request, Response } from "express";
import express from "express";
import * as util from "./util";
import FollowingCollection from "./collection";
import UserCollection from "../user/collection";
import * as userValidator from "../user/middleware";
import * as interactionValidator from "../interaction/middleware";
import * as followingValidator from "./middleware";
// import * as followerBarrierValidator from "../follower_barrier/middleware";

// import FollowingModel from "./model";
// import FollowerBarrierModel from "../follower_barrier/model";

const router = express.Router();

/**
 * Get all the users you are following
 *
 * @name GET /api/following/following
 *
 * @return {FollowingResponse[]} - A list of all the users you follow
 * @throws {403} if the user is not logged in
 * @throws {404} if user is not a recognized username of any user
 */
 router.get(
    '/following',
    [
        userValidator.isUserLoggedIn,
        interactionValidator.isAuthorExists,
    ],
    async (req: Request, res: Response) => {
      const userFollower = (req.session.userId as string) ?? ""; // Will not be an empty string since its validated in isUserLoggedIn
      const user = await UserCollection.findOneByUserId(userFollower);
      const allFollowing = await FollowingCollection.findFollowing(user.username as string);
      const response = allFollowing.map(util.constructFollowingResponse);
      res.status(200).json({
        message: `Users you follow:`,
        following: response,
      });
});

/**
 * Get all the users that are following you
 *
 * @name GET /api/following/followers
 *
 * @return {FollowingResponse[]} - A list of all the users following you
 */
 router.get(
    '/followers',
    [
        userValidator.isUserLoggedIn,
        interactionValidator.isAuthorExists,
    ],
    async (req: Request, res: Response) => {
      const userFollower = (req.session.userId as string) ?? ""; // Will not be an empty string since its validated in isUserLoggedIn
      const user = await UserCollection.findOneByUserId(userFollower);
      const allFollowing = await FollowingCollection.findFollowers(user.username as string);
      const response = allFollowing.map(util.constructFollowingResponse);
      res.status(200).json({
        message: `Your list of followers:`,
        following: response,
      });
});

/**
 * Create an new following
 *
 * @name POST /api/following
 *
 * @param {string} following - The user being followed 
 * @return {FollowingResponse} - An object with user's details 
 * @throws {403} if the user is not logged in
 * @throws {400} if the user has a follower barrier and is missing the passcode
 * @throws {401} if the user has a follower barrier and entered the wrong credentials
 * @throws {403} if the user is trying to follow itself
 * @throws {403} if the user already follows `following`
 * @throws {404} if following/user is not a recognized username of any user
 */
 router.post(
    "/",
    [
        userValidator.isUserLoggedIn,
        interactionValidator.isAuthorExists,
        followingValidator.isUserExistsBody,
        followingValidator.followerNotSameAsUser,
        followingValidator.isAlreadyFollowed,
        followingValidator.validPasscodeForBarrier,

    ],
    async (req: Request, res: Response) => {
      const userFollower = (req.session.userId as string) ?? ""; // Will not be an empty string since its validated in isUserLoggedIn
      const user = await UserCollection.findOneByUserId(userFollower);

    //   const barrierExist = await FollowerBarrierModel.find({username: user.username});

      const newFollow = await FollowingCollection.addOne(
        user.username as string,
        req.body.following as string,
      );
  
      res.status(201).json({
        message: `Your following was created successfully.`,
        following: util.constructFollowingResponse(newFollow),
      });
    }
);

/**
 * Delete a following
 *
 * @name DELETE /api/following/:following
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in 
 * @throws {403} if the user does not already follow `follower`
 * @throws {403} if the user is trying to unfollow itself
 * @throws {404} if follower/user is not a recognized username of any user
 */
 router.delete(
    '/:following?',
    [
      userValidator.isUserLoggedIn,
      followingValidator.followerNotSameAsUserParams,
      interactionValidator.isAuthorExists,
      followingValidator.isUserExistsParams,
      followingValidator.isAlreadyFollowedToUnfollowParams,
    ],
    async (req: Request, res: Response) => {
      const user_id = (req.session.userId as string) ?? ""; // Will not be an empty string since its validated in isUserLoggedIn
      const user = await UserCollection.findOneByUserId(user_id);
      const unfollow = req.params.following as string;

      await FollowingCollection.deleteOne(user.username as string, unfollow);
      res.status(200).json({
        message: 'Your following was deleted successfully.'
      });
    }

);


export { router as followingRouter };
