import type {HydratedDocument} from 'mongoose';
import type {PopulatedProfile, Profile} from './model';

// Update this if you add a property to the User type!
type ProfileResponse = {
  _id: string;
  userId: string;
  picture: string;
  bio: string;
};


/**
 * Transform a raw User object from the database into an object
 * with all the information needed by the frontend
 * (in this case, removing the password for security)
 *
 * @param {HydratedDocument<Profile>} profile - A user object
 * @returns {ProfileResponse} - The user object without the password
 */
const constructProfileResponse = (profile: HydratedDocument<Profile>): ProfileResponse => {
  const profileCopy: PopulatedProfile = {
    ...profile.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  const {username} = profileCopy.userId;
  delete profileCopy.userId;
  return {
    ...profileCopy,
    _id: profileCopy._id.toString(),
    userId: username,
    picture: profileCopy.picture,
    bio: profileCopy.bio
  };
};

export {
  constructProfileResponse
};
