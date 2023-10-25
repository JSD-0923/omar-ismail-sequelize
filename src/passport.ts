import * as passport from "passport";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import Customer from "./models/customer"; // Import your User model or adjust the import as needed

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "Random Sting",
};

passport.use(
  new Strategy(opts, async (jwt_payload, done) => {
    try {
      const customer = await Customer.findOne({where: { id: jwt_payload.id }});

      if (!customer) {
        return done(null, false);
      }

      return done(null, customer);
    } catch (err) {
      return done(err, false);
    }
  })
);
