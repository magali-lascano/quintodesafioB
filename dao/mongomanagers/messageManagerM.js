import messageModel from "../models/messagesModel.js"

export default class MessagesManager {
  getMessages = async () => {
    try {
      return await messageModel.find().lean().exec();
    } catch (error) {
      return error;
    }
  }

  createMessage = async (message) => {
    try {
      return await messageModel.create(message);
    } catch (error) {
      return error;
    }
  }
}