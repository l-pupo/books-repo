import { List, BooksList, Book, Ibsns, BuyLink } from "../../types"
import { CustomErrors } from "../.."

// Funzione che crea un array di oggetti tipo Lista
export const toListsArray = (lists: any[]): List[] =>
	lists.map((list) => toListsItem(list))

// Convertitore che costruisce l'oggetto lista singola dalla risposta
const toListsItem = (list: any): List => {
	if (
		list.list_name == undefined ||
		list.display_name == undefined ||
		list.list_name_encoded == undefined ||
		list.oldest_published_date == undefined ||
		list.newest_published_date == undefined ||
		list.updated == undefined
	) {
		throw new CustomErrors.CustomError(500, "Errore di validazione dei dati")
	}

	return {
		list_name: list.list_name,
		display_name: list.display_name,
		list_name_encoded: list.list_name_encoded,
		oldest_published_date: list.oldest_published_date,
		newest_published_date: list.newest_published_date,
		updated: list.updated,
	}
}

// Funzione che valida i dati dei BuyLinks e ne costruisce un oggetto
const toBuyLinksItem = (buyLink: any): BuyLink => {
	if (buyLink.name == undefined || buyLink.url == undefined) {
		throw new CustomErrors.CustomError(
			500,
			"Errore di validazione dei dati dei buyLinks"
		)
	}
	return {
		name: buyLink.name,
		url: buyLink.url,
	}
}

// Funzione che valida i dati degli isbns e ne costruisce un oggetto
const toIsbnsItem = (isbns: any): Ibsns => {
	if (isbns.isbn10 == undefined || isbns.isbn13 == undefined) {
		throw new CustomErrors.CustomError(
			500,
			"Errore di validazione dei dati dei isbns"
		)
	}

	return {
		isbn10: isbns.isbn10,
		isbn13: isbns.isbn13,
	}
}

// Funzione che valida i dati e costruisce l'oggetto libro
const toBooksListItem = (book: any): Book => {
	if (
		book.book_uri == undefined ||
		book.buy_links == undefined ||
		book.isbns == undefined ||
		book.rank == undefined ||
		book.rank_last_week == undefined ||
		book.weeks_on_list == undefined ||
		book.asterisk == undefined ||
		book.dagger == undefined ||
		book.primary_isbn10 == undefined ||
		book.primary_isbn13 == undefined ||
		book.publisher == undefined ||
		book.description == undefined ||
		book.price == undefined ||
		book.title == undefined ||
		book.author == undefined ||
		book.contributor == undefined ||
		book.contributor_note == undefined ||
		book.book_image == undefined ||
		book.book_image_width == undefined ||
		book.book_image_height == undefined ||
		book.amazon_product_url == undefined ||
		book.age_group == undefined ||
		book.book_review_link == undefined ||
		book.first_chapter_link == undefined ||
		book.sunday_review_link == undefined ||
		book.article_chapter_link == undefined
	) {
		throw new CustomErrors.CustomError(
			500,
			"Errore di validazione dei dati del libro"
		)
	}

	return {
		book_uri: book.book_uri,
		buy_links: book.buy_links.map((buyLink: any) => toBuyLinksItem(buyLink)),
		isbns: book.isbns.map((isbn: any) => toIsbnsItem(isbn)),
		rank: book.rank,
		rank_last_week: book.rank_last_week,
		weeks_on_list: book.weeks_on_list,
		asterisk: book.asterisk,
		dagger: book.dagger,
		primary_isbn10: book.primary_isbn10,
		primary_isbn13: book.primary_isbn13,
		publisher: book.publisher,
		description: book.description,
		price: book.price,
		title: book.title,
		author: book.author,
		contributor: book.contributor,
		contributor_note: book.contributor_note,
		book_image: book.book_image,
		book_image_width: book.book_image_width,
		book_image_height: book.book_image_height,
		amazon_product_url: book.amazon_product_url,
		age_group: book.age_group,
		book_review_link: book.book_review_link,
		first_chapter_link: book.first_chapter_link,
		sunday_review_link: book.sunday_review_link,
		article_chapter_link: book.article_chapter_link,
	}
}

// Funzione che valida i dati e costruisce l'oggetto lista di libri
export const toBooksList = (booksList: any): BooksList => {
	if (
		booksList.list_name == undefined ||
		booksList.list_name_encoded == undefined ||
		booksList.bestsellers_date == undefined ||
		booksList.published_date == undefined ||
		booksList.published_date_description == undefined ||
		booksList.previous_published_date == undefined ||
		booksList.display_name == undefined ||
		booksList.normal_list_ends_at == undefined ||
		booksList.updated == undefined ||
		booksList.corrections == undefined ||
		booksList.books == undefined
	) {
		throw new CustomErrors.CustomError(
			500,
			"Errore di validazione dei dati della lista dei libri"
		)
	}

	return {
		listDetails: {
			list_name: booksList.list_name,
			list_name_encoded: booksList.list_name_encoded,
			bestsellers_date: booksList.bestsellers_date,
			published_date: booksList.published_date,
			published_date_description: booksList.published_date_description,
			next_published_date: booksList.next_published_date,
			previous_published_date: booksList.previous_published_date,
			display_name: booksList.display_name,
			normal_list_ends_at: booksList.normal_list_ends_at,
			updated: booksList.updated,
			corrections: booksList.corrections,
		},
		books: booksList.books.map((book: any) => toBooksListItem(book)),
	}
}
