import type { HydratedDocument, Types } from "mongoose";
import type { FollowerBarrier } from "./model";
import FollowerBarrierModel from "./model";

/**
 * This file contains a class with functionality to interact with Follower Barriers stored
 * in MongoDB
 */
 class FollowerBarrierCollection {
    /**
     * Create a Follower Barrier for a user
     *
     * @param {string} username - The user who needs a follower barrier 
     * @param {string} passcode - The passcode needed to follow new users
     * @return {Promise<HydratedDocument<FollowerBarrier>>} - The newly created follower barrier
     */
    static async addOne(username: string, passcode: string): Promise<HydratedDocument<FollowerBarrier>> {
      const follower_barrier = new FollowerBarrierModel({ username, passcode });
      await follower_barrier.save();
      return follower_barrier;
    }

    /**
     * Update a follower barrier with the new passcode
     *
     * @param {string} username - The username of the follower barrier object
     * @param {string} newPasscode - The new passcode of the follower barrier
     * @return {Promise<HydratedDocument<FollowerBarrier>>} - The newly updated freet
     */
    static async updateOne(username: string, newPasscode: string): Promise<HydratedDocument<FollowerBarrier>> {
        const barrier = await FollowerBarrierModel.findOne({username: username});
        barrier.passcode = newPasscode;
        await barrier.save();
        return barrier;
    }

    /**
     * Delete a Follower Barrier 
     *
     * @param {string} username - The user who needs a follower barrier 
     * @return {Promise<Boolean>} - true if the follower barrier has been deleted
     */
     static async deleteOne(user: string): Promise<boolean> {
        const follower_barrier = await FollowerBarrierModel.deleteOne({username: user});
        return follower_barrier !== null;
    }

}

export default FollowerBarrierCollection;
