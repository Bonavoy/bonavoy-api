// FILE COMBINES ALL DATASOURCES TO ONE OBJ

//external apis
import FoursquareAPI from './api/foursquare';

//mongo models
import userModel from './database/models/user';
import sessionModel from './database/models/session';
import tripModel from './database/models/trip';

//mongo crud
import Users from './database/crud/user';
import Sessions from './database/crud/session';
import Trips from './database/crud/trip';

export default {
  //mongo
  users: new Users(userModel as any),
  sessions: new Sessions(sessionModel as any),
  trips: new Trips(tripModel as any),

  //external
  foursquareAPI: new FoursquareAPI(),
};
