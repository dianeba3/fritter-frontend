import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import UserCollection from '../user/collection';
import FollowerBarrierCollection from './collection';
import FollowerBarrierModel from './model';


/**
 * Checks if a passcode in req.body is valid, that is, at 6-50 characters long without any spaces
 */
const isValidPasscode = async (req: Request, res: Response, next: NextFunction) => {
    const passcodeRegex = /^\S+$/;
    const passcodeContent = req.body.passcode as string;

    if (!passcodeRegex.test(req.body.passcode)) {
        res.status(400).json({
            error: {
                password: 'Passcode must be a nonempty string.'
            }
        });
        return;
    }

    if (passcodeContent.length > 15) {
        res.status(413).json({
          error: 'Passcode must be no more than 15 characters.'
        });
        return;
    }

    next();
};

/**
 * Checks that the user does not already have a follower barrier
 */
 const doesNotAlreadyExist = async (req: Request, res: Response, next: NextFunction) => {
    const user_Id = (req.session.userId as string) ?? ""; // Will not be an empty string since its validated in isUserLoggedIn
    const user = await UserCollection.findOneByUserId(user_Id);
    const followerBarrier = await FollowerBarrierModel.find({username: user.username});
    if (followerBarrier.length >= 1) { //one already exists
        res.status(403).json({
            error: {
                password: 'You already have a Follower Barrier'
            }
        });
        return;
    }
    next();
};


/**
 * Checks that the user does already have a follower barrier
 */
 const doesAlreadyExist = async (req: Request, res: Response, next: NextFunction) => {
    const user_Id = (req.session.userId as string) ?? ""; // Will not be an empty string since its validated in isUserLoggedIn
    const user = await UserCollection.findOneByUserId(user_Id);
    const followerBarrier = await FollowerBarrierModel.find({username: user.username});
    if (followerBarrier.length === 0) { 
        res.status(403).json({
            error: {
                password: 'You do not have a Follower Barrier to delete'
            }
        });
        return;
    }
    next();
};


export {
    isValidPasscode,
    doesNotAlreadyExist,
    doesAlreadyExist
};
