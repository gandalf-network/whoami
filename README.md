
# whoami. tv

[whoami. tv](https://whoami.tv/) is a fun, shareable web application that shows users all kinds of cool facts and stats about their TV taste based on their Netflix viewing history.

## How it works

- Data Collection: Users authorize our application to collect their Netflix viewing data via [Gandalf](https://gandalf.network/).
- Data Enrichment: We fetch additional show details such as actors, episode counts, rotten tomato scores, and images from [TMDB](https://developer.themoviedb.org/reference/intro/getting-started) and [RottenTomato](https://www.rottentomatoes.com/).
- Insight Generation: Our algorithms analyze the collected data to extract meaningful insights about viewing patterns and preferences.
- Personality Creation: Based on the analysis, We use [OpenAI assistants](https://platform.openai.com/docs/assistants/overview) and [Perplexity AI](https://www.perplexity.ai/) to create personality profiles that reflect each user’s TV show preferences.

## Getting Started

This section provides a quick overview of how to do this project locally and deploy your version live!

### Local Setup and Installation

#### Clone the Repository

```bash
git clone https://github.com/gandalf-network/whoami.git
cd whoami
```

#### Installation

```bash
yarn install
```

#### Environment Configuration

Create a .env file in the project root and add the following keys

Gandalf - <https://dashboard.gandalf.network>

```bash
GANDALF_SAURON_URL=YOUR_GANDALF_SAURON_URL
GANDALF_PRIVATE_KEY=YOUR_GANDALF_PRIVATE_KEY
NEXT_PUBLIC_GANDALF_PUBLIC_KEY=YOUR_GANDALF_PUBLIC_KEY
```

OpenAI - <https://platform.openai.com/api-keys>

```bash
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
```

Perplexity - <https://docs.perplexity.ai/docs/getting-started>

```bash
PERPLEXITY_API_KEY=YOUR_PERPLEXITY_API_KEY
```

Postgres - <https://vercel.com/storage/postgres>

```bash
POSTGRES_URL=YOUR_POSTGRES_URL
POSTGRES_PRISMA_URL=YOUR_POSTGRES_URL
```

Redis - <https://vercel.com/docs/storage/vercel-kv/quickstart>

```bash
REDIS_URL=YOUR_REDIS_URL
```

TMDB - <https://developer.themoviedb.org/reference/intro/getting-started>

```bash
TMDB_BASE_URL=YOUR_TMDB_BASE_URL
TMDB_API_KEY=YOUR_TMDB_API_KEY
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgandalf-network%2Fwhoami&env=NEXT_PUBLIC_GANDALF_PUBLIC_KEY,GANDALF_PRIVATE_KEY,GANDALF_SAURON_URL,POSTGRES_URL,POSTGRES_PRISMA_URL,TMDB_BASE_URL,TMDB_API_KEY,PERPLEXITY_API_KEY,REDIS_URL,OPENAI_API_KEY&envDescription=Environment%20variables%20for%20the%20Gandalf%20API&envLink=https%3A%2F%2Fgandalf-api.com%2Fdashboard&project-name=whoami&repository-name=whoami)

---

## Project Structure

This section provides an overview of the folder structure and key technologies used in the whoami.tv project. Understanding this will help you effectively navigate and customize the project.

### Technology Stack

- [Gandalf Connect](https://github.com/gandalf-network/connect): Lets your users to link their accounts to the [Gandalf Network](https://gandalf.network/).
- [eyeofsauron](https://github.com/gandalf-network/eyeofsauron): Command-line tool designed to generate the necessary files that makes it super easy to query user data from the Gandalf Network.
- [Next.js](https://nextjs.org/): The core framework that powers the server-side rendering and static generation.
- [Inngest](https://www.inngest.com/): Inngest works by serving an HTTP API endpoint which exposes functions that can be called on-demand.
- [Prisma](https://github.com/prisma/prisma): NodeJS ORM.
- [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started): Fetching detailed information about shows and actors.
- [Rotten Tomatoes](https://www.rottentomatoes.com/): Fetching tv show rotten tomato scores.
- [OpenAI Assistants API](https://platform.openai.com/docs/assistants/overview): Used to generate user personas based on their TV show preferences.
- [Perplexity API](https://www.perplexity.ai/): Used for browsing the internet to get information about characters from a TV show.

### Folder Structure

The codebase follows a well-organized folder structure to keep your codebase clean and maintainable:

``` lua
|-- actions
    |-- API - Contains all the logic for making API calls to OpenAI, RottenTomatoes, Perplexity, and TVDB.
    |-- database - Contains all the database functions for creating new users, saving user Netflix data, and querying the data.
    |-- eyeofsauron - This is generated by the eyeofsauron package for querying users' Netflix data from the Gandalf Network.
    |-- inngest - Contains the functions we want to be triggered by inngest.
    |-- lib - Contains logic for enqueing and tracking the jobs in the Redis store.
    |-- store - Contains the logic for initializing the Redis store.
|-- app
    |-- API - Contains all the serverless functions.
        |-- callback - This is the endpoint the user is redirected to after connecting their Netflix account to the Gandalf Network.
        |-- image - This endpoint returns the base64 value of an image.
        |-- inngest - Contains functionality related to Inngest.
        |-- og - This endpoint is for fetching generated OpenGraph images.
        |-- user - This endpoint is for fetching the current user via session ID
|-- components
    |-- icon - Contain the icon assets used throughout the application
    |-- images - Contains the OpenGraph image assets
    |-- loader - Contains components related to loading animations or visual indicators
    |-- providers - This folder includes higher-level components for managing application context and state providers.
    |-- screens - Contains components that represent different screens within the app
    |-- stories - Contains components that represent individual user data stories
    |-- themed - Contains components that are styled based on our theme
|-- helpers - This folder contains functions and other code snippets that assist with common tasks.
|-- hooks - This folder contains custom hooks designed to encapsulate reusable logic and improve code structure.
|-- types - This folder contains the TypeScript type definitions and interfaces used throughout the app
|-- ...
```

### Data Processing Workflow

A detailed overview of how we are working with the limitations of Vercel's serverless functions can be found here: [Data Processing Workflow](https://github.com/gandalf-network/whoami/blob/chore/update-readme/src/actions/lib/queue/Readme.md)

## Contributing

We welcome contributions to make this app even better. If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.
