const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];

var filters = exports;

filters.formatDate = function(date) {
	if(typeof date != 'undefined') {
		//make it a Date if it's not
		if( !(date instanceof Date) ) {
			date = new Date(date);
		}
		return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
	}
	else {
		return '';
	}
};