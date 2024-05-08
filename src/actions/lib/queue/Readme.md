# Data Processing Workflow

 This workflow is designed to by-pass the limitations of serverless functions, which are constrained by
 execution time limits (seconds to minutes). It utilizes Inngest to manage a series of queues and execution flow, enabling asynchronous,
  batched data processing in chunks. Serverless/edge functions are activated through API requests from functions initialized
 at application by inngest. These functions, upon detecting new events (pushed by the producer) executes neeccessary stats logic on it.
 A state management system constantly tracks progress (NOT_INITIATED, PROCESSING, COMPLETED)
 across each stage, ensuring an orderly and reliable data flow.

 ---

 The workflow begins with the `queryActivitiesQueue`, serving as the entry point. This queue
 is responsible for making API calls to Gandalf to fetch data using `dataKey`. Given Our API's data volume limits,
 data is retrieved in batches and subsequently stored in the database. This batched retrieval and storage process may
 extend the data processing time. The primary goal of this queue is to ensure all data
 is collected and stored efficiently.

 ---

 As data is stored, it is concurrently pushed into three separate queues for further processing by serverless functions:

- `queryShowDataQueue`: Focuses on gathering comprehensive details about each show. This queue's
    output serves as a foundation for subsequent analyses and processing steps. Upon total completion,
    it triggers 3 tasks:
  - `tvBFFQueue`: Determines user television Best Friends Forever (BFF) based on viewing habits
            and preferences using AI
  - `starSignPickerQueue`: Handles designation of star sign to the user based on their taste(s)

- `crawlRottenTomatoesQueue`: This operates independently of the show-related
 data queues. It focuses on web crawling Rotten Tomatoes for the latest show and movie reviews
 and ratings, enriching the dataset with neccessary information.

---

 This layered, queue-based approach ensures that data is processed efficiently in
 the face of edge/serverless function constraints.
 *
 | Start                   | Processing Queue             | Next Steps                    |
 |-------------------------|------------------------------|-------------------------------|
 | queryActivitiesQueue    | Initial data fetching        | --> queryShowDataQueue        |
 |                         |                              |                               |
 | queryShowDataQueue      |  Actors & show information   | --> tvBFFQueue                |
 |                         |                              | --> starSignPickerQueue       |
 |                         |                              |                               |
 | crawlRottenTomatoesQueue| Rotten Tomatoes crawling     | (Ends after processing)       |
 | tvBFFQueue              | TV BFF logic                 | (Ends after processing)       |
 | starSignPickerQueue     | Astrological recommendations | (Ends after processing)       |
