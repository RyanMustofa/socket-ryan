const jsonfile = require("jsonfile");
const path = require("path");

async function verifySocketToken(socket, cb) {
	let token = socket?.request?.headers?.bearertoken;
	if (
		token !== undefined &&
		token !== null &&
		token !== "" &&
		token !== 0 &&
		token !== "0" &&
		token !== "null" &&
		token !== "undefined"
	) {
		await cb(socket, token);
	} else {
		console.error("token not found");
	}
}

async function socketUtility(socket, token) {
	let files = path.join(__dirname, "../connection/io.json");
	let json = jsonfile.readFileSync(files);

	let _dat = json.find((el) => el._auth === token);

	if (_dat) {
		let index = json.findIndex((el) => el._auth === _dat._auth);
		let data = [...json];
		data[index] = {
			...data[index],
			_id: socket.id,
		};
		jsonfile.writeFileSync(files, data);
		console.log("exist", _dat);
	} else {
		console.log("no", json);
		let data = [...json];
		data.push({
			_id: socket.id,
			_auth: token,
		});
		jsonfile.writeFileSync(files, data);
	}
}

module.exports = {
	verifySocketToken,
	socketUtility,
};
