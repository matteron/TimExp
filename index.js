const stdin = process.openStdin();
const regex = /(\d+:\d+)/gi;

function readTime(input) {
	console.log('---------------------');
	const times = input.toString().match(regex);

	for(let i = 0; i < times.length; i += 2) {
		let time1 = times[i].length < 5 ? '0' + times[i] : times[i];
		let time2 = times[i+1].length < 5 ? '0' + times[i+1] : times[i+1];

		let date1 = new Date(Date.parse('1996-04-12T' + time1));
		let date2 = new Date(Date.parse('1996-04-12T' + time2));

		var hours = (date2 - date1) / 36e5;

		if(hours < 0) {
			date2.setHours( date2.getHours() + 12 );
			var hours = (date2 - date1) / 36e5;
		}

		console.log('[' + time1 + ' - ' + time2 + '] = ', hours);
	}
}

stdin.addListener("data", readTime);