import express, { Response, Request } from "express"
import { BookController } from "../controllers"

const router = express.Router()

// Health check
router.get("/health", async (req: Request, res: Response) => {
	res.status(200).json({ message: "Hello world, everything's good!" })
})

/* Endpoint n.1
	Non prende alcun parametro e restituisce tutte le liste di libri dall'archivio NYT
*/
router.get("/getBooksLists", (req: Request, res: Response) => {
	BookController.default.getBooksLists(req, res)
})

/* Endpoint n.2
	Prende come parametro obbligatorio la lista dei libri da recuperare,
	come parametro facoltativo il periodo di pubblicazione (default current)
	Restituisce i libri della lista richiesta arricchiti con la preview da GBooks
*/
router.get("/getBooksFromList", (req: Request, res: Response) => {
	BookController.default.getBooksFromList(req, res)
})

export default router
