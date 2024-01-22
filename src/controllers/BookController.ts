import { Request, Response } from "express"
import NYTServices from "../services/NYTServices"
import GBooksServices from "../services/GBooksServices"
import { HttpStatusCode, CustomErrors } from "../utils"
import { Book } from "../utils/types"

export default class BookController {
	private static NYTservice: NYTServices = NYTServices.getInstance()
	private static GBOOKService: GBooksServices = GBooksServices.getInstance()
	private constructor() {}

	/*
	Controller per Endpoint n.1
	Non prende alcun parametro e restituisce tutte le liste di libri dall'archivio NYT
	*/
	public static async getBooksLists(
		req: Request,
		res: Response
	): Promise<void> {
		console.info("Controller ::: getBookLists started")
		try {
			const lists = await this.NYTservice.getLists()
			res.status(HttpStatusCode.Accepted).json(lists)
		} catch (error: any) {
			res
				.status(error.status || HttpStatusCode.InternalServerError)
				.json({ message: error.message || "Generic error" })
		}
	}

	/*
	Controller per Endpoint n.2
	Prende come parametro obbligatorio la lista dei libri da recuperare,
	come parametro facoltativo il periodo di pubblicazione (default current)
	Restituisce i libri della lista richiesta arricchiti con la preview da GBooks
	*/
	public static async getBooksFromList(
		req: Request,
		res: Response
	): Promise<void> {
		console.info("Controller ::: getBooksFromList started")
		try {
			const listName: string = req.query.listName as string
			const period: string = req.query.period as string

			if (!listName)
				throw new CustomErrors.BadRequestError("Fornire il nome della lista")

			const lists = await this.NYTservice.getBooksFromList(listName, period)

			lists.books = await Promise.all(
				lists.books.map(async (book: Book) => {
					const details = await this.GBOOKService.getBookDetails(
						book.primary_isbn10
					)
					return {
						...book,
						previewLink: details.items[0].volumeInfo.previewLink,
					}
				})
			)

			res.status(HttpStatusCode.Accepted).json(lists)
		} catch (error: any) {
			res
				.status(error.status || HttpStatusCode.InternalServerError)
				.json({ message: error.message || "Generic error" })
		}
	}
}
