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

export type ActiveElement = {
  __typename?: 'ActiveElement';
  active: Scalars['Boolean'];
  author: AuthorPresent;
  elementId: Scalars['ID'];
  tripId: Scalars['ID'];
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

export type AuthorPresent = {
  __typename?: 'AuthorPresent';
  avatar: Scalars['String'];
  connected: Scalars['Boolean'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  id: Scalars['ID'];
  lastname: Scalars['String'];
  username: Scalars['String'];
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

export type Coords = {
  __typename?: 'Coords';
  lat: Scalars['Float'];
  lng: Scalars['Float'];
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

export type InputCoords = {
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type Invite = AuthorsOnTrips | PendingInvite;

export type InviteInput = {
  email: Scalars['String'];
  role: TripRole;
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
  center: Coords;
  name: Scalars['String'];
  text: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  addTransportation: Transportation;
  authenticate: Scalars['Boolean'];
  createActivity: Activity;
  createDayPlan: DayPlan;
  createPlace: Place;
  createTrip: Trip;
  createUser: User;
  deleteActivity: Scalars['ID'];
  deleteDayPlan: Scalars['ID'];
  deleteInvite: Scalars['ID'];
  deletePlace: Scalars['ID'];
  deleteTransportation: Scalars['ID'];
  deleteTrip: Scalars['Boolean'];
  removeAuthorOnTrip: Scalars['ID'];
  sendInvite: Invite;
  token: Scalars['Boolean'];
  updateActiveElement: ActiveElement;
  updateActivity: Activity;
  updateAuthorOnTripRole: AuthorsOnTrips;
  updateDayPlan: DayPlan;
  updateInviteRole: PendingInvite;
  updatePlace: Place;
  updateTransportation: Transportation;
  updateTrip: Trip;
};


export type MutationAddTransportationArgs = {
  placeId: Scalars['ID'];
  transportation: TransportationInput;
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


export type MutationDeleteInviteArgs = {
  id: Scalars['ID'];
};


export type MutationDeletePlaceArgs = {
  placeId: Scalars['ID'];
};


export type MutationDeleteTransportationArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTripArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveAuthorOnTripArgs = {
  id: Scalars['ID'];
};


export type MutationSendInviteArgs = {
  invitee: InviteInput;
  tripId: Scalars['ID'];
};


export type MutationUpdateActiveElementArgs = {
  activeElement: UpdateActiveElement;
  tripId: Scalars['ID'];
};


export type MutationUpdateActivityArgs = {
  id: Scalars['ID'];
  updateActivityInput: UpdateActivityInput;
};


export type MutationUpdateAuthorOnTripRoleArgs = {
  id: Scalars['ID'];
  role: TripRole;
};


export type MutationUpdateDayPlanArgs = {
  id: Scalars['ID'];
  updateDayPlan: UpdateDayPlanInput;
};


export type MutationUpdateInviteRoleArgs = {
  id: Scalars['ID'];
  role: TripRole;
};


export type MutationUpdatePlaceArgs = {
  id: Scalars['ID'];
  place: UpdatePlaceInput;
};


export type MutationUpdateTransportationArgs = {
  id: Scalars['ID'];
  transportation: UpdateTransportationInput;
};


export type MutationUpdateTripArgs = {
  updateTripInput: UpdateTripInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['ID'];
  hasNextPage: Scalars['Boolean'];
};

export type PendingInvite = {
  __typename?: 'PendingInvite';
  email: Scalars['String'];
  id: Scalars['ID'];
  role: TripRole;
};

export type Place = {
  __typename?: 'Place';
  center: Array<Scalars['Float']>;
  colour: Scalars['String'];
  country: Scalars['String'];
  dayPlans: Array<DayPlan>;
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  mapboxId: Scalars['String'];
  placeName: Scalars['String'];
  startDate?: Maybe<Scalars['DateTime']>;
  text: Scalars['String'];
  transportation: Array<Array<Transportation>>;
};

export type PlaceInput = {
  center: Array<Scalars['Float']>;
  colour: Scalars['String'];
  country: Scalars['String'];
  endDate?: InputMaybe<Scalars['DateTime']>;
  mapboxId: Scalars['String'];
  placeName: Scalars['String'];
  startDate?: InputMaybe<Scalars['DateTime']>;
  text: Scalars['String'];
};

export type PlannerDetails = {
  __typename?: 'PlannerDetails';
  banner: Scalars['String'];
  endDate: Scalars['DateTime'];
  name: Scalars['String'];
  places: Array<Place>;
  startDate: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  activeElements: Array<ActiveElement>;
  authorsOnTrips: Array<AuthorsOnTrips>;
  authorsPresent: Array<AuthorPresent>;
  dayPlan: DayPlan;
  dayPlans: Array<DayPlan>;
  getLocationSuggestions: Array<LocationSuggestion>;
  invites: Array<PendingInvite>;
  place: Place;
  places: Array<Place>;
  plannerDetails: PlannerDetails;
  routeLegs: Array<RouteLeg>;
  transportation: Array<Array<Transportation>>;
  trip: Trip;
  trips: TripConnection;
  user: User;
};


export type QueryActiveElementsArgs = {
  tripId: Scalars['ID'];
};


export type QueryAuthorsOnTripsArgs = {
  tripId: Scalars['ID'];
};


export type QueryAuthorsPresentArgs = {
  tripId: Scalars['ID'];
};


export type QueryDayPlanArgs = {
  id: Scalars['ID'];
};


export type QueryDayPlansArgs = {
  placeId: Scalars['ID'];
};


export type QueryGetLocationSuggestionsArgs = {
  query: Scalars['String'];
};


export type QueryInvitesArgs = {
  tripId: Scalars['ID'];
};


export type QueryPlaceArgs = {
  placeId: Scalars['ID'];
};


export type QueryPlacesArgs = {
  tripId: Scalars['ID'];
};


export type QueryPlannerDetailsArgs = {
  tripId: Scalars['ID'];
};


export type QueryRouteLegsArgs = {
  routeWaypoints: Array<Array<InputCoords>>;
};


export type QueryTransportationArgs = {
  placeId: Scalars['ID'];
};


export type QueryTripArgs = {
  tripId: Scalars['ID'];
};


export type QueryTripsArgs = {
  after?: InputMaybe<Scalars['ID']>;
  limit: Scalars['Int'];
};

export type RouteLeg = {
  __typename?: 'RouteLeg';
  duration: Scalars['Float'];
  segments: Array<Array<Scalars['Float']>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']>;
  listenActiveElement: ActiveElement;
  listenAuthorPresent: AuthorPresent;
  transportation: TransportationNotification;
};


export type SubscriptionListenActiveElementArgs = {
  tripId: Scalars['ID'];
};


export type SubscriptionListenAuthorPresentArgs = {
  tripId: Scalars['ID'];
};


export type SubscriptionTransportationArgs = {
  placeIds: Array<Scalars['ID']>;
};

export type Transportation = {
  __typename?: 'Transportation';
  arrivalCoords?: Maybe<Coords>;
  arrivalLocation: Scalars['String'];
  arrivalTime?: Maybe<Scalars['DateTime']>;
  connectingId: Scalars['ID'];
  connectingOrder: Scalars['Int'];
  departureCoords?: Maybe<Coords>;
  departureLocation: Scalars['String'];
  departureTime?: Maybe<Scalars['DateTime']>;
  details: Scalars['String'];
  id: Scalars['ID'];
  order: Scalars['Int'];
  route?: Maybe<RouteLeg>;
  type: TransportationType;
};

export type TransportationInput = {
  arrivalCoords?: InputMaybe<InputCoords>;
  arrivalLocation: Scalars['String'];
  arrivalTime?: InputMaybe<Scalars['DateTime']>;
  connectingId: Scalars['String'];
  departureCoords?: InputMaybe<InputCoords>;
  departureLocation: Scalars['String'];
  departureTime?: InputMaybe<Scalars['DateTime']>;
  details: Scalars['String'];
  id: Scalars['ID'];
  order: Scalars['Int'];
  type: TransportationType;
};

export type TransportationNotification = {
  __typename?: 'TransportationNotification';
  deleted: Scalars['Boolean'];
  placeId?: Maybe<Scalars['ID']>;
  transportation: Transportation;
};

export enum TransportationType {
  Bus = 'BUS',
  Car = 'CAR',
  Plane = 'PLANE'
}

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

export type UpdateActiveElement = {
  active: Scalars['Boolean'];
  elementId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type UpdateActivityInput = {
  end?: InputMaybe<Scalars['DateTime']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['DateTime']>;
};

export type UpdateDayPlanInput = {
  date?: InputMaybe<Scalars['DateTime']>;
  order?: InputMaybe<Scalars['Int']>;
};

export type UpdatePlaceInput = {
  center?: InputMaybe<Array<Scalars['Float']>>;
  colour?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  mapboxId?: InputMaybe<Scalars['String']>;
  placeName?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  text?: InputMaybe<Scalars['String']>;
};

export type UpdateTransportationInput = {
  arrivalCoords?: InputMaybe<InputCoords>;
  arrivalLocation?: InputMaybe<Scalars['String']>;
  arrivalTime?: InputMaybe<Scalars['DateTime']>;
  departureCoords?: InputMaybe<InputCoords>;
  departureLocation?: InputMaybe<Scalars['String']>;
  departureTime?: InputMaybe<Scalars['DateTime']>;
  details?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TransportationType>;
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
  ActiveElement: ResolverTypeWrapper<ActiveElement>;
  Activity: ResolverTypeWrapper<Activity>;
  ActivityInput: ActivityInput;
  AuthorPresent: ResolverTypeWrapper<AuthorPresent>;
  AuthorsOnTrips: ResolverTypeWrapper<AuthorsOnTrips>;
  AuthorsOnTripsConnection: ResolverTypeWrapper<AuthorsOnTripsConnection>;
  AuthorsOnTripsEdge: ResolverTypeWrapper<AuthorsOnTripsEdge>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Coords: ResolverTypeWrapper<Coords>;
  CreateDayPlanInput: CreateDayPlanInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DayPlan: ResolverTypeWrapper<DayPlan>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  InputCoords: InputCoords;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Invite: ResolversTypes['AuthorsOnTrips'] | ResolversTypes['PendingInvite'];
  InviteInput: InviteInput;
  LocationContext: ResolverTypeWrapper<LocationContext>;
  LocationSuggestion: ResolverTypeWrapper<LocationSuggestion>;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PendingInvite: ResolverTypeWrapper<PendingInvite>;
  Place: ResolverTypeWrapper<Place>;
  PlaceInput: PlaceInput;
  PlannerDetails: ResolverTypeWrapper<PlannerDetails>;
  Query: ResolverTypeWrapper<{}>;
  RouteLeg: ResolverTypeWrapper<RouteLeg>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Transportation: ResolverTypeWrapper<Transportation>;
  TransportationInput: TransportationInput;
  TransportationNotification: ResolverTypeWrapper<TransportationNotification>;
  TransportationType: TransportationType;
  Trip: ResolverTypeWrapper<Trip>;
  TripConnection: ResolverTypeWrapper<TripConnection>;
  TripEdge: ResolverTypeWrapper<TripEdge>;
  TripInput: TripInput;
  TripRole: TripRole;
  UpdateActiveElement: UpdateActiveElement;
  UpdateActivityInput: UpdateActivityInput;
  UpdateDayPlanInput: UpdateDayPlanInput;
  UpdatePlaceInput: UpdatePlaceInput;
  UpdateTransportationInput: UpdateTransportationInput;
  UpdateTripInput: UpdateTripInput;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  ActiveElement: ActiveElement;
  Activity: Activity;
  ActivityInput: ActivityInput;
  AuthorPresent: AuthorPresent;
  AuthorsOnTrips: AuthorsOnTrips;
  AuthorsOnTripsConnection: AuthorsOnTripsConnection;
  AuthorsOnTripsEdge: AuthorsOnTripsEdge;
  Boolean: Scalars['Boolean'];
  Coords: Coords;
  CreateDayPlanInput: CreateDayPlanInput;
  DateTime: Scalars['DateTime'];
  DayPlan: DayPlan;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  InputCoords: InputCoords;
  Int: Scalars['Int'];
  Invite: ResolversParentTypes['AuthorsOnTrips'] | ResolversParentTypes['PendingInvite'];
  InviteInput: InviteInput;
  LocationContext: LocationContext;
  LocationSuggestion: LocationSuggestion;
  Mutation: {};
  PageInfo: PageInfo;
  PendingInvite: PendingInvite;
  Place: Place;
  PlaceInput: PlaceInput;
  PlannerDetails: PlannerDetails;
  Query: {};
  RouteLeg: RouteLeg;
  String: Scalars['String'];
  Subscription: {};
  Transportation: Transportation;
  TransportationInput: TransportationInput;
  TransportationNotification: TransportationNotification;
  Trip: Trip;
  TripConnection: TripConnection;
  TripEdge: TripEdge;
  TripInput: TripInput;
  UpdateActiveElement: UpdateActiveElement;
  UpdateActivityInput: UpdateActivityInput;
  UpdateDayPlanInput: UpdateDayPlanInput;
  UpdatePlaceInput: UpdatePlaceInput;
  UpdateTransportationInput: UpdateTransportationInput;
  UpdateTripInput: UpdateTripInput;
  User: User;
  UserInput: UserInput;
};

export type ActiveElementResolvers<ContextType = any, ParentType extends ResolversParentTypes['ActiveElement'] = ResolversParentTypes['ActiveElement']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['AuthorPresent'], ParentType, ContextType>;
  elementId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tripId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Activity'] = ResolversParentTypes['Activity']> = {
  end?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  start?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthorPresentResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthorPresent'] = ResolversParentTypes['AuthorPresent']> = {
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  connected?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export type CoordsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Coords'] = ResolversParentTypes['Coords']> = {
  lat?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  lng?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
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

export type InviteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Invite'] = ResolversParentTypes['Invite']> = {
  __resolveType: TypeResolveFn<'AuthorsOnTrips' | 'PendingInvite', ParentType, ContextType>;
};

export type LocationContextResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocationContext'] = ResolversParentTypes['LocationContext']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  short_code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wikidata?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationSuggestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocationSuggestion'] = ResolversParentTypes['LocationSuggestion']> = {
  center?: Resolver<ResolversTypes['Coords'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  addTransportation?: Resolver<ResolversTypes['Transportation'], ParentType, ContextType, RequireFields<MutationAddTransportationArgs, 'placeId' | 'transportation'>>;
  authenticate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAuthenticateArgs, 'password' | 'username'>>;
  createActivity?: Resolver<ResolversTypes['Activity'], ParentType, ContextType, RequireFields<MutationCreateActivityArgs, 'activity' | 'dayPlanId'>>;
  createDayPlan?: Resolver<ResolversTypes['DayPlan'], ParentType, ContextType, RequireFields<MutationCreateDayPlanArgs, 'dayPlan' | 'placeId'>>;
  createPlace?: Resolver<ResolversTypes['Place'], ParentType, ContextType, RequireFields<MutationCreatePlaceArgs, 'place' | 'tripId'>>;
  createTrip?: Resolver<ResolversTypes['Trip'], ParentType, ContextType, RequireFields<MutationCreateTripArgs, 'trip'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'userInput'>>;
  deleteActivity?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteActivityArgs, 'id'>>;
  deleteDayPlan?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteDayPlanArgs, 'id'>>;
  deleteInvite?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteInviteArgs, 'id'>>;
  deletePlace?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeletePlaceArgs, 'placeId'>>;
  deleteTransportation?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteTransportationArgs, 'id'>>;
  deleteTrip?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteTripArgs, 'id'>>;
  removeAuthorOnTrip?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationRemoveAuthorOnTripArgs, 'id'>>;
  sendInvite?: Resolver<ResolversTypes['Invite'], ParentType, ContextType, RequireFields<MutationSendInviteArgs, 'invitee' | 'tripId'>>;
  token?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  updateActiveElement?: Resolver<ResolversTypes['ActiveElement'], ParentType, ContextType, RequireFields<MutationUpdateActiveElementArgs, 'activeElement' | 'tripId'>>;
  updateActivity?: Resolver<ResolversTypes['Activity'], ParentType, ContextType, RequireFields<MutationUpdateActivityArgs, 'id' | 'updateActivityInput'>>;
  updateAuthorOnTripRole?: Resolver<ResolversTypes['AuthorsOnTrips'], ParentType, ContextType, RequireFields<MutationUpdateAuthorOnTripRoleArgs, 'id' | 'role'>>;
  updateDayPlan?: Resolver<ResolversTypes['DayPlan'], ParentType, ContextType, RequireFields<MutationUpdateDayPlanArgs, 'id' | 'updateDayPlan'>>;
  updateInviteRole?: Resolver<ResolversTypes['PendingInvite'], ParentType, ContextType, RequireFields<MutationUpdateInviteRoleArgs, 'id' | 'role'>>;
  updatePlace?: Resolver<ResolversTypes['Place'], ParentType, ContextType, RequireFields<MutationUpdatePlaceArgs, 'id' | 'place'>>;
  updateTransportation?: Resolver<ResolversTypes['Transportation'], ParentType, ContextType, RequireFields<MutationUpdateTransportationArgs, 'id' | 'transportation'>>;
  updateTrip?: Resolver<ResolversTypes['Trip'], ParentType, ContextType, RequireFields<MutationUpdateTripArgs, 'updateTripInput'>>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PendingInviteResolvers<ContextType = any, ParentType extends ResolversParentTypes['PendingInvite'] = ResolversParentTypes['PendingInvite']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['TripRole'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Place'] = ResolversParentTypes['Place']> = {
  center?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  colour?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dayPlans?: Resolver<Array<ResolversTypes['DayPlan']>, ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  mapboxId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  placeName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transportation?: Resolver<Array<Array<ResolversTypes['Transportation']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlannerDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlannerDetails'] = ResolversParentTypes['PlannerDetails']> = {
  banner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  places?: Resolver<Array<ResolversTypes['Place']>, ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  activeElements?: Resolver<Array<ResolversTypes['ActiveElement']>, ParentType, ContextType, RequireFields<QueryActiveElementsArgs, 'tripId'>>;
  authorsOnTrips?: Resolver<Array<ResolversTypes['AuthorsOnTrips']>, ParentType, ContextType, RequireFields<QueryAuthorsOnTripsArgs, 'tripId'>>;
  authorsPresent?: Resolver<Array<ResolversTypes['AuthorPresent']>, ParentType, ContextType, RequireFields<QueryAuthorsPresentArgs, 'tripId'>>;
  dayPlan?: Resolver<ResolversTypes['DayPlan'], ParentType, ContextType, RequireFields<QueryDayPlanArgs, 'id'>>;
  dayPlans?: Resolver<Array<ResolversTypes['DayPlan']>, ParentType, ContextType, RequireFields<QueryDayPlansArgs, 'placeId'>>;
  getLocationSuggestions?: Resolver<Array<ResolversTypes['LocationSuggestion']>, ParentType, ContextType, RequireFields<QueryGetLocationSuggestionsArgs, 'query'>>;
  invites?: Resolver<Array<ResolversTypes['PendingInvite']>, ParentType, ContextType, RequireFields<QueryInvitesArgs, 'tripId'>>;
  place?: Resolver<ResolversTypes['Place'], ParentType, ContextType, RequireFields<QueryPlaceArgs, 'placeId'>>;
  places?: Resolver<Array<ResolversTypes['Place']>, ParentType, ContextType, RequireFields<QueryPlacesArgs, 'tripId'>>;
  plannerDetails?: Resolver<ResolversTypes['PlannerDetails'], ParentType, ContextType, RequireFields<QueryPlannerDetailsArgs, 'tripId'>>;
  routeLegs?: Resolver<Array<ResolversTypes['RouteLeg']>, ParentType, ContextType, RequireFields<QueryRouteLegsArgs, 'routeWaypoints'>>;
  transportation?: Resolver<Array<Array<ResolversTypes['Transportation']>>, ParentType, ContextType, RequireFields<QueryTransportationArgs, 'placeId'>>;
  trip?: Resolver<ResolversTypes['Trip'], ParentType, ContextType, RequireFields<QueryTripArgs, 'tripId'>>;
  trips?: Resolver<ResolversTypes['TripConnection'], ParentType, ContextType, RequireFields<QueryTripsArgs, 'limit'>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type RouteLegResolvers<ContextType = any, ParentType extends ResolversParentTypes['RouteLeg'] = ResolversParentTypes['RouteLeg']> = {
  duration?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  segments?: Resolver<Array<Array<ResolversTypes['Float']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  _empty?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "_empty", ParentType, ContextType>;
  listenActiveElement?: SubscriptionResolver<ResolversTypes['ActiveElement'], "listenActiveElement", ParentType, ContextType, RequireFields<SubscriptionListenActiveElementArgs, 'tripId'>>;
  listenAuthorPresent?: SubscriptionResolver<ResolversTypes['AuthorPresent'], "listenAuthorPresent", ParentType, ContextType, RequireFields<SubscriptionListenAuthorPresentArgs, 'tripId'>>;
  transportation?: SubscriptionResolver<ResolversTypes['TransportationNotification'], "transportation", ParentType, ContextType, RequireFields<SubscriptionTransportationArgs, 'placeIds'>>;
};

export type TransportationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transportation'] = ResolversParentTypes['Transportation']> = {
  arrivalCoords?: Resolver<Maybe<ResolversTypes['Coords']>, ParentType, ContextType>;
  arrivalLocation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  arrivalTime?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  connectingId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  connectingOrder?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  departureCoords?: Resolver<Maybe<ResolversTypes['Coords']>, ParentType, ContextType>;
  departureLocation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  departureTime?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  details?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  route?: Resolver<Maybe<ResolversTypes['RouteLeg']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TransportationType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransportationNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransportationNotification'] = ResolversParentTypes['TransportationNotification']> = {
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  placeId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  transportation?: Resolver<ResolversTypes['Transportation'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
  ActiveElement?: ActiveElementResolvers<ContextType>;
  Activity?: ActivityResolvers<ContextType>;
  AuthorPresent?: AuthorPresentResolvers<ContextType>;
  AuthorsOnTrips?: AuthorsOnTripsResolvers<ContextType>;
  AuthorsOnTripsConnection?: AuthorsOnTripsConnectionResolvers<ContextType>;
  AuthorsOnTripsEdge?: AuthorsOnTripsEdgeResolvers<ContextType>;
  Coords?: CoordsResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DayPlan?: DayPlanResolvers<ContextType>;
  Invite?: InviteResolvers<ContextType>;
  LocationContext?: LocationContextResolvers<ContextType>;
  LocationSuggestion?: LocationSuggestionResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PendingInvite?: PendingInviteResolvers<ContextType>;
  Place?: PlaceResolvers<ContextType>;
  PlannerDetails?: PlannerDetailsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RouteLeg?: RouteLegResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Transportation?: TransportationResolvers<ContextType>;
  TransportationNotification?: TransportationNotificationResolvers<ContextType>;
  Trip?: TripResolvers<ContextType>;
  TripConnection?: TripConnectionResolvers<ContextType>;
  TripEdge?: TripEdgeResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

