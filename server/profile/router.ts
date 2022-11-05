import type { NextFunction, Request, Response } from "express";
import express from "express";
import FreetCollection from "../freet/collection";
// import UserCollection from '../user/collection';
import * as userValidator from "../user/middleware";
import ProfileCollection from "./collection";
import * as profileValidator from "./middleware";
import * as util from "./util";

const router = express.Router();

/**
 * Create an new user profile
 *
 * @name POST /api/profile
 *
 * @param {string} username - The user's username
 * @param {string} bio - The user's bio
 * @param {string} picture - The user's profile picture
 * @return {ProfileResponse} - An object with user's details
 * @throws {403} - If if the user is not logged in
 * @throws {409} - if username is already in use
 * @throws {413} - If the bio is more than 140 characters long
 */
router.post(
  "/",
  [
    userValidator.isUserLoggedIn,
    profileValidator.isValidBio,
    profileValidator.isValidPic,
    profileValidator.isUsernameNotAlreadyInUse,
  ],
  async (req: Request, res: Response) => {
    const username = (req.session.userId as string) ?? ""; // Will not be an empty string since its validated in isUserLoggedIn
    const profile = await ProfileCollection.addOne(
      username,
      req.body.picture,
      req.body.bio
    );

    res.status(201).json({
      message: `Your profile was created successfully.`,
      profile: util.constructProfileResponse(profile),
    });
  }
);


/**
 * Delete a user.
 *
 * @name DELETE /api/profile
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
 */
 router.delete(
    "/",
    [userValidator.isUserLoggedIn],
    async (req: Request, res: Response) => {
      const userId = (req.session.userId as string) ?? ""; // Will not be an empty string since its validated in isUserLoggedIn
      await ProfileCollection.deleteOne(userId);
      // req.session.userId = undefined;
      res.status(200).json({
        message: "Your profile has been deleted successfully.",
      });
    }
);

/**
 * Update a user's profile bio or picture.
 *
 * @name PUT /api/profile
 *
 * @param {string} bio - The user's new bio
 * @return {UserResponse} - The updated user
 * @throws {403} - If user is not logged in
 * @throws {400} - If the bio/picture is empty or a stream of empty spaces
 * @throws {413} - If the bio is more than 140 characters long
 */
 router.put(
    '/',
    [
      userValidator.isUserLoggedIn,
      profileValidator.isValidBio, 
      profileValidator.isValidPic,
    ],
    async (req: Request, res: Response) => {
      const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
      const profile = await ProfileCollection.updateOne(userId, req.body);
      res.status(200).json({
        message: 'Your profile was updated successfully.',
        profile: util.constructProfileResponse(profile)
      });
    }
  );


export { router as profileRouter };
