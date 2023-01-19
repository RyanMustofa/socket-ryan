const socketio = require("socket.io");
const { verifySocketToken, socketUtility } = require("../secure");

function socket(server) {
	let io = socketio(server, {
		cors: {
			origin: "*",
		},
	});

	io.sockets.on("connection", async (socket) => {
		console.log("Connected User " + socket.id);
		await verifySocketToken(socket, socketUtility);
	});

	return io;
}

module.exports = socket;
