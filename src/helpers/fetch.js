import {
	fetchTicketsStart,
	fetchTicketsSuccess,
	fetchTicketsError,
	fetchCurrencyStart,
	fetchCurrencySuccess,
	fetchCurrencyError,
	setCurrencyRates,
	setTickets,
} from "../store/actions";

export const fetchTickets = (url) => (dispatch) => {
	dispatch(fetchTicketsStart());
	fetch(url)
		.then((response) => response.json())
		.then((tickets) => {
			dispatch(fetchTicketsSuccess());
			dispatch(setTickets(tickets));
		})
		.catch(() => dispatch(fetchTicketsError()));
};

export const fetchCurrency = (url) => (dispatch) => {
	dispatch(fetchCurrencyStart());
	fetch(url)
		.then((response) => response.json())
		.then((response) => {
			const { rates } = response;
			dispatch(fetchCurrencySuccess());
			dispatch(setCurrencyRates(rates));
		})
		.catch(() => dispatch(fetchCurrencyError()));
};
