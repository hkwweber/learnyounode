

// module.exports = function() {
// 	fs.readdir(process.argv[2], (err, list, cb) => {
// 		if (err) throw err;
// 		cb(null, list);
// 		// console.log(
// 		// 	list.filter(el => el.indexOf("." + process.argv[3]) > -1).join("\n")
// 		// );
// 	});
// };


// EXERCISE: MAKE IT MODULAR
const fs = require('fs');
const readAsync = (dirrr, ext, cb) => {

	fs.readdir(dirrr.toString(), (err, list) => {
		if (err) return cb(err);
		let filteredList = list.filter(fileName => fileName.indexOf(`.${ext}`) > -1)
		cb(null, filteredList);
	})
}

module.exports = readAsync;
