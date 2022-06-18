import { createModule } from 'graphql-modules';

//types and resolvers
import DayPlan from './dayPlan.type.graphql';
import DayPlanResolver from './dayPlan.resolver.graphql';

export default createModule({
  id: 'dayPlan',
  dirname: __dirname,
  typeDefs: [DayPlan],
  resolvers: [DayPlanResolver],
});
