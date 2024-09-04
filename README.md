# School Management App

This project is a desktop app built with Electron.js and Next.js

Notes: 

- This app uses Nest.js as its Web API server.
- This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Getting Started

First, run the development server:

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


## Nest.js response data

This app uses Nest.js as its Web API server.

### Session response

Nest sends session data in the form of:

```typescript
type SessionResponseData = {
  accessToken: string
  tokenExpiration: Date
  user: {
    userId: number
    name: string | null
    email: string
    image: string | null
  }
}
```

### Error response

Nest sends standard HTTP exceptions.

JSON error content takes the form:

```typescript
type ErrorContent = {
  message: string | Array<string>
  error?: string
  status: number
}
```

where: 
- The `message` property is a custom message or array of custom messages.
- The `error` property takes the name of the built-in HTTP exceptions.
- The `status` property takes the status code the of built-in HTTP exceptions.







