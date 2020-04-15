const socketIO = require('socket.io');

const Session = require('./models/Session');
const Message = require('./models/Message');

function socket(server) {
  const io = socketIO(server);

  io.use(async function(socket, next) {
    const { token } = socket.handshake.query;
    if (!token) {
      next(new Error('anonymous sessions are not allowed'));
      return;
    }

    const session = await Session.findOne({ token }).populate('user');
    if (!session) {
      next(new Error('wrong or expired session token'));
      return;
    }

    socket.user = session.user;
    next();
  });

  io.on('connection', function(socket) {
    socket.on('message', async (text) => {
      const message = {
        user: socket.user.displayName,
        date: Date.now(),
        text,
      };
      io.emit('user_message', message);
      await Message.create({
        ...message,
        user: socket.user._id,
      });

    });
  });

  return io;
}

module.exports = socket;
