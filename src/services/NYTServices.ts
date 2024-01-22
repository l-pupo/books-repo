import axios from "axios"
import dotenv from "dotenv"
import { CustomErrors, HttpStatusCode } from "../utils"
import { toBooksList, toListsArray } from "../utils/converters"
import { BooksList, List } from "../utils/types"

export default class NYTServices {
	private static instance: NYTServices
	private NYT_API_KEY: string
	private NYT_BASE_URL: string

	private constructor() {
		dotenv.config()
		this.NYT_API_KEY = process.env.NYT_API_KEY || ""
		this.NYT_BASE_URL = process.env.NYT_BASE_URL || ""
	}

	// Approccio Singleton
	public static getInstance(): NYTServices {
		if (!NYTServices.instance) {
			NYTServices.instance = new NYTServices()
		}
		return NYTServices.instance
	}

	/*
	getLists è il metodo per ottenere le liste di libri
	Non prende parametri
	*/
	public async getLists(): Promise<List[]> {
		const url = `${this.NYT_BASE_URL}/lists/names.json?api-key=${this.NYT_API_KEY}`

		try {
			const response = await axios.get(url)
			const formattedResponse = toListsArray(response.data.results)
			return formattedResponse
		} catch (error) {
			console.error(error)
			// Controlla se l'errore è un errore Axios
			if (axios.isAxiosError(error)) {
				// Ora puoi essere sicuro che l'errore sia relativo a una richiesta HTTP
				const status = error.response?.status

				// Gestisci i diversi status di risposta HTTP
				switch (status) {
					case HttpStatusCode.BadRequest:
						throw new CustomErrors.BadRequestError("Bad Request da NYT API")
					case HttpStatusCode.Unauthorized:
						throw new CustomErrors.UnauthorizedError(
							"Richiesta a NYT API non autorizzata"
						)
					case HttpStatusCode.Forbidden:
						throw new CustomErrors.ForbiddenError("Accesso negato da NYT API")
					case HttpStatusCode.NotFound:
						throw new CustomErrors.NotFoundError(
							"Risorsa non trovata in NYT API"
						)
					case HttpStatusCode.TooManyRequests:
						throw new CustomErrors.TooManyRequestsError(
							"Richieste a NYT API troppo numerose"
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

	/*
		getBooksFromList è il metodo per ottenere i libri all'interno di una lista
		Prende come parametro obbligatorio il nome della lista 
		e come parametro facoltativo il periodo di pubblicazione (default current)
	*/
	public async getBooksFromList(
		list: string,
		period?: string
	): Promise<BooksList> {
		const url = `${this.NYT_BASE_URL}/lists/${
			period ?? "current"
		}/${list}.json?api-key=${this.NYT_API_KEY}`

		try {
			const response = await axios.get(url)
			return toBooksList(response.data.results)
		} catch (error) {
			console.error(error)
			if (axios.isAxiosError(error)) {
				if (error.response?.status === HttpStatusCode.BadRequest) {
					throw new CustomErrors.BadRequestError("Bad Request from NYT API")
				} else if (error.response?.status === HttpStatusCode.Unauthorized) {
					throw new CustomErrors.UnauthorizedError(
						"Unauthorized Request from NYT API"
					)
				} else if (error.response?.status === HttpStatusCode.NotFound) {
					throw new CustomErrors.NotFoundError("Nessun risultato da NYT API")
				}
			}
			throw new CustomErrors.GenericError(
				"Errore generico nel fetch dei libri."
			)
		}
	}
}
