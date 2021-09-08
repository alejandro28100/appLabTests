/** Return the complete name of a user from a nested object */
export function getName(user: any) {
	if (!user) return '';
	const { first, last } = user.name;
	return `${first} ${last}`;
}
/** Return a boolean randomly */
export function getRandomStatus() {
	return !!Math.floor(Math.random() * 2);
}