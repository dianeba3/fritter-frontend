import type {HydratedDocument} from 'mongoose';
import type {Following} from './model';

// Update this if you add a property to the User type!
type FollowingResponse = {
  _id: string;
  username: string;
  following: string;
};


/**
 * Transform a raw Following object from the database into an object
 * with all the information needed by the frontend
 * (in this case, removing the password for security)
 *
 * @param {HydratedDocument<Following>} follow - A following object
 * @returns {FollowingResponse} - The user object without the password
 */
const constructFollowingResponse = (follow: HydratedDocument<Following>): FollowingResponse => {
  const followingCopy: Following = {
    ...follow.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  return {
    ...followingCopy,
    _id: followingCopy._id.toString(),
    username: followingCopy.username.toString(),
    following: followingCopy.following.toString(),
  };
};

export {
  constructFollowingResponse
};
