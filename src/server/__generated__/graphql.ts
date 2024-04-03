import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type CrossoverStar = {
  __typename?: "CrossoverStar";
  imageURL: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  topShows: Scalars["String"]["output"][];
};

export type Mutation = {
  __typename?: "Mutation";
  startSession: Session;
};

export type Query = {
  __typename?: "Query";
  getReportCard: ReportCard;
  getSession: Scalars["String"]["output"];
  getStats: Stats;
};

export type QueryGetReportCardArgs = {
  sessionID: Scalars["String"]["input"];
};

export type QueryGetSessionArgs = {
  sessionID: Scalars["String"]["input"];
};

export type QueryGetStatsArgs = {
  sessionID: Scalars["String"]["input"];
};

export type RealStarSign = {
  __typename?: "RealStarSign";
  name: Scalars["String"]["output"];
  reason: Scalars["String"]["output"];
  show: Scalars["String"]["output"];
};

export type ReportCard = {
  __typename?: "ReportCard";
  realStarSign: RealStarSign;
  rottenTomatoeScore: Scalars["Int"]["output"];
  tvBFF: TvBff;
};

export type Session = {
  __typename?: "Session";
  redirectURL: Scalars["String"]["output"];
  sessionID: Scalars["String"]["output"];
};

export type Stats = {
  __typename?: "Stats";
  firstTvShow: TvShowDetails;
  genreDistribution: Scalars["String"]["output"][];
  mostWatchedTvShow: WatchedTvShow;
  yourCrossoverStar: CrossoverStar;
};

export type TvBff = {
  __typename?: "TvBFF";
  imageURL: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  reason: Scalars["String"]["output"];
  show: Scalars["String"]["output"];
};

export type TvShowDetails = {
  __typename?: "TvShowDetails";
  date: Scalars["String"]["output"];
  imageURL: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

export type WatchedTvShow = {
  __typename?: "WatchedTvShow";
  episode: Scalars["String"]["output"];
  imageURL: Scalars["String"]["output"];
  numberOfTimes: Scalars["Int"]["output"];
  season: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<
  TResult,
  TParent = object,
  TContext = object,
  TArgs = object,
> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = object,
  TContext = object,
  TArgs = object,
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = object, TContext = object> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = object, TContext = object> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = object,
  TParent = object,
  TContext = object,
  TArgs = object,
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  CrossoverStar: ResolverTypeWrapper<CrossoverStar>;
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  Mutation: ResolverTypeWrapper<object>;
  Query: ResolverTypeWrapper<object>;
  RealStarSign: ResolverTypeWrapper<RealStarSign>;
  ReportCard: ResolverTypeWrapper<ReportCard>;
  Session: ResolverTypeWrapper<Session>;
  Stats: ResolverTypeWrapper<Stats>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  TvBFF: ResolverTypeWrapper<TvBff>;
  TvShowDetails: ResolverTypeWrapper<TvShowDetails>;
  WatchedTvShow: ResolverTypeWrapper<WatchedTvShow>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"]["output"];
  CrossoverStar: CrossoverStar;
  Int: Scalars["Int"]["output"];
  Mutation: object;
  Query: object;
  RealStarSign: RealStarSign;
  ReportCard: ReportCard;
  Session: Session;
  Stats: Stats;
  String: Scalars["String"]["output"];
  TvBFF: TvBff;
  TvShowDetails: TvShowDetails;
  WatchedTvShow: WatchedTvShow;
};

export type CrossoverStarResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CrossoverStar"] = ResolversParentTypes["CrossoverStar"],
> = {
  imageURL?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  topShows?: Resolver<ResolversTypes["String"][], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
  startSession?: Resolver<ResolversTypes["Session"], ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  getReportCard?: Resolver<
    ResolversTypes["ReportCard"],
    ParentType,
    ContextType,
    RequireFields<QueryGetReportCardArgs, "sessionID">
  >;
  getSession?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    RequireFields<QueryGetSessionArgs, "sessionID">
  >;
  getStats?: Resolver<
    ResolversTypes["Stats"],
    ParentType,
    ContextType,
    RequireFields<QueryGetStatsArgs, "sessionID">
  >;
};

export type RealStarSignResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RealStarSign"] = ResolversParentTypes["RealStarSign"],
> = {
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  show?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReportCardResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ReportCard"] = ResolversParentTypes["ReportCard"],
> = {
  realStarSign?: Resolver<
    ResolversTypes["RealStarSign"],
    ParentType,
    ContextType
  >;
  rottenTomatoeScore?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  tvBFF?: Resolver<ResolversTypes["TvBFF"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SessionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Session"] = ResolversParentTypes["Session"],
> = {
  redirectURL?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  sessionID?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Stats"] = ResolversParentTypes["Stats"],
> = {
  firstTvShow?: Resolver<
    ResolversTypes["TvShowDetails"],
    ParentType,
    ContextType
  >;
  genreDistribution?: Resolver<
    ResolversTypes["String"][],
    ParentType,
    ContextType
  >;
  mostWatchedTvShow?: Resolver<
    ResolversTypes["WatchedTvShow"],
    ParentType,
    ContextType
  >;
  yourCrossoverStar?: Resolver<
    ResolversTypes["CrossoverStar"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TvBffResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["TvBFF"] = ResolversParentTypes["TvBFF"],
> = {
  imageURL?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  show?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TvShowDetailsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["TvShowDetails"] = ResolversParentTypes["TvShowDetails"],
> = {
  date?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  imageURL?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WatchedTvShowResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["WatchedTvShow"] = ResolversParentTypes["WatchedTvShow"],
> = {
  episode?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  imageURL?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  numberOfTimes?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  season?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CrossoverStar?: CrossoverStarResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RealStarSign?: RealStarSignResolvers<ContextType>;
  ReportCard?: ReportCardResolvers<ContextType>;
  Session?: SessionResolvers<ContextType>;
  Stats?: StatsResolvers<ContextType>;
  TvBFF?: TvBffResolvers<ContextType>;
  TvShowDetails?: TvShowDetailsResolvers<ContextType>;
  WatchedTvShow?: WatchedTvShowResolvers<ContextType>;
};
