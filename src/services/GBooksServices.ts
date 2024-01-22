import axios from "axios"
import dotenv from "dotenv"
import { CustomErrors, HttpStatusCode } from "../utils"

export default class GBookServices {
	private static instance: GBookServices
	private GBOOKS_BASE_URL: string

	private constructor() {
		dotenv.config()
		this.GBOOKS_BASE_URL = process.env.GBOOKS_BASE_URL || ""
	}

	// Approccio Singleton
	public static getInstance(): GBookServices {
		if (!GBookServices.instance) {
			GBookServices.instance = new GBookServices()
		}
		return GBookServices.instance
	}

	/*
	getBooks è il metodo per ottenere la preview delle liste di libri
	Prende come parametro obbligatorio il codice isbn e i dati sul libro
	*/
	public async getBookDetails(isbn: string): Promise<any> {
		const url = `${this.GBOOKS_BASE_URL}/volumes?q=isbn:${isbn}`
		try {
			const response = await axios.get(url)

			return response.data
		} catch (error) {
			console.error(error)
			// Controlla se l'errore è un errore Axios
			if (axios.isAxiosError(error)) {
				// Ora puoi essere sicuro che l'errore sia relativo a una richiesta HTTP
				const status = error.response?.status

				// Gestisci i diversi status di risposta HTTP
				switch (status) {
					case HttpStatusCode.BadRequest:
						throw new CustomErrors.BadRequestError("Bad Request da GBOOKS API")
					case HttpStatusCode.Unauthorized:
						throw new CustomErrors.UnauthorizedError(
							"Richiesta a GBOOKS API non autorizzata"
						)
					case HttpStatusCode.Forbidden:
						throw new CustomErrors.ForbiddenError(
							"Accesso negato da GBOOKS API"
						)
					case HttpStatusCode.NotFound:
						throw new CustomErrors.NotFoundError(
							"Risorsa non trovata in GBOOKS API"
						)
					case HttpStatusCode.TooManyRequests:
						throw new CustomErrors.TooManyRequestsError(
							"Richieste a GBOOKS API troppo numerose"
						)
					// Aggiungi qui altri casi di status se necessario
					default:
						throw new CustomErrors.GenericError(
							"Errore HTTP nel fetch delle liste: " + status
						)
				}
			} else {
				// Gestisci altri tipi di errori personalizzati o generici
				throw new CustomErrors.GenericError(
					"Errore generico nel fetch delle liste: " + error
				)
			}
		}
	}
}
