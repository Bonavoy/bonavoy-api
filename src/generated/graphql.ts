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

export type AuthorsOnTrips = {
  __typename?: 'AuthorsOnTrips';
  id: Scalars['ID'];
  role: TripRole;
  trip: Trip;
  tripId: Scalars['ID'];
};

export type Coords = {
  __typename?: 'Coords';
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
};

export type CoordsInput = {
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type CreateDayPlanInput = {
  date?: InputMaybe<Scalars['DateTime']>;
  order?: InputMaybe<Scalars['Int']>;
  placeId?: InputMaybe<Scalars['ID']>;
};

export type DayPlan = {
  __typename?: 'DayPlan';
  date?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  order: Scalars['Int'];
  spots?: Maybe<Array<Spot>>;
};

export type ExternalSpot = {
  __typename?: 'ExternalSpot';
  coords?: Maybe<Coords>;
  fsq_id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
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
  createDayPlan?: Maybe<DayPlan>;
  createPlace: Place;
  createTrip: Trip;
  createUser?: Maybe<User>;
  deletePlace: Scalars['ID'];
  deleteSpot?: Maybe<Spot>;
  spot?: Maybe<Spot>;
  token: Scalars['Boolean'];
  updatePlaceDates: PlaceDates;
  updatePlacesOrder: Array<Place>;
  updateTripName: Scalars['String'];
};


export type MutationAuthenticateArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
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
  input?: InputMaybe<UserInput>;
};


export type MutationDeletePlaceArgs = {
  placeId: Scalars['ID'];
};


export type MutationDeleteSpotArgs = {
  spotId?: InputMaybe<Scalars['ID']>;
};


export type MutationSpotArgs = {
  date?: InputMaybe<Scalars['DateTime']>;
  placeId?: InputMaybe<Scalars['ID']>;
  spot?: InputMaybe<SpotInput>;
  tripId?: InputMaybe<Scalars['ID']>;
};


export type MutationUpdatePlaceDatesArgs = {
  endDate: Scalars['DateTime'];
  placeId: Scalars['ID'];
  startDate: Scalars['DateTime'];
};


export type MutationUpdatePlacesOrderArgs = {
  places: Array<PlaceInput>;
  tripId: Scalars['ID'];
};


export type MutationUpdateTripNameArgs = {
  name: Scalars['String'];
  tripId: Scalars['ID'];
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
  getTrip: Trip;
  spotSuggestionPage?: Maybe<SpotSuggestionPage>;
  trips?: Maybe<Array<Maybe<Trip>>>;
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


export type QueryGetTripArgs = {
  tripId: Scalars['ID'];
};


export type QuerySpotSuggestionPageArgs = {
  input?: InputMaybe<SpotSuggestionInputs>;
};

export type Spot = {
  __typename?: 'Spot';
  dayPlanId: Scalars['ID'];
  end?: Maybe<Scalars['DateTime']>;
  fsq_id: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  order: Scalars['Int'];
  start?: Maybe<Scalars['DateTime']>;
};

export type SpotInput = {
  dayPlanId?: InputMaybe<Scalars['ID']>;
  end?: InputMaybe<Scalars['DateTime']>;
  fsq_id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['DateTime']>;
};

export type SpotRecommendationInputs = {
  coords?: InputMaybe<CoordsInput>;
  filter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
};

export type SpotSuggestion = {
  __typename?: 'SpotSuggestion';
  category?: Maybe<Scalars['String']>;
  coords: Coords;
  fsq_id: Scalars['String'];
  name: Scalars['String'];
  prefix?: Maybe<Scalars['String']>;
  suffix?: Maybe<Scalars['String']>;
};

export type SpotSuggestionInputs = {
  coords: CoordsInput;
  cursor?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pageSize: Scalars['Int'];
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
  places?: Maybe<Array<Place>>;
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

export type User = {
  __typename?: 'User';
  authorsOnTrips?: Maybe<Array<Maybe<AuthorsOnTrips>>>;
  avatar?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstname: Scalars['String'];
  id: Scalars['ID'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type UserInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type SpotSuggestionPage = {
  __typename?: 'spotSuggestionPage';
  cursor?: Maybe<Scalars['String']>;
  spotSuggestions?: Maybe<Array<Maybe<SpotSuggestion>>>;
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
  AuthorsOnTrips: ResolverTypeWrapper<AuthorsOnTrips>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Coords: ResolverTypeWrapper<Coords>;
  CoordsInput: CoordsInput;
  CreateDayPlanInput: CreateDayPlanInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DayPlan: ResolverTypeWrapper<DayPlan>;
  ExternalSpot: ResolverTypeWrapper<ExternalSpot>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LocationContext: ResolverTypeWrapper<LocationContext>;
  LocationSuggestion: ResolverTypeWrapper<LocationSuggestion>;
  Mutation: ResolverTypeWrapper<{}>;
  Place: ResolverTypeWrapper<Place>;
  PlaceDates: ResolverTypeWrapper<PlaceDates>;
  PlaceInput: PlaceInput;
  Query: ResolverTypeWrapper<{}>;
  Spot: ResolverTypeWrapper<Spot>;
  SpotInput: SpotInput;
  SpotRecommendationInputs: SpotRecommendationInputs;
  SpotSuggestion: ResolverTypeWrapper<SpotSuggestion>;
  SpotSuggestionInputs: SpotSuggestionInputs;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Trip: ResolverTypeWrapper<Trip>;
  TripInput: TripInput;
  TripRole: TripRole;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
  spotSuggestionPage: ResolverTypeWrapper<SpotSuggestionPage>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthorsOnTrips: AuthorsOnTrips;
  Boolean: Scalars['Boolean'];
  Coords: Coords;
  CoordsInput: CoordsInput;
  CreateDayPlanInput: CreateDayPlanInput;
  DateTime: Scalars['DateTime'];
  DayPlan: DayPlan;
  ExternalSpot: ExternalSpot;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  LocationContext: LocationContext;
  LocationSuggestion: LocationSuggestion;
  Mutation: {};
  Place: Place;
  PlaceDates: PlaceDates;
  PlaceInput: PlaceInput;
  Query: {};
  Spot: Spot;
  SpotInput: SpotInput;
  SpotRecommendationInputs: SpotRecommendationInputs;
  SpotSuggestion: SpotSuggestion;
  SpotSuggestionInputs: SpotSuggestionInputs;
  String: Scalars['String'];
  Subscription: {};
  Trip: Trip;
  TripInput: TripInput;
  User: User;
  UserInput: UserInput;
  spotSuggestionPage: SpotSuggestionPage;
};

export type AuthorsOnTripsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthorsOnTrips'] = ResolversParentTypes['AuthorsOnTrips']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['TripRole'], ParentType, ContextType>;
  trip?: Resolver<ResolversTypes['Trip'], ParentType, ContextType>;
  tripId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CoordsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Coords'] = ResolversParentTypes['Coords']> = {
  lat?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  lng?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DayPlanResolvers<ContextType = any, ParentType extends ResolversParentTypes['DayPlan'] = ResolversParentTypes['DayPlan']> = {
  date?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  spots?: Resolver<Maybe<Array<ResolversTypes['Spot']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExternalSpotResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExternalSpot'] = ResolversParentTypes['ExternalSpot']> = {
  coords?: Resolver<Maybe<ResolversTypes['Coords']>, ParentType, ContextType>;
  fsq_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  createDayPlan?: Resolver<Maybe<ResolversTypes['DayPlan']>, ParentType, ContextType, Partial<MutationCreateDayPlanArgs>>;
  createPlace?: Resolver<ResolversTypes['Place'], ParentType, ContextType, RequireFields<MutationCreatePlaceArgs, 'place' | 'tripId'>>;
  createTrip?: Resolver<ResolversTypes['Trip'], ParentType, ContextType, RequireFields<MutationCreateTripArgs, 'trip'>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationCreateUserArgs>>;
  deletePlace?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeletePlaceArgs, 'placeId'>>;
  deleteSpot?: Resolver<Maybe<ResolversTypes['Spot']>, ParentType, ContextType, Partial<MutationDeleteSpotArgs>>;
  spot?: Resolver<Maybe<ResolversTypes['Spot']>, ParentType, ContextType, Partial<MutationSpotArgs>>;
  token?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  updatePlaceDates?: Resolver<ResolversTypes['PlaceDates'], ParentType, ContextType, RequireFields<MutationUpdatePlaceDatesArgs, 'endDate' | 'placeId' | 'startDate'>>;
  updatePlacesOrder?: Resolver<Array<ResolversTypes['Place']>, ParentType, ContextType, RequireFields<MutationUpdatePlacesOrderArgs, 'places' | 'tripId'>>;
  updateTripName?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationUpdateTripNameArgs, 'name' | 'tripId'>>;
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
  getTrip?: Resolver<ResolversTypes['Trip'], ParentType, ContextType, RequireFields<QueryGetTripArgs, 'tripId'>>;
  spotSuggestionPage?: Resolver<Maybe<ResolversTypes['spotSuggestionPage']>, ParentType, ContextType, Partial<QuerySpotSuggestionPageArgs>>;
  trips?: Resolver<Maybe<Array<Maybe<ResolversTypes['Trip']>>>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type SpotResolvers<ContextType = any, ParentType extends ResolversParentTypes['Spot'] = ResolversParentTypes['Spot']> = {
  dayPlanId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  end?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  fsq_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  start?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpotSuggestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpotSuggestion'] = ResolversParentTypes['SpotSuggestion']> = {
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coords?: Resolver<ResolversTypes['Coords'], ParentType, ContextType>;
  fsq_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  prefix?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  suffix?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
  places?: Resolver<Maybe<Array<ResolversTypes['Place']>>, ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  authorsOnTrips?: Resolver<Maybe<Array<Maybe<ResolversTypes['AuthorsOnTrips']>>>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpotSuggestionPageResolvers<ContextType = any, ParentType extends ResolversParentTypes['spotSuggestionPage'] = ResolversParentTypes['spotSuggestionPage']> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  spotSuggestions?: Resolver<Maybe<Array<Maybe<ResolversTypes['SpotSuggestion']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthorsOnTrips?: AuthorsOnTripsResolvers<ContextType>;
  Coords?: CoordsResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DayPlan?: DayPlanResolvers<ContextType>;
  ExternalSpot?: ExternalSpotResolvers<ContextType>;
  LocationContext?: LocationContextResolvers<ContextType>;
  LocationSuggestion?: LocationSuggestionResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Place?: PlaceResolvers<ContextType>;
  PlaceDates?: PlaceDatesResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Spot?: SpotResolvers<ContextType>;
  SpotSuggestion?: SpotSuggestionResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Trip?: TripResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  spotSuggestionPage?: SpotSuggestionPageResolvers<ContextType>;
};

