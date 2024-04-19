
/**
 * Data Processing Workflow:
 * 
 * This workflow is designed to by-pass the limitations of serverless functions, which are constrained by 
 * execution time limits (seconds to minutes). It utilizes BullMQ to manage a series of queues, enabling asynchronous,
 *  batched data processing in chunks. Serverless/edge functions are activated through API requests from workers initialized 
 * at application startup. These workers, upon detecting new events (pushed by the producer), collate this data and dispatch them in
 *  chunks to serverless functions via API calls. A state management system constantly tracks progress (NOT_INITIATED, PROCESSING, COMPLETED) 
 * across each stage, ensuring an orderly and reliable data flow.
 * 
 * The workflow begins with the `queryActivitiesQueue`, serving as the entry point. This queue 
 * is responsible for making API calls to Gandalf to fetch data using `dataKey`. Given Our API's data volume limits, 
 * data is retrieved in batches and subsequently stored in the database. This batched retrieval and storage process may 
 * extend the data processing time. The primary goal of this queue is to ensure all data 
 * is collected and stored efficiently.
 * 
 * As data is stored, it is concurrently pushed into three separate queues for further processing by serverless functions:
 * 
 * 1. `queryShowDataQueue`: Focuses on gathering comprehensive details about each show. This queue's 
 *    output serves as a foundation for subsequent analyses and processing steps. Upon total completion, 
 *    it triggers 3 tasks:
 *      a.) `genreDistributionQueue`: to analyze the genre distribution of the shows based on the acquired data. 
 *           This analysis leverages OpenAI API for advanced data insights.
 * 
 *      b.) `tvBFFQueue`: Determines user television Best Friends Forever (BFF) based on viewing habits 
 *            and preferences using AI
 * 
 *      c.) `starSignPickerQueue`: Handles designation of star sign to the user based on their taste(s)
 * 
 * 2. `crawlRottenTomatoesQueue`: This operates independently of the show-related 
 * data queues. It focuses on web crawling Rotten Tomatoes for the latest show and movie reviews 
 * and ratings, enriching the dataset with neccessary information.
 *
 * This layered, queue-based approach ensures that data is processed efficiently in 
 * the face of edge/serverless function constraints.
 * 
 * | Start                  | Processing Queue             | Next Steps                    |
 * |------------------------|------------------------------|-------------------------------|
 * | queryActivitiesQueue   | Initial data fetching        | --> queryShowActorsQueue      |                    
 * |                        |                              | --> queryShowDataQueue        |                   
 * |                        |                              | --> crawlRottenTomatoeQueue   |
 * |                        |                              |                               |
 * | queryShowDataQueue     | Actors & show information    | --> genreDistributionQueue    |   |
 * |                        |                              |                               |
 * | queryShowDataQueue     | Show details                 | --> genreDistributionQueue    |
 * |                        |                              |                               |
 * | genreDistributionQueue | Genre distribution analysis  | --> tvBFFQueue                |                   
 * |                        |                              | --> starSignPickerQueue       |
 * |                        |                              |                               |
 * | crawlRottenTomatoesQueue| Rotten Tomatoes crawling     | (Ends after processing)       |                   
 * | tvBFFQueue             | TV BFF logic                 | (Ends after processing)       |                 
 * | starSignPickerQueue    | Astrological recommendations | (Ends after processing)       |
*/

import { vercelKVClient } from '../../store/vercelkv';
import { Queue } from 'bullmq';


const queueOptions = { connection: vercelKVClient }

export const queueNames = {
    QueryActivities: "queryActivities",
    QueryShowActors: "queryShowActors",
    QueryShowData: "queryShowData",
    CrawlRottenTomatoes: "crawlRottenTomatoe",
    GenreDistribution: "genreDistribution",
    TVBFF: "tvBFF",
    StarSignPicker: "starSignPicker",
}

/** 
 * Queue for querying activities data from Gandalf API.
 */
export const queryActivitiesQueue: Queue = new Queue(queueNames.QueryActivities, queueOptions);

/** 
 * Dedicated to fetching actors' information for TV shows or movies.
 * This queue enhances media data with detailed cast information.
*/
export const queryShowActorsQueue: Queue = new Queue(queueNames.QueryShowActors, queueOptions);

/** 
 * Handles querying detailed information about shows from sources like IMDB or TMDB.
 * This queue is focused on enriching the database with comprehensive show data.
 */
export const queryShowDataQueue: Queue = new Queue(queueNames.QueryShowData, queueOptions);

/** 
 * Aimed at crawling Rotten Tomatoes for reviews and ratings, aggregating critical 
 * and audience reception data.
 */
export const crawlRottenTomatoesQueue: Queue = new Queue(queueNames.CrawlRottenTomatoes, queueOptions);

/** 
 * Analyzes and distributes activties based on genre leveraging openAI API
 */
export const genreDistributionQueue: Queue = new Queue(queueNames.GenreDistribution, queueOptions);

/** 
 * Processes user viewing habits to determine "TV Best Friends Forever" (BFF)
 */
export const tvBFFQueue: Queue = new Queue(queueNames.TVBFF, queueOptions);

/** 
 * Engages in fun task of matching activities real star signs, 
 */
export const starSignPickerQueue: Queue = new Queue('starSignPickerQueue', queueOptions);

export default {
    starSignPickerQueue,
    tvBFFQueue,
    genreDistributionQueue,
    queryShowActorsQueue,
    queryShowDataQueue,
    queryActivitiesQueue,
    crawlRottenTomatoesQueue,
};
