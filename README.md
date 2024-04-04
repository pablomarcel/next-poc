# Database Proof of Concept with Next.js and GraphQL

This is a proof of concept (POC) [Next.js](https://nextjs.org/) project that showcases interaction with a PostgreSQL database using GraphQL. It includes functionality to list users from the database and add new users through a GraphQL API.

## Features

- Server-Side Rendering (SSR) of user data fetched from PostgreSQL using GraphQL.
- Client-side mutations to add new users to the PostgreSQL database.
- Custom navigation bar to switch between viewing users and adding new users.
- Styled with a basic CSS module for component-level styling.

## Getting Started

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Edit the pages inside the `pages` directory and components within the `components` directory. The app auto-updates as you edit the files.

## Setup

Before running the app, ensure that you have a PostgreSQL instance running and accessible. Configure the connection parameters in your `.env.local` file.

Run the database migrations (if provided) to create the necessary tables in your PostgreSQL instance.

## Project Structure

- `pages/api/graphql.js`: Defines the GraphQL schema and resolvers for querying and mutating user data.
- `pages/index.js`: The homepage that lists users from the database.
- `pages/add-user.js`: A form to add new users to the database.
- `components/Navbar.js`: A navigation component included on multiple pages for user interaction.
- `app/page.module.css`: Contains CSS styles applied to the layout and elements.

## Learn More About Next.js

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

## Deployment

Deploy the app using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

Contributions are always welcome! Please read the [contribution guidelines](CONTRIBUTING.md) first.

## License

Distributed under the MIT License. See `LICENSE` for more information.
```

This `README.md` is tailored to the specifics of your project, outlining its main features, setup instructions, and structure. Adjust the contents as necessary to match any additional details or configuration steps specific to your setup.
