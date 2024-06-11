const router = require("express").Router();
const { book } = require("../../models");
const passport = require("passport");
require("dotenv").config();

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (_, _, profile, done) {
      const user = {
        email: profile.emails[0].value,
        name: profile.displayName,
      };
      return done(null, user);
    }
  )
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/tset",
    assignProperty: "user",
  }),
  async (req, res) => {
    const { email, name } = req.user;

    const user = await book.findOne({ where: { email: email } });

    if (user === null) {
      const data = await book.create({
        email: email,
        name: name,
        password: require("crypto")
          .randomBytes(10)
          .toString("base64")
          .slice(0, 10),
      });

      res.cookie("uuid", data.dataValues.uuid, {
        maxAge: 3600000,
      });
    } else {
      res.cookie("uuid", user.uuid, {
        maxAge: 3600000,
      });
    }

    res.redirect("http://localhost:5173/");
  }
);

module.exports = router;
