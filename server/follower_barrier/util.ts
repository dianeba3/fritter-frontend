import type {HydratedDocument} from 'mongoose';
import type {FollowerBarrier} from './model';

// Update this if you add a property to the User type!
type FollowerBarrierResponse = {
  _id: string;
  username: string;
  passcode: string;
};


/**
 * Transform a raw FollowerBarrier object from the database into an object
 * with all the information needed by the frontend
 * (in this case, removing the passcode for security)
 *
 * @param {HydratedDocument<FollowerBarrier>} follow_barrier- A following object
 * @returns {FollowingResponse} - The user object without the password
 */
const constructFollowerBarrierResponse = (follow_barrier: HydratedDocument<FollowerBarrier>): FollowerBarrierResponse => {
  const followerBarrierCopy: FollowerBarrier = {
    ...follow_barrier.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  delete followerBarrierCopy.passcode;

  return {
    ...followerBarrierCopy,
    _id: followerBarrierCopy._id.toString(),
    username: followerBarrierCopy.username.toString(),
  };
};

export {
    constructFollowerBarrierResponse
};
