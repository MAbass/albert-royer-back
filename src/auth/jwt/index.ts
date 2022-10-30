import { sign } from "jsonwebtoken";

import { User } from "@entities";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ISSUER = process.env.ISSUER;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

type TokenType = "accessToken" | "refreshToken";

const common = {
  accessToken: {
    privateKey: ACCESS_TOKEN_SECRET,
    signOptions: {
      expiresIn: "30d" // 15m
    }
  },
  refreshToken: {
    privateKey: REFRESH_TOKEN_SECRET,
    signOptions: {
      expiresIn: "7d" // 7d
    }
  }
};

/**
 * Returns token.
 *
 * @remarks
 * This method is part of the {@link auth/jwt}.
 *
 * @param user - 1st input
 * @param type - 2nd input
 *
 * @returns The access token mean of `user`
 *
 * @beta
 */
export const generateToken = async (
  user: User,
  type: TokenType
): Promise<string> => {
  return sign(
    {
      _id: user._id
    },
    common[type].privateKey,
    {
      issuer: ISSUER,
      subject: "user.local",
      algorithm: "HS256",
      expiresIn: common[type].signOptions.expiresIn // 15m
    }
  );
};

/**
 * Returns user by verify token.
 *
 * @remarks
 * This method is part of the {@link auth/jwt}.
 *
 * @param token - 1st input
 * @param type - 2nd input
 *
 * @returns The user mean of `token`
 *
 * @beta
 */
export const verifyToken = async (
  token: string,
  type: TokenType
): Promise<User> => {
  // let currentUser

  /*await verify(token, common[type].privateKey, async (err, data) => {
		if (err) {
			/!*throw new AuthenticationError(
				'Authentication token is invalid, please try again.'
			)*!/
		}
		currentUser = await getMongoRepository(User).findOne({
			_id: data._id
		})
	})*/

  /*if (type === 'emailToken') {
		return currentUser
	}
	// console.log(currentUser)
	if (currentUser && !currentUser.isVerified) {
		throw new ForbiddenException('Please verify your email.')
	}*/

  // return currentUser
  return null;
};

/**
 * Returns login response by trade token.
 *
 * @remarks
 * This method is part of the {@link auth/jwt}.
 *
 * @param user - 1st input
 *
 * @returns The login response mean of `user`
 *
 * @beta
 */
export const tradeToken = async (user: User) => {
  /*	if (!user.isVerified) {
			throw new ForbiddenException('Please verify your email.')
		}
		if (!user.isActive) {
			throw new ForbiddenException('User already doesn\'t exist.')
		}
		if (user.isLocked) {
			throw new ForbiddenException('Your email has been locked.')
		}*/

  const accessToken = await generateToken(user, "accessToken");
  const refreshToken = await generateToken(user, "refreshToken");

  return { accessToken, refreshToken };
};
