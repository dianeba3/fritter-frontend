import type {Request, Response, NextFunction} from 'express';
import ProfileCollection from './collection';

/**
 * Checks if the content of the NEW BIO in req.body is no more than 140 characters
 */
 const isValidBio = (req: Request, res: Response, next: NextFunction) => {
    const {bio} = req.body as {bio: string};

    if (bio && bio.length > 140) {
      res.status(413).json({
        error: 'Bio content must be no more than 140 characters.'
      });
      return;
    }
  
    next();
  };

/**
 * Checks if the content of the NEW picture in req.body is not a stream of empty spaces
 */
 const isValidPic = (req: Request, res: Response, next: NextFunction) => {
  const {picture} = req.body as {picture: string};

  if (picture && !picture.trim()) {
    res.status(400).json({
      error: 'Picture content must be at least one character long.'
    });
    return;
  }

  next();
};


/**
 * Checks if a username in req.session is already in use
 */
 const isUsernameNotAlreadyInUse = async (req: Request, res: Response, next: NextFunction) => {
  const user = await ProfileCollection.findOneByUserID(req.session.userId);

  // if a profile doensn't exist under that User then it can go ahead and be created
  if (!user) {
    next();
    return;
  }

  res.status(409).json({
    error: {
      username: 'An account with this username already exists.'
    }
  });
};

export {
  isValidBio,
  isValidPic,
  isUsernameNotAlreadyInUse,
  };


