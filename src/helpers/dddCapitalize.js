const dddCapitalize = ddd => {
	if (ddd) {
		const result = ddd.replace(/(пн|вт|ср|чт|пт|сб|вс)$/gi, string => string
			.toLowerCase()
			.charAt(0)
			.toUpperCase() + string.slice(1))

		return result;
	}
	return ddd
}

export default dddCapitalize
