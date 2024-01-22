# Backend

Il progetto sfrutta le API libere di **NewYorkTimes** e **Google Books** per recuperare delle liste di libri dal primo, e arricchirle con il link alla preview recuperato dal secondo servizio.

## Intro

Il progetto usa Nodejs ed è scritto in **Typescript**.
All'interno della directory _src_ troviamo:
**routes**: Qui vengono definiti i path dei nostri endpoint e associati al metodo della classe BookController
**controller**: Contiene tutte le definizioni dei controller (in questo caso solo _BookController_)
**services**: Contiene i servizi per interrogare le API di NYT e GBOOKS. Sfruttano l'approccio Singleton: ad ogni richiesta di un istanza, se già inizializzata, viene sfruttata la stessa istanza.
**utils**: Contiene una serie di funzionalità di utilità: definizioni dei tipi, convertitori di tipi, definizioni di errori custom.

## Avvio

### Enviroment

Il backend richiede un file **.env** sul modello del file incluso **.env.sample**.
Il file .env contiene i due base url per i servizi (già inclusi nell'env.sample) e una chiave API per NYT.

Per avviare il backend sono forniti i seguenti script:

### "start": "ts-node src/index.ts"

Il comando principale per avviare il server.

### "build": "tsc",

Il comando per buildare ts

## Modalità Watch

Per poter sfruttare la comodità di nodemon in modalità sviluppo con TS, ho concatenato lo script che controlla le variazioni del sorgente in TS, e Nodemon per riavviare il server ad ogni modifica del JS compilato

### "tsc:watch": "tsc -w",

### "nodemon:watch": "nodemon dist/index.js",

### "dev": "yarn tsc:watch & yarn nodemon:watch"

Lanciare dunque con **yarn dev** oppure **npm dev**

## Endpoint disponibili

Sono esposti due endpoint principali, più uno per un semplice check sullo status del server.

Nel repositori è incluso anche il file _Books-API.postman_collection_, che contiene una configurazione pronta per testare le API con Postman.

### GET getBooksLists

**Endpoint n.1**
Non prende alcun parametro e restituisce tutte le liste di libri dall'archivio NYT

### GET getBooksFromList

**Endpoint n.2**
Prende come parametro **obbligatorio** la lista dei libri da recuperare, come parametro **facoltativo** il periodo di pubblicazione (default _current_) Restituisce i libri della lista richiesta arricchiti con la preview da GBooks
