import { HttpStatusCode } from "axios"

export class CustomError extends Error {
	public status: HttpStatusCode

	constructor(status?: HttpStatusCode, message?: string) {
		super(message || "Generic error")
		this.status = status || HttpStatusCode.InternalServerError
		Object.setPrototypeOf(this, CustomError.prototype)
	}
}

export class GenericError extends CustomError {
	constructor(message?: string) {
		super(
			HttpStatusCode.InternalServerError,
			message || "Errore generico del server."
		)
		Object.setPrototypeOf(this, CustomError.prototype)
	}
}

export class ServiceUnavailableError extends CustomError {
	constructor(message?: string) {
		super(
			HttpStatusCode.ServiceUnavailable,
			message || "Servizio temporaneamente non disponibile"
		)
		Object.setPrototypeOf(this, CustomError.prototype)
	}
}

export class NotFoundError extends CustomError {
	constructor(message?: string) {
		super(
			HttpStatusCode.NotFound,
			message || "La risorsa richiesta non è stata trovata."
		)
		Object.setPrototypeOf(this, NotFoundError.prototype)
	}
}

export class BadRequestError extends CustomError {
	constructor(message?: string) {
		super(
			HttpStatusCode.BadRequest,
			message || "Richiesta non valida. Verificare i parametri."
		)
		Object.setPrototypeOf(this, BadRequestError.prototype)
	}
}

export class UnauthorizedError extends CustomError {
	constructor(message?: string) {
		super(
			HttpStatusCode.Unauthorized,
			message || "Accesso non autorizzato. Effettuare l'accesso corretto."
		)
		Object.setPrototypeOf(this, UnauthorizedError.prototype)
	}
}

export class ForbiddenError extends CustomError {
	constructor(message?: string) {
		super(
			HttpStatusCode.Forbidden,
			message ||
				"Accesso vietato. Non si dispone delle autorizzazioni necessarie."
		)
		Object.setPrototypeOf(this, ForbiddenError.prototype)
	}
}

export class TooManyRequestsError extends CustomError {
	constructor(message?: string) {
		super(
			HttpStatusCode.TooManyRequests,
			message || "Troppe richieste, attendere"
		)
		Object.setPrototypeOf(this, TooManyRequestsError.prototype)
	}
}
