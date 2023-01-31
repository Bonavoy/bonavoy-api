import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Activity = {
  __typename?: 'Activity';
  dayPlanId: Scalars['ID'];
  end?: Maybe<Scalars['DateTime']>;
  fsq_id: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  order: Scalars['Int'];
  start?: Maybe<Scalars['DateTime']>;
};

export type ActivityInput = {
  dayPlanId: Scalars['ID'];
  end?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
  order: Scalars['Int'];
  start?: InputMaybe<Scalars['DateTime']>;
};

export type AuthorsOnTrips = {
  __typename?: 'AuthorsOnTrips';
  id: Scalars['ID'];
  role: TripRole;
  trip: Trip;
};

export type AuthorsOnTripsConnection = {
  __typename?: 'AuthorsOnTripsConnection';
  edges: Array<AuthorsOnTripsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type AuthorsOnTripsEdge = {
  __typename?: 'AuthorsOnTripsEdge';
  node: AuthorsOnTrips;
};

export type CreateDayPlanInput = {
  date?: InputMaybe<Scalars['DateTime']>;
  order?: InputMaybe<Scalars['Int']>;
  placeId?: InputMaybe<Scalars['ID']>;
};

export type DayPlan = {
  __typename?: 'DayPlan';
  activity: Array<Activity>;
  date?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  order: Scalars['Int'];
};

export type LocationContext = {
  __typename?: 'LocationContext';
  id: Scalars['String'];
  short_code?: Maybe<Scalars['String']>;
  text: Scalars['String'];
  wikidata?: Maybe<Scalars['String']>;
};

export type LocationSuggestion = {
  __typename?: 'LocationSuggestion';
  center: Array<Maybe<Scalars['Float']>>;
  context: Array<Maybe<LocationContext>>;
  id: Scalars['ID'];
  place_name: Scalars['String'];
  text: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  authenticate: Scalars['Boolean'];
  createActivity: Activity;
  createDayPlan?: Maybe<DayPlan>;
  createPlace: Place;
  createTrip: Trip;
  createUser: User;
  deleteActivity: Activity;
  deletePlace: Scalars['ID'];
  deleteTrip: Scalars['Boolean'];
  token: Scalars['Boolean'];
  updateActivity: Activity;
  updatePlaceDates: PlaceDates;
  updateTrip: Trip;
};


export type MutationAuthenticateArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreateActivityArgs = {
  activity: ActivityInput;
};


export type MutationCreateDayPlanArgs = {
  dayPlan?: InputMaybe<CreateDayPlanInput>;
};


export type MutationCreatePlaceArgs = {
  place: PlaceInput;
  tripId: Scalars['ID'];
};


export type MutationCreateTripArgs = {
  trip: TripInput;
};


export type MutationCreateUserArgs = {
  userInput: UserInput;
};


export type MutationDeleteActivityArgs = {
  id: Scalars['ID'];
};


export type MutationDeletePlaceArgs = {
  placeId: Scalars['ID'];
};


export type MutationDeleteTripArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateActivityArgs = {
  id: Scalars['ID'];
};


export type MutationUpdatePlaceDatesArgs = {
  endDate: Scalars['DateTime'];
  placeId: Scalars['ID'];
  startDate: Scalars['DateTime'];
};


export type MutationUpdateTripArgs = {
  updateTripInput: UpdateTripInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['ID'];
  hasNextPage: Scalars['Boolean'];
};

export type Place = {
  __typename?: 'Place';
  center: Array<Maybe<Scalars['Float']>>;
  colour: Scalars['String'];
  country: Scalars['String'];
  dayPlans?: Maybe<Array<DayPlan>>;
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  mapbox_id: Scalars['String'];
  place_name: Scalars['String'];
  startDate?: Maybe<Scalars['DateTime']>;
  text: Scalars['String'];
};


export type PlaceDayPlansArgs = {
  date?: InputMaybe<Scalars['DateTime']>;
};

export type PlaceDates = {
  __typename?: 'PlaceDates';
  endDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
};

export type PlaceInput = {
  center: Array<InputMaybe<Scalars['Float']>>;
  colour: Scalars['String'];
  country: Scalars['String'];
  endDate?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['ID']>;
  mapbox_id: Scalars['String'];
  place_name: Scalars['String'];
  startDate?: InputMaybe<Scalars['DateTime']>;
  text: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  findPlacesByTrip?: Maybe<Array<Maybe<Place>>>;
  getDayPlanByDate?: Maybe<DayPlan>;
  getLocationSuggestions: Array<LocationSuggestion>;
  getPlaceByDate?: Maybe<Place>;
  trip: Trip;
  trips: Array<Trip>;
  user: User;
};


export type QueryFindPlacesByTripArgs = {
  tripId?: InputMaybe<Scalars['ID']>;
};


export type QueryGetDayPlanByDateArgs = {
  date?: InputMaybe<Scalars['DateTime']>;
  tripId?: InputMaybe<Scalars['ID']>;
};


export type QueryGetLocationSuggestionsArgs = {
  country: Array<InputMaybe<Scalars['String']>>;
  proximity: Array<InputMaybe<Scalars['String']>>;
  query: Scalars['String'];
  types: Array<InputMaybe<Scalars['String']>>;
};


export type QueryGetPlaceByDateArgs = {
  date?: InputMaybe<Scalars['DateTime']>;
  tripId?: InputMaybe<Scalars['ID']>;
};


export type QueryTripArgs = {
  tripId: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']>;
};

export type Trip = {
  __typename?: 'Trip';
  authors: Array<AuthorsOnTrips>;
  banner: Scalars['String'];
  endDate: Scalars['DateTime'];
  id: Scalars['ID'];
  isPublic: Scalars['Boolean'];
  name: Scalars['String'];
  places: Array<Place>;
  startDate: Scalars['DateTime'];
};

export type TripInput = {
  endDate: Scalars['DateTime'];
  isPublic: Scalars['Boolean'];
  name: Scalars['String'];
  places: Array<PlaceInput>;
  startDate: Scalars['DateTime'];
};

export enum TripRole {
  Author = 'AUTHOR',
  Editor = 'EDITOR',
  Viewer = 'VIEWER'
}

export type UpdateTripInput = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  isPublic?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type User = {
  __typename?: 'User';
  authorsOnTrips: AuthorsOnTripsConnection;
  avatar?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstname: Scalars['String'];
  id: Scalars['ID'];
  lastname: Scalars['String'];
  username: Scalars['String'];
  verified: Scalars['Boolean'];
};


export type UserAuthorsOnTripsArgs = {
  after?: InputMaybe<Scalars['ID']>;
  limit: Scalars['Int'];
};

export type UserInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Activity: ResolverTypeWrapper<Activity>;
  ActivityInput: ActivityInput;
  AuthorsOnTrips: ResolverTypeWrapper<AuthorsOnTrips>;
  AuthorsOnTripsConnection: ResolverTypeWrapper<AuthorsOnTripsConnection>;
  AuthorsOnTripsEdge: ResolverTypeWrapper<AuthorsOnTripsEdge>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateDayPlanInput: CreateDayPlanInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DayPlan: ResolverTypeWrapper<DayPlan>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LocationContext: ResolverTypeWrapper<LocationContext>;
  LocationSuggestion: ResolverTypeWrapper<LocationSuggestion>;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Place: ResolverTypeWrapper<Place>;
  PlaceDates: ResolverTypeWrapper<PlaceDates>;
  PlaceInput: PlaceInput;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Trip: ResolverTypeWrapper<Trip>;
  TripInput: TripInput;
  TripRole: TripRole;
  UpdateTripInput: UpdateTripInput;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Activity: Activity;
  ActivityInput: ActivityInput;
  AuthorsOnTrips: AuthorsOnTrips;
  AuthorsOnTripsConnection: AuthorsOnTripsConnection;
  AuthorsOnTripsEdge: AuthorsOnTripsEdge;
  Boolean: Scalars['Boolean'];
  CreateDayPlanInput: CreateDayPlanInput;
  DateTime: Scalars['DateTime'];
  DayPlan: DayPlan;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  LocationContext: LocationContext;
  LocationSuggestion: LocationSuggestion;
  Mutation: {};
  PageInfo: PageInfo;
  Place: Place;
  PlaceDates: PlaceDates;
  PlaceInput: PlaceInput;
  Query: {};
  String: Scalars['String'];
  Subscription: {};
  Trip: Trip;
  TripInput: TripInput;
  UpdateTripInput: UpdateTripInput;
  User: User;
  UserInput: UserInput;
};

export type ActivityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Activity'] = ResolversParentTypes['Activity']> = {
  dayPlanId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  end?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  fsq_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  start?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthorsOnTripsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthorsOnTrips'] = ResolversParentTypes['AuthorsOnTrips']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['TripRole'], ParentType, ContextType>;
  trip?: Resolver<ResolversTypes['Trip'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthorsOnTripsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthorsOnTripsConnection'] = ResolversParentTypes['AuthorsOnTripsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['AuthorsOnTripsEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthorsOnTripsEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthorsOnTripsEdge'] = ResolversParentTypes['AuthorsOnTripsEdge']> = {
  node?: Resolver<ResolversTypes['AuthorsOnTrips'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DayPlanResolvers<ContextType = any, ParentType extends ResolversParentTypes['DayPlan'] = ResolversParentTypes['DayPlan']> = {
  activity?: Resolver<Array<ResolversTypes['Activity']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationContextResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocationContext'] = ResolversParentTypes['LocationContext']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  short_code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wikidata?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationSuggestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocationSuggestion'] = ResolversParentTypes['LocationSuggestion']> = {
  center?: Resolver<Array<Maybe<ResolversTypes['Float']>>, ParentType, ContextType>;
  context?: Resolver<Array<Maybe<ResolversTypes['LocationContext']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  place_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  authenticate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAuthenticateArgs, 'password' | 'username'>>;
  createActivity?: Resolver<ResolversTypes['Activity'], ParentType, ContextType, RequireFields<MutationCreateActivityArgs, 'activity'>>;
  createDayPlan?: Resolver<Maybe<ResolversTypes['DayPlan']>, ParentType, ContextType, Partial<MutationCreateDayPlanArgs>>;
  createPlace?: Resolver<ResolversTypes['Place'], ParentType, ContextType, RequireFields<MutationCreatePlaceArgs, 'place' | 'tripId'>>;
  createTrip?: Resolver<ResolversTypes['Trip'], ParentType, ContextType, RequireFields<MutationCreateTripArgs, 'trip'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'userInput'>>;
  deleteActivity?: Resolver<ResolversTypes['Activity'], ParentType, ContextType, RequireFields<MutationDeleteActivityArgs, 'id'>>;
  deletePlace?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeletePlaceArgs, 'placeId'>>;
  deleteTrip?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteTripArgs, 'id'>>;
  token?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  updateActivity?: Resolver<ResolversTypes['Activity'], ParentType, ContextType, RequireFields<MutationUpdateActivityArgs, 'id'>>;
  updatePlaceDates?: Resolver<ResolversTypes['PlaceDates'], ParentType, ContextType, RequireFields<MutationUpdatePlaceDatesArgs, 'endDate' | 'placeId' | 'startDate'>>;
  updateTrip?: Resolver<ResolversTypes['Trip'], ParentType, ContextType, RequireFields<MutationUpdateTripArgs, 'updateTripInput'>>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Place'] = ResolversParentTypes['Place']> = {
  center?: Resolver<Array<Maybe<ResolversTypes['Float']>>, ParentType, ContextType>;
  colour?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dayPlans?: Resolver<Maybe<Array<ResolversTypes['DayPlan']>>, ParentType, ContextType, Partial<PlaceDayPlansArgs>>;
  endDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  mapbox_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  place_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlaceDatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlaceDates'] = ResolversParentTypes['PlaceDates']> = {
  endDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  findPlacesByTrip?: Resolver<Maybe<Array<Maybe<ResolversTypes['Place']>>>, ParentType, ContextType, Partial<QueryFindPlacesByTripArgs>>;
  getDayPlanByDate?: Resolver<Maybe<ResolversTypes['DayPlan']>, ParentType, ContextType, Partial<QueryGetDayPlanByDateArgs>>;
  getLocationSuggestions?: Resolver<Array<ResolversTypes['LocationSuggestion']>, ParentType, ContextType, RequireFields<QueryGetLocationSuggestionsArgs, 'country' | 'proximity' | 'query' | 'types'>>;
  getPlaceByDate?: Resolver<Maybe<ResolversTypes['Place']>, ParentType, ContextType, Partial<QueryGetPlaceByDateArgs>>;
  trip?: Resolver<ResolversTypes['Trip'], ParentType, ContextType, RequireFields<QueryTripArgs, 'tripId'>>;
  trips?: Resolver<Array<ResolversTypes['Trip']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  _empty?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "_empty", ParentType, ContextType>;
};

export type TripResolvers<ContextType = any, ParentType extends ResolversParentTypes['Trip'] = ResolversParentTypes['Trip']> = {
  authors?: Resolver<Array<ResolversTypes['AuthorsOnTrips']>, ParentType, ContextType>;
  banner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isPublic?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  places?: Resolver<Array<ResolversTypes['Place']>, ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  authorsOnTrips?: Resolver<ResolversTypes['AuthorsOnTripsConnection'], ParentType, ContextType, RequireFields<UserAuthorsOnTripsArgs, 'limit'>>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Activity?: ActivityResolvers<ContextType>;
  AuthorsOnTrips?: AuthorsOnTripsResolvers<ContextType>;
  AuthorsOnTripsConnection?: AuthorsOnTripsConnectionResolvers<ContextType>;
  AuthorsOnTripsEdge?: AuthorsOnTripsEdgeResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DayPlan?: DayPlanResolvers<ContextType>;
  LocationContext?: LocationContextResolvers<ContextType>;
  LocationSuggestion?: LocationSuggestionResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Place?: PlaceResolvers<ContextType>;
  PlaceDates?: PlaceDatesResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Trip?: TripResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

