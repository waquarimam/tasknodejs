import Passport from 'passport';
import PassportJWT from 'passport-jwt';
import { getConfig } from '../../config/config';
import Customer from '../resources/customer/customer.model';


const config = getConfig(process.env.NODE_ENV);
export const configJWTStrategy = () => {
  const opts = {
    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret,
  };
  Passport.use(
    new PassportJWT.Strategy(opts, (paylod, done) => {
        Customer.findOne({ _id: paylod.id }, (err, customer) => {
        if (err) {
          return done(err);
        }
        if (customer) {
          return done(null, customer);
        }
        return done(null, false);
      });
    })
  );
};
