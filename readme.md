# Welcome to the Parts Unlimited repo
## Running Locally
### Installation

1. Make sure you have Node 15 installed and enabled.
2. Run `yarn` in the root directory of the repository.
3. Make sure you have mongodb installed and running and create an empty database called `wilco`.
4. To seed your database with dummy data, run `yarn run seeds` in the `backend` directory.

### Running

To start the app use: `yarn start`, it'll start both the backend and the frontend.

By default the frontend will run on port `3001` and the backend on port `3000`.

Please find more info about each part in the relevant Readme file ([frontend](frontend/readme.md) and [backend](backend/README.md)).

## Development

When implementing a new feature or fixing a bug, please create a new pull request against `main` from a feature/bug branch and add `@janesmithwilco` as reviewer.
