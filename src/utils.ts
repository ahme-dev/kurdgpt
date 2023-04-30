export function getToday(): string {
	const d = new Date();
	const dateString = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
	return dateString;
}
