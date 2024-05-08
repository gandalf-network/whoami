# whoami.tv

[whoami.tv](https://whoami.tv/) is a fun, sharable web application that shows users all kinds of cool facts and stats about their TV taste based on their Netflix viewing history.

## How it works

- Data Collection: Users authorize our application to collect their viewing data via Gandalf.
- Data Enrichment: We fetch additional show details such as actors, episode counts, rotten tomato scores and images from TMDB and RottenTomato.
- Insight Generation: Our algorithms analyze the collected data to extract meaningful insights about viewing patterns and preferences.
- Personality Creation: Based on the analysis, We use OpenAI assistants and Perplexity create personality profiles that reflects each user’s TV show preferences.

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

## Contributing

Contributions are welcome, whether they're feature requests, bug fixes, or documentation improvements.
