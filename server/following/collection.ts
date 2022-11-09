import type { HydratedDocument, Types } from "mongoose";
import type { Following } from "./model";
import FollowingModel from "./model";
import * as util from "./util";

/**
 * This file contains a class with functionality to interact with profiles stored
 * in MongoDB
 */
 class FollowingCollection {
    /**
     * Create a profile for a (new) user
     *
     * @param {string} username - The user doing the following 
     * @param {string} following - The user being followed 
     * @return {Promise<HydratedDocument<Following>>} - The newly created following
     */
    static async addOne(username: string, following: string): Promise<HydratedDocument<Following>> {
      const follow = new FollowingModel({ username, following });
      await follow.save();
      return follow;
    }

    /**
     * Find the following between username and following
     *
     * @param {string} username - The username of the following
     * @param {string} following - The following
     * @return {Promise<HydratedDocument<Following>[]>} - An array of all of the users
     */
     static async findOneByBoth(user: string, following: string): Promise<Array<HydratedDocument<Following>>>  {
        const followingList = FollowingModel.find({
            username: user, 
            following: following
        });
        
        return followingList
    }

    /**
     * Find all the users you are following
     *
     * @param {string} username - The username of the following
     * @return {Promise<HydratedDocument<Following>[]>} - An array of all of the users
     */
     static async findFollowing(user: string): Promise<Array<HydratedDocument<Following>>>  {
        const followingList = FollowingModel.find({username: user});
        return followingList;
    }

    /**
     * Find all the users following you
     *
     * @param {string} username - The username of the following
     * @return {Promise<HydratedDocument<Following>[]>} - An array of all of the users
     */
     static async findFollowers(user: string): Promise<Array<HydratedDocument<Following>>>  {
        const followingList = FollowingModel.find({following: user});
        return followingList;
    }

    /**
     * Delete a following - user is unfollowing `follower`.
     *
     * @param {string} username - The username of the following
     * @param {string} unfollow - The following
     * @return {Promise<Boolean>} - true if the following has been deleted, false otherwise
     */
    static async deleteOne(user: string, unfollow: string): Promise<boolean> {
        const follow = await FollowingModel.deleteOne({username: user, following: unfollow});
        return follow !== null;
    }

    /**
     * Delete all following with username as username
     *
     * @param {string} username - The username of the following
     * @return {Promise<void>} - true if the following has been deleted, false otherwise
     */
     static async deleteManyUser(user: string): Promise<void> {
        await FollowingModel.deleteMany({username: user});
        
    }

    /**
     * Delete all followings with following as following
     *
     * @param {string} following - The following
     * @return {Promise<void>} - true if the following has been deleted, false otherwise
     */
     static async deleteManyFollowing(following: string): Promise<void> {
        await FollowingModel.deleteMany({following: following});
        
    }

}

export default FollowingCollection;
