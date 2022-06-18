import { MongoDataSource } from 'apollo-datasource-mongodb';

import { MongoSession } from '../models/session';
import dayPlan from '../models/dayPlan';

export default class DayPlan extends MongoDataSource<MongoSession> {
  async getDayPlan(dayPlanId: string) {
    return await dayPlan.findById(dayPlanId).populate('spotsOfInterest');
  }
}
