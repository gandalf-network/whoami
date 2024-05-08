
# whoami.tv

[whoami.tv](https://whoami.tv/) is a fun, sharable web application that shows users all kinds of cool facts and stats about their TV taste based on their Netflix viewing history.

## How it works

- Data Collection: Users authorize our application to collect their Netflix viewing data via [Gandalf](https://gandalf.network/).
- Data Enrichment: We fetch additional show details such as actors, episode counts, rotten tomato scores and images from [TMDB](https://developer.themoviedb.org/reference/intro/getting-started) and [RottenTomato](https://www.rottentomatoes.com/).
- Insight Generation: Our algorithms analyze the collected data to extract meaningful insights about viewing patterns and preferences.
- Personality Creation: Based on the analysis, We use [OpenAI assistants](https://platform.openai.com/docs/assistants/overview) and [Perplexity AI](https://www.perplexity.ai/) to create personality profiles that reflects each user’s TV show preferences.

## Getting Started

This section provides a quick overview of how to this project locally and deploy your version live!.

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

#### Environment Configuration:
Create a .env file in the project root and add the following keys

Gandalf - https://dashboard.gandalf.network
```bash
GANDALF_SAURON_URL=YOUR_GANDALF_SAURON_URL
GANDALF_APP_PRIVATE_KEY=YOUR_GANDALF_APP_PRIVATE_KEY
```

OpenAI - https://platform.openai.com/api-keys
```bash
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
```

Perplexity - https://docs.perplexity.ai/docs/getting-started
```bash
PERPLEXITY_API_KEY=YOUR_PERPLEXITY_API_KEY
```

Postgres - https://vercel.com/storage/postgres
```bash
POSTGRES_URL=YOUR_POSTGRES_URL
POSTGRES_PRISMA_URL=YOUR_POSTGRES_URL
```

Redis - https://vercel.com/docs/storage/vercel-kv/quickstart
```bash
REDIS_URL=YOUR_REDIS_URL
```

TMDB - https://developer.themoviedb.org/reference/intro/getting-started
```bash
TMDB_BASE_URL=YOUR_TMDB_BASE_URL
TMDB_API_KEY=YOUR_TMDB_API_KEY
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgandalf-network%2Fwhoami&env=NEXT_PUBLIC_GANDALF_PUBLIC_KEY,GANDALF_PRIVATE_KEY&envDescription=Environment%20variables%20for%20the%20Gandalf%20API&envLink=https%3A%2F%2Fgandalf-api.com%2Fdashboard&project-name=whoami&repository-name=whoami)


## Project Structure
This section provides an overview of the folder structure and key technologies used in the whoami.tv project. Understanding this will help you effectively navigate and customize the project.

### Folder Structure

The codebase follows a well-organized folder structure to keep your codebase clean and maintainable:

``` lua
|-- app
|-- actions
|-- components
|-- helpers
|-- hooks
|-- types
|-- ...
```

**app**: Place your page here, organized by functionality.

**actions**: Server action methods goes here

**components**: Reusable UI components go here.

**helpers**: Helpers methods goes here

**hooks**: Add your hooks here

**types**: Add your typescript types here

## Contributing

We welcome contributions to make this app even better. If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.
