# Backend

## Scripts

Il Server è fornito con i seguenti script:

### "start": "ts-node src/index.ts"

Il comando principale per avviare il server.

### "build": "tsc",

Il comando per buildare ts

## Modalità Watch

Per poter sfruttare la comodità di nodemon in modalità sviluppo con TS, abbiamo concatenato lo script che controlla le variazioni del sorgente in TS, e Nodemon per riavviare il server ad ogni modifica del JS compilato

### "tsc:watch": "tsc -w",

### "nodemon:watch": "nodemon dist/index.js",

### "dev": "yarn tsc:watch & yarn nodemon:watch"
