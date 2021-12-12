'use strict';

module.exports = someDateOfTheMonth => {

	const someDateOfTheMonthParsed = new Date(Date.parse(someDateOfTheMonth));

	const startDateParsed = new Date(someDateOfTheMonthParsed.getFullYear(), someDateOfTheMonthParsed.getMonth(), 1);

	const endDateParsed = new Date(someDateOfTheMonthParsed.getFullYear(), someDateOfTheMonthParsed.getMonth() + 1, 0);

	return { startDate: startDateParsed, endDate: endDateParsed };
};
