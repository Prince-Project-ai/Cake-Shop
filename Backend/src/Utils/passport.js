import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { User } from "../Models/User.model.js";

dotenv.config();

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:6633/api/client/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const { sub, name, email, picture } = profile._json;

      let user = await User.findOne({ googleId: sub });

      if (!user) {
        user = await User.create({
          googleId: sub,
          fullName: name,
          email,
          phoneNumber: "000-000-0000", // or leave empty/null
          authProvider: "google",
          avatar: picture,
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// ✅ Optional: If you're not using sessions, these are not required:
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
