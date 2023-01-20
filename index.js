const io = require("./socket/io");
const jsonfile = require("jsonfile");
const path = require("path");

class socket {
	constructor(server) {
		this.io = io(server);
		this.socketID = null;
	}
	send(event, data) {
		if (event && data) {
			if (!this.socketID) {
				return {
					status: "failed",
					success: false,
					message: "socket id not found",
				};
			}
			let files = path.join(__dirname, "connection/io.json");
			let json = jsonfile.readFileSync(files);
			let findData = json.find((el) => el._auth === this.socketID);
			if (!findData) {
				return {
					status: "failed",
					success: false,
					message: "socket not found in list socket",
				};
			}
			let soc = this.io.sockets.sockets;
			if (soc.get(findData._id)) {
				soc.get(findData._id).emit(event, data);
				return {
					status: "success",
					success: true,
					message: "message send",
				};
			}
			return {
				status: "failed",
				success: false,
				message: "socket not found in list connected",
			};
		}
		return {
			status: "failed",
			success: false,
			message: "event or data not in",
		};
	}
	to(auth) {
		this.socketID = auth;
		return {
			send: (event, data) => this.send(event, data),
		};
	}
	broadcast(event, data) {
		let files = path.join(__dirname, "connection/io.json");
		let json = jsonfile.readFileSync(files);
		json.map((el) => {
			this.to(el._auth).send(event, data);
		});
		return {
			status: "success",
			success: true,
			message: "Success Broadcast message",
		};
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
