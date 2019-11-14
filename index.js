const readline = require('readline');
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var buffer = [];

const regex = /(\d+:\d+)/gi;
const lunchEx = /(\[\d+:\d+ - \d+:\d+\] Lunch)/gi;

function readTime(input) {
	console.log('');
	const convertedInput = input.toString();
	const times = convertedInput.match(regex);
	if (!times) {
		return;
	}

	const lunchEntries = convertedInput.match(lunchEx);

	var total = 0;

	for(let i = 0; i < times.length; i += 2) {
		var hours = 0;
		var isLunch = lunchEntries && lunchEntries.some(l => l === '[' + times[i] + ' - ' + times[i+1] + '] Lunch');
		
		let time1 = times[i].length < 5 ? '0' + times[i] : times[i];
		let time2 = times[i+1].length < 5 ? '0' + times[i+1] : times[i+1];

		let date1 = new Date(Date.parse('1996-04-12T' + time1));
		let date2 = new Date(Date.parse('1996-04-12T' + time2));

		hours = (date2 - date1) / 36e5;

		if(hours < 0) {
			date2.setHours( date2.getHours() + 12 );
			hours = (date2 - date1) / 36e5;
		}

		total += (isLunch ? (-1 * hours) : hours);
	}

	console.log('Total: ' + total);
}

rl.on('line', (cmd) => {
	buffer.push(cmd);
});

rl.on('close', (cmd) => {
	readTime(buffer.join('\n'));
});

rl.prompt();