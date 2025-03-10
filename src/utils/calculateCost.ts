export const calculateCost = (start: string, end: string) => {
	if (start && end) {
		const diffTime = new Date(end).getTime() - new Date(start).getTime();
		const calculatedDays = Math.max(
			Math.ceil(diffTime / (1000 * 60 * 60 * 24)),
			1
		);
		return { days: calculatedDays, totalCost: calculatedDays * 50 };
	} else {
		return { days: 0, totalCost: 0 };
	}
};
