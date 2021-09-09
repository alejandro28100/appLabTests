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

/** Return the number of the first item in a page depending on a given
 * amount of items per page
 * 
 * Example:
 * 
 * getFirstItem(1,10) => 1
 * 
 * getFirstItem(2,10) => 11
 */
export function getFirstItem(page:number, itemsPerPage: number){
	return page * itemsPerPage - itemsPerPage + 1;
}


/** Return the number of the last item in a page depending on a given
 * amount of items per page
 * 
 * Example:
 * 
 * getLastItem(1,10,100) => 10
 * 
 * getLastItem(2,10,100) => 20
 */
 export function getLastItem(page:number, itemsPerPage: number, totalItems: number){
	return totalItems > itemsPerPage * page
		? itemsPerPage * page
		: totalItems;
}

/** Return a string with the range of items in a page
 * 
 * Example:
 * 
 * getRangeString(1,5) => 1-5
 * 
 * getRangeString(1,1) => 1
 */
export function getRangeString(start:number, end:number) {
	return start === end ? start : `${start}-${end}`
}

/** Rerturn whether theres a next page depending 
 * on the current page , itemsPerPage & the totalItems amount
 * 
 * Example:
 * 
 * nextPageExist(1,5,1) => false
 * nextPageExist(10,5,100) => true
 */
export function nextPageExist(currentPage:number, itemsPerPage:number, totalItems:number) {
	return currentPage * itemsPerPage + itemsPerPage - 1 > totalItems;
}


export 	const fakeAdminUser = {
	name: 'Carlos Sánchez',
	picture:
		'https://images.pexels.com/photos/7252301/pexels-photo-7252301.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
	area: 'Recursos Humanos'
};