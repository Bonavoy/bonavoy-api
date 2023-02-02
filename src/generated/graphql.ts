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
  end?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  order: Scalars['Int'];
  start?: Maybe<Scalars['DateTime']>;
};

export type ActivityInput = {
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
  user: User;
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
  order: Scalars['Int'];
};

export type DayPlan = {
  __typename?: 'DayPlan';
  activities: Array<Activity>;
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
  createDayPlan: DayPlan;
  createPlace: Place;
  createTrip: Trip;
  createUser: User;
  deleteActivity: Scalars['ID'];
  deleteDayPlan: Scalars['ID'];
  deletePlace: Scalars['ID'];
  deleteTrip: Scalars['Boolean'];
  token: Scalars['Boolean'];
  updateActivity: Activity;
  updateDayPlan: DayPlan;
  updatePlace: Place;
  updateTrip: Trip;
};


export type MutationAuthenticateArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreateActivityArgs = {
  activity: ActivityInput;
  dayPlanId: Scalars['ID'];
};


export type MutationCreateDayPlanArgs = {
  dayPlan: CreateDayPlanInput;
  placeId: Scalars['ID'];
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


export type MutationDeleteDayPlanArgs = {
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


export type MutationUpdateDayPlanArgs = {
  id: Scalars['ID'];
  updateDayPlan: UpdateDayPlanInput;
};


export type MutationUpdatePlaceArgs = {
  place: UpdatePlaceInput;
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
  center: Array<Scalars['Float']>;
  colour: Scalars['String'];
  country: Scalars['String'];
  dayPlans: Array<DayPlan>;
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  mapbox_id: Scalars['String'];
  place_name: Scalars['String'];
  startDate?: Maybe<Scalars['DateTime']>;
  text: Scalars['String'];
};

export type PlaceDates = {
  __typename?: 'PlaceDates';
  endDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
};

export type PlaceInput = {
  center: Array<Scalars['Float']>;
  colour: Scalars['String'];
  country: Scalars['String'];
  endDate?: InputMaybe<Scalars['DateTime']>;
  mapbox_id: Scalars['String'];
  place_name: Scalars['String'];
  startDate?: InputMaybe<Scalars['DateTime']>;
  text: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  dayPlan: DayPlan;
  dayPlans: Array<DayPlan>;
  getLocationSuggestions: Array<LocationSuggestion>;
  place: Place;
  places: Array<Place>;
  trip: Trip;
  trips: TripConnection;
  user: User;
};


export type QueryDayPlanArgs = {
  id: Scalars['ID'];
};


export type QueryDayPlansArgs = {
  placeId: Scalars['ID'];
};


export type QueryGetLocationSuggestionsArgs = {
  country: Array<InputMaybe<Scalars['String']>>;
  proximity: Array<InputMaybe<Scalars['String']>>;
  query: Scalars['String'];
  types: Array<InputMaybe<Scalars['String']>>;
};


export type QueryPlaceArgs = {
  id: Scalars['ID'];
};


export type QueryPlacesArgs = {
  tripId: Scalars['ID'];
};


export type QueryTripArgs = {
  tripId: Scalars['ID'];
};


export type QueryTripsArgs = {
  after?: InputMaybe<Scalars['ID']>;
  limit: Scalars['Int'];
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

export type TripConnection = {
  __typename?: 'TripConnection';
  edges: Array<TripEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type TripEdge = {
  __typename?: 'TripEdge';
  node: Trip;
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

export type UpdateDayPlanInput = {
  date?: InputMaybe<Scalars['DateTime']>;
  order?: InputMaybe<Scalars['Int']>;
};

export type UpdatePlaceInput = {
  center?: InputMaybe<Array<Scalars['Float']>>;
  colour?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  mapbox_id?: InputMaybe<Scalars['String']>;
  place_name?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  text?: InputMaybe<Scalars['String']>;
};

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
  TripConnection: ResolverTypeWrapper<TripConnection>;
  TripEdge: ResolverTypeWrapper<TripEdge>;
  TripInput: TripInput;
  TripRole: TripRole;
  UpdateDayPlanInput: UpdateDayPlanInput;
  UpdatePlaceInput: UpdatePlaceInput;
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
  TripConnection: TripConnection;
  TripEdge: TripEdge;
  TripInput: TripInput;
  UpdateDayPlanInput: UpdateDayPlanInput;
  UpdatePlaceInput: UpdatePlaceInput;
  UpdateTripInput: UpdateTripInput;
  User: User;
  UserInput: UserInput;
};

export type ActivityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Activity'] = ResolversParentTypes['Activity']> = {
  end?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
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
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
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
  activities?: Resolver<Array<ResolversTypes['Activity']>, ParentType, ContextType>;
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
  createActivity?: Resolver<ResolversTypes['Activity'], ParentType, ContextType, RequireFields<MutationCreateActivityArgs, 'activity' | 'dayPlanId'>>;
  createDayPlan?: Resolver<ResolversTypes['DayPlan'], ParentType, ContextType, RequireFields<MutationCreateDayPlanArgs, 'dayPlan' | 'placeId'>>;
  createPlace?: Resolver<ResolversTypes['Place'], ParentType, ContextType, RequireFields<MutationCreatePlaceArgs, 'place' | 'tripId'>>;
  createTrip?: Resolver<ResolversTypes['Trip'], ParentType, ContextType, RequireFields<MutationCreateTripArgs, 'trip'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'userInput'>>;
  deleteActivity?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteActivityArgs, 'id'>>;
  deleteDayPlan?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteDayPlanArgs, 'id'>>;
  deletePlace?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeletePlaceArgs, 'placeId'>>;
  deleteTrip?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteTripArgs, 'id'>>;
  token?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  updateActivity?: Resolver<ResolversTypes['Activity'], ParentType, ContextType, RequireFields<MutationUpdateActivityArgs, 'id'>>;
  updateDayPlan?: Resolver<ResolversTypes['DayPlan'], ParentType, ContextType, RequireFields<MutationUpdateDayPlanArgs, 'id' | 'updateDayPlan'>>;
  updatePlace?: Resolver<ResolversTypes['Place'], ParentType, ContextType, RequireFields<MutationUpdatePlaceArgs, 'place'>>;
  updateTrip?: Resolver<ResolversTypes['Trip'], ParentType, ContextType, RequireFields<MutationUpdateTripArgs, 'updateTripInput'>>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Place'] = ResolversParentTypes['Place']> = {
  center?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  colour?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dayPlans?: Resolver<Array<ResolversTypes['DayPlan']>, ParentType, ContextType>;
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
  dayPlan?: Resolver<ResolversTypes['DayPlan'], ParentType, ContextType, RequireFields<QueryDayPlanArgs, 'id'>>;
  dayPlans?: Resolver<Array<ResolversTypes['DayPlan']>, ParentType, ContextType, RequireFields<QueryDayPlansArgs, 'placeId'>>;
  getLocationSuggestions?: Resolver<Array<ResolversTypes['LocationSuggestion']>, ParentType, ContextType, RequireFields<QueryGetLocationSuggestionsArgs, 'country' | 'proximity' | 'query' | 'types'>>;
  place?: Resolver<ResolversTypes['Place'], ParentType, ContextType, RequireFields<QueryPlaceArgs, 'id'>>;
  places?: Resolver<Array<ResolversTypes['Place']>, ParentType, ContextType, RequireFields<QueryPlacesArgs, 'tripId'>>;
  trip?: Resolver<ResolversTypes['Trip'], ParentType, ContextType, RequireFields<QueryTripArgs, 'tripId'>>;
  trips?: Resolver<ResolversTypes['TripConnection'], ParentType, ContextType, RequireFields<QueryTripsArgs, 'limit'>>;
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

export type TripConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TripConnection'] = ResolversParentTypes['TripConnection']> = {
  edges?: Resolver<Array<ResolversTypes['TripEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TripEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TripEdge'] = ResolversParentTypes['TripEdge']> = {
  node?: Resolver<ResolversTypes['Trip'], ParentType, ContextType>;
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
  TripConnection?: TripConnectionResolvers<ContextType>;
  TripEdge?: TripEdgeResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

