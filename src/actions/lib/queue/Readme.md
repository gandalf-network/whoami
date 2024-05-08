# Workflows

## Data Processing Workflow

 This workflow is designed to bypass the limitations of serverless functions, which are constrained by
 execution time limits (seconds to minutes). It utilizes [Inngest](https://inngest.com) to manage a series of queues and execution flow, enabling asynchronous,
  batched data processing in chunks. Serverless/edge functions are activated through API requests from functions initialized by Inngest. These functions, upon detecting new events (pushed by the producer) executes neeccessary stats logic on it.
 A state management system constantly tracks progress (`AWAITING_CONNECTION`, `FAILED`, `CRUNCHING_DATA`, `COMPLETED`)
 across each stage, ensuring an orderly and reliable data flow.

 ---

 The workflow begins with the `queryActivities`, serving as the entry point. This queue
 is responsible for making API calls to Gandalf to fetch data using `dataKey`. Given Our API's data volume limits,
 data is retrieved in batches and subsequently stored in the database. This batched retrieval and storage process may
 extend the data processing time. The primary goal of this queue is to ensure all data
 is collected and stored efficiently.

 ---

As data is stored, we simultaneously trigger other functions by sending data through the Inngest producer to subsequent queues, establishing more complex workflows toward the final result.

- `queryShowData`: This queue is dedicated to collecting comprehensive information on each show, providing a foundation for subsequent analysis and processing. The resulting data is forwarded to `crawlRottenTomatoes`, and once fully completed, it triggers the `tvBFF` task.

  - `tvBFF`: Determines user television Best Friends Forever (BFF) based on viewing habits
            and preferences using AI

  - `crawlRottenTomatoes`: It focuses on web crawling Rotten Tomatoes for the latest show and movie reviews
  and ratings, enriching the dataset with neccessary information.

- `starSignPicker`: This is activated once `queryShowData` and `crawlRottenTomatoes` reach 97% completion. It assigns a star sign to the user based on their preferences.

---

 This layered, queue-based approach ensures that data is processed efficiently in
 the face of edge/serverless function constraints.

 | Start                   | Processing Queue             | Next Steps                    |
 |-------------------------|------------------------------|-------------------------------|
 | queryActivities         | Initial data fetching        | --> queryShowData             |
 |                         |                              |                               |
 | queryShowData           |  Actors & show information   | --> tvBFF                     |
 |                         |                              | --> starSignPicker            |
 |                         |                              |                               |
 | crawlRottenTomatoes     | Rotten Tomatoes crawling     | (Ends after processing)       |
 | tvBFF                   | TV BFF logic                 | (Ends after processing)       |
 | starSignPicker          | Astrological recommendations | (Ends after processing)       |

## State Tracking in Workflow

Designed to oversee the progress of tasks distributed across various queues, this state tracking logic uses `sessionId` as a unique identifier for collections of tasks tailored to specific user activities. This identifier is key to efficiently monitoring, tracking, and aggregating job statuses throughout different phases of the processing workflow. Each job's state is dynamically updated to reflect its current state based on the total jobs and completed jobs, ensuring real-time oversight of the workflow.

The idea is to employ a dynamic percentage completion model to gauge the progress of each job:

- 0% indicates a job is identified but not yet initiated.
- 1% to 99% indicates that a job is currently been processed.
- 100% completion signifies a job has been successfully completed but we only care about 97% completion.
