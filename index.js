const io = require("./socket/io");
const jsonfile = require("jsonfile");
const path = require("path");

class socket {
	constructor(server) {
		this.io = io(server);
	}
	generateToken() {
		function makeid(length) {
			var result = "";
			var characters =
				"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			var charactersLength = characters.length;
			for (var i = 0; i < length; i++) {
				result += characters.charAt(
					Math.floor(Math.random() * charactersLength)
				);
			}
			return result;
		}

		return makeid(100);
	}
	getIdByToken(token) {
		let files = path.join(__dirname, "connection/io.json");
		let json = jsonfile.readFileSync(files);
		let __data = json.find((el) => el._auth === token);
		if (__data) {
			return {
				socket: {
					id: __data._id,
					_var: __data._auth,
				},
				error: "",
			};
		} else {
			return {
				socket: {},
				error: "socket not found",
			};
		}
	}
}

module.exports = socket;
