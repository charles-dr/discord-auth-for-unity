# NodeJS API Example

## Tech Stacks
- Node.js
- Express.js
- Typescript

## How to Run

### Configuration
- Install Packages

```bash
npm install
```

- Port

Before running the server, you can configure the port in .env

```bash
cp .env.example .env
```

The default port is 3000.

### To run on local machine

```bash
npm run dev
```

### Test

```bash
npm run test
```

### Build 

```bash
npm run build
```

### Deploy to Heroku

```bash
heroku login    # if you didn't login to heroku.
heroku create   # one time only
npm run deploy:heroku
```