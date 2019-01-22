export const dafaultFetchState = () => ({
	fetching: false,
	fetched: false,
	error: false
})
export const startFetchState = () => ({
	fetching: true,
	fetched: false,
	error: false
})
export const successFetchState = () => ({
	fetching: false,
	fetched: true,
	error: false
})
export const errorFetchState = () => ({
	fetching: false,
	fetched: false,
	error: true
})