const Message = require('../models/Message');

module.exports = async function messages(ctx, next) {
  const messages = await Message.find({}).populate('user').sort({ date: 1 }).limit(20);

  ctx.body = {
    messages: messages.map(msg => {
      return {
        id: msg._id,
        date: msg.date,
        user: msg.user.displayName,
        text: msg.text,
      };
    }),
  };
};
