import type { GraphQLClient, RequestOptions } from 'graphql-request';
import { createHash } from 'crypto';
import { GraphQLClient as GQLClient } from 'graphql-request';
import { ec as EC } from 'elliptic';
import { GandalfErrorCode, GandalfError, handleErrors } from '../../errors';
import { print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  Int64: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Map: { input: any; output: any; }
  Time: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type Activity = {
  __typename?: 'Activity';
  /** Unique identifier for the activity. */
  id: Scalars['String']['output'];
  /** Metadata associated with the activity. */
  metadata: ActivityMetadata;
};

export type ActivityMetadata = {
  /** List of identifiers associated with the activity's subject. */
  subject?: Maybe<Array<Maybe<Identifier>>>;
};

export type ActivityResponse = {
  __typename?: 'ActivityResponse';
  data: Array<Maybe<Activity>>;
  /** The maximum number of activities to retrieve (limit: 300). */
  limit: Scalars['Int64']['output'];
  /** The page number from which activities are being pulled. */
  page: Scalars['Int64']['output'];
  /** The total number of available activities in the dataset. */
  total: Scalars['Int64']['output'];
};

export type AmazonActivityMetadata = ActivityMetadata & {
  __typename?: 'AmazonActivityMetadata';
  /** Date indicating when the activity occurred. */
  date?: Maybe<Scalars['Date']['output']>;
  /** The product name of the Amazon activity */
  productName: Scalars['String']['output'];
  /** Quantity of item purchased */
  quantityPurchased: Scalars['Int']['output'];
  /** List of identifiers associated with the activity's subject. */
  subject?: Maybe<Array<Maybe<Identifier>>>;
  /** Total cost of purchased product */
  totalCost: Scalars['String']['output'];
};

/**
 * Represents a registered application within the system, encapsulating all relevant details
 * that identify and describe the application.
 */
export type Application = {
  __typename?: 'Application';
  /** The human-readable name of the application. */
  appName: Scalars['String']['output'];
  /** The address of the user who registered the application.  */
  appRegistrar: Scalars['String']['output'];
  /** A unique identifier assigned to the application upon registration. */
  gandalfID: Scalars['Int64']['output'];
  /**
   * The URL pointing to the icon graphic for the application. This URL should link to an image
   * that visually represents the application, aiding in its identification and branding.
   */
  iconURL: Scalars['String']['output'];
  /**
   * A public key associated with the application, used for cryptographic operations such as
   * verifying the identity of the application.
   */
  publicKey: Scalars['String']['output'];
};

export enum ContentType {
  Music = 'MUSIC',
  Shorts = 'SHORTS',
  Video = 'VIDEO'
}

export type Identifier = {
  __typename?: 'Identifier';
  /** The type of the identifier (enumeration) */
  identifierType: IdentifierType;
  /** The string value of the identifier. */
  value: Scalars['String']['output'];
};

export enum IdentifierType {
  Asin = 'ASIN',
  Igdb = 'IGDB',
  Imdb = 'IMDB',
  Moby = 'MOBY',
  Playstation = 'PLAYSTATION',
  Rawg = 'RAWG',
  Tvdb = 'TVDB',
  Tvmaze = 'TVMAZE',
  Youtube = 'YOUTUBE'
}

export type NetflixActivityMetadata = ActivityMetadata & {
  __typename?: 'NetflixActivityMetadata';
  /** Date indicating when the activity occurred , formatted as (DD/MM/YYYY). */
  date?: Maybe<Scalars['Date']['output']>;
  /** List of identifiers associated with the activity's subject. */
  subject?: Maybe<Array<Maybe<Identifier>>>;
  /** The title of the Netflix activity */
  title: Scalars['String']['output'];
};

export type PlaystationActivityMetadata = ActivityMetadata & {
  __typename?: 'PlaystationActivityMetadata';
  /** Date indicating the last time game was played. */
  lastPlayedAt?: Maybe<Scalars['Date']['output']>;
  /** List of identifiers associated with the activity's subject. */
  subject?: Maybe<Array<Maybe<Identifier>>>;
  /** The title of the Playstation activity */
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  /**
   * Retrieves a paginated list of activities based on a given data key and source.
   *
   * Returns: A response object containing a list of activities, along with pagination information.
   */
  getActivity: ActivityResponse;
  /**
   * Retrieves an application by its public key.
   *
   * Returns: An Application object that includes detailed information about the requested application.
   */
  getAppByPublicKey: Application;
  /**
   * Looks up a specific activity by its unique identifier (ID) and a data key.
   *
   * Returns: An Activity object containing detailed information about the requested activity.
   */
  lookupActivity: Activity;
};


export type QueryGetActivityArgs = {
  dataKey: Scalars['String']['input'];
  limit: Scalars['Int64']['input'];
  page: Scalars['Int64']['input'];
  source: Source;
};


export type QueryGetAppByPublicKeyArgs = {
  publicKey: Scalars['String']['input'];
};


export type QueryLookupActivityArgs = {
  activityId: Scalars['UUID']['input'];
  dataKey: Scalars['String']['input'];
};

export enum Source {
  Amazon = 'AMAZON',
  Netflix = 'NETFLIX',
  Playstation = 'PLAYSTATION',
  Youtube = 'YOUTUBE'
}

export type YoutubeActivityMetadata = ActivityMetadata & {
  __typename?: 'YoutubeActivityMetadata';
  /** Enum denoting the type of the youtube activity */
  contentType: ContentType;
  /** Date indicating the last time the Youtube video was played. */
  date?: Maybe<Scalars['Date']['output']>;
  /** An integer indicating what percentage of the entire video duration watched. */
  percentageWatched: Scalars['Int']['output'];
  /** List of identifiers associated with the activity's subject. */
  subject?: Maybe<Array<Maybe<Identifier>>>;
  /** The title of the Youtube activity */
  title: Scalars['String']['output'];
};

export type GetActivityQueryVariables = Exact<{
  dataKey: Scalars['String']['input'];
  source: Source;
  limit: Scalars['Int64']['input'];
  page: Scalars['Int64']['input'];
}>;


export type GetActivityQuery = { __typename: 'Query', getActivity: { __typename: 'ActivityResponse', limit: any, total: any, page: any, data: Array<{ __typename: 'Activity', id: string, metadata: { __typename: 'AmazonActivityMetadata', productName: string, date?: any | null, quantityPurchased: number, totalCost: string, subject?: Array<{ __typename?: 'Identifier', value: string, identifierType: IdentifierType } | null> | null } | { __typename: 'NetflixActivityMetadata', title: string, date?: any | null, subject?: Array<{ __typename?: 'Identifier', value: string, identifierType: IdentifierType } | null> | null } | { __typename: 'PlaystationActivityMetadata', title: string, lastPlayedAt?: any | null, subject?: Array<{ __typename?: 'Identifier', value: string, identifierType: IdentifierType } | null> | null } | { __typename: 'YoutubeActivityMetadata', title: string, date?: any | null, percentageWatched: number, contentType: ContentType, subject?: Array<{ __typename?: 'Identifier', value: string, identifierType: IdentifierType } | null> | null } } | null> } };

export type LookupActivityQueryVariables = Exact<{
  dataKey: Scalars['String']['input'];
  activityId: Scalars['UUID']['input'];
}>;


export type LookupActivityQuery = { __typename: 'Query', lookupActivity: { __typename: 'Activity', id: string, metadata: { __typename: 'AmazonActivityMetadata', productName: string, date?: any | null, quantityPurchased: number, totalCost: string, subject?: Array<{ __typename?: 'Identifier', value: string, identifierType: IdentifierType } | null> | null } | { __typename: 'NetflixActivityMetadata', title: string, date?: any | null, subject?: Array<{ __typename?: 'Identifier', value: string, identifierType: IdentifierType } | null> | null } | { __typename: 'PlaystationActivityMetadata', title: string, lastPlayedAt?: any | null, subject?: Array<{ __typename?: 'Identifier', value: string, identifierType: IdentifierType } | null> | null } | { __typename: 'YoutubeActivityMetadata', title: string, date?: any | null, percentageWatched: number, contentType: ContentType, subject?: Array<{ __typename?: 'Identifier', value: string, identifierType: IdentifierType } | null> | null } } };

export type GetAppByPublicKeyQueryVariables = Exact<{
  publicKey: Scalars['String']['input'];
}>;


export type GetAppByPublicKeyQuery = { __typename: 'Query', getAppByPublicKey: { __typename: 'Application', appName: string, publicKey: string, iconURL: string, gandalfID: any, appRegistrar: string } };


export const GetActivityDocument = gql`
    query getActivity($dataKey: String!, $source: Source!, $limit: Int64!, $page: Int64!) {
  getActivity(dataKey: $dataKey, source: $source, limit: $limit, page: $page) {
    data {
      id
      metadata {
        ... on AmazonActivityMetadata {
          productName
          subject {
            value
            identifierType
          }
          date
          quantityPurchased
          totalCost
        }
        ... on NetflixActivityMetadata {
          title
          subject {
            value
            identifierType
          }
          date
        }
        ... on PlaystationActivityMetadata {
          title
          subject {
            value
            identifierType
          }
          lastPlayedAt
        }
        ... on YoutubeActivityMetadata {
          title
          subject {
            value
            identifierType
          }
          date
          percentageWatched
          contentType
        }
        __typename
      }
      __typename
    }
    limit
    total
    page
    __typename
  }
  __typename
}
    `;
export const LookupActivityDocument = gql`
    query lookupActivity($dataKey: String!, $activityId: UUID!) {
  lookupActivity(dataKey: $dataKey, activityId: $activityId) {
    id
    metadata {
      ... on AmazonActivityMetadata {
        productName
        subject {
          value
          identifierType
        }
        date
        quantityPurchased
        totalCost
      }
      ... on NetflixActivityMetadata {
        title
        subject {
          value
          identifierType
        }
        date
      }
      ... on PlaystationActivityMetadata {
        title
        subject {
          value
          identifierType
        }
        lastPlayedAt
      }
      ... on YoutubeActivityMetadata {
        title
        subject {
          value
          identifierType
        }
        date
        percentageWatched
        contentType
      }
      __typename
    }
    __typename
  }
  __typename
}
    `;
export const GetAppByPublicKeyDocument = gql`
    query getAppByPublicKey($publicKey: String!) {
  getAppByPublicKey(publicKey: $publicKey) {
    appName
    publicKey
    iconURL
    gandalfID
    appRegistrar
    __typename
  }
  __typename
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;

export type EyeOptions = {
  privateKey: string;
  baseURL: string;
};

const GetActivityDocumentString = print(GetActivityDocument);
const LookupActivityDocumentString = print(LookupActivityDocument);
const GetAppByPublicKeyDocumentString = print(GetAppByPublicKeyDocument);
const ec = new EC('secp256k1');
export default class Eye {
  private client: GraphQLClient;
  private withWrapper: SdkFunctionWrapper = (action) => action();
  privateKey: string;

  constructor(opts: EyeOptions) {
    if (/^0x/i.test(opts.privateKey)) {
      opts.privateKey = opts.privateKey.slice(2)
    }
    this.client = new GQLClient(opts.baseURL);
    this.privateKey = opts.privateKey
  }

  private async signRequestBody(requestBody: any): Promise<string> {
    const privateKey = Eye.generatePrivateKeyFromHex(this.privateKey)
    try {
      const hash = createHash('sha256').update(JSON.stringify(requestBody)).digest();
      const signature = privateKey.sign(hash);
      const signatureDer = signature.toDER();
      const signatureB64 = Buffer.from(signatureDer).toString('base64');
      return signatureB64
    } catch (error: any) {
        throw new GandalfError(
          error.message + ' verify your private key', 
          GandalfErrorCode.InvalidSignature,
        )
    }
  }

  private async addSignatureToHeader(requestBody: any) {
    const signature = await this.signRequestBody(requestBody);
    const headers: GraphQLClientRequestHeaders = {
      'X-Gandalf-Signature': signature,
    };
    return headers;
  }

  private static generatePrivateKeyFromHex(hexPrivateKey: string): EC.KeyPair {
    try {
      const key = ec.keyFromPrivate(hexPrivateKey, 'hex');
      return key;
    } catch (error: any) {
      throw new GandalfError(
        error.message + ' verify your private key', 
        GandalfErrorCode.InvalidSignature,
      )
    }
  }

  async getActivity(variables: GetActivityQueryVariables, requestHeaders?: GraphQLClientRequestHeaders) {
      const requestBody = {
        query: GetActivityDocumentString,
        variables: {
          ...variables
        },
        operationName: 'getActivity'
      }
      const headers = await this.addSignatureToHeader(requestBody)
      requestHeaders = {...requestHeaders, ...headers}
      try {
        const { data } = await this.withWrapper((wrappedRequestHeaders) => this.client.rawRequest<GetActivityQuery>(GetActivityDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getActivity', 'query', variables);
        
        return data['getActivity'];
      } catch (error: any) {
        throw handleErrors(error)
      }
    }
  async lookupActivity(variables: LookupActivityQueryVariables, requestHeaders?: GraphQLClientRequestHeaders) {
      const requestBody = {
        query: LookupActivityDocumentString,
        variables: {
          ...variables
        },
        operationName: 'lookupActivity'
      }
      const headers = await this.addSignatureToHeader(requestBody)
      requestHeaders = {...requestHeaders, ...headers}
      try {
        const { data } = await this.withWrapper((wrappedRequestHeaders) => this.client.rawRequest<LookupActivityQuery>(LookupActivityDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'lookupActivity', 'query', variables);
        return {
          data: data['lookupActivity'],
        };
      } catch (error: any) {
        throw handleErrors(error)
      }
    }
  async getAppByPublicKey(variables: GetAppByPublicKeyQueryVariables, requestHeaders?: GraphQLClientRequestHeaders) {
      const requestBody = {
        query: GetAppByPublicKeyDocumentString,
        variables: {
          ...variables
        },
        operationName: 'getAppByPublicKey'
      }
      const headers = await this.addSignatureToHeader(requestBody)
      requestHeaders = {...requestHeaders, ...headers}
      try {
        const { data } = await this.withWrapper((wrappedRequestHeaders) => this.client.rawRequest<GetAppByPublicKeyQuery>(GetAppByPublicKeyDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAppByPublicKey', 'query', variables);
        return {
          data: data['getAppByPublicKey'],
        };
      } catch (error: any) {
        throw handleErrors(error)
      }
  }
}