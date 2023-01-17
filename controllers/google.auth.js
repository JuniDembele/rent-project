require("dotenv").config();
const { User } = require("../models/user.model");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALL_BACK_URL,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        let existingUser = await User.findOne({ "google.id": profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        console.log("Creating new user...");

        const newUser = new User({
          method: "google",
          google: {
            id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          },
        });
        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

module.exports = {
  getGoogleLogin: [
    passport.authenticate("google", { scope: ["profile", "email"] }),
  ],

  handleGoogleLogin: [
    passport.authenticate("google", { session: false }),
    (req, res) => {
      res.redirect("/profile/");
    },
  ],
};