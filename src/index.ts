import express from "express"
import router from "./routes/api"

// Configurazione dotEnv per le variabili d'ambiente e recupero delle stesse
import dotenv from "dotenv"
dotenv.config()
const hostname: string = process.env.HOSTNAME || "127.0.0.1"
const port: number = parseInt(process.env.PORT as string, 10) || 3000

// Inizializzazione express e aggiunta di router e dei middlewares
const app = express()
app.use(express.json())
app.use("/api/v1", router)

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`)
})
