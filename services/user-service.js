const userRepository = require("../repositories/user-repository");

class UserService {
  async saveUser(user) {
    const savedUser = await userRepository.saveUser(user);
    return savedUser;
  }

  async getUsers() {
    const users = await userRepository.getUsers();
    return users;
  }

  async getOneUser(id) {
    const user = await userRepository.getOneUser(id);
    return user;
  }

  async getOneUserByEmail(email) {
    const user = await userRepository.getOneUserByEmail(email);
    return user;
  }

  async updateUser(user) {
    const updatedUser = await userRepository.updateUser(user);
    return updatedUser;
  }

  async deleteUser(id) {
    const deletedUser = await userRepository.deleteUser(id);
    return deletedUser;
  }
}

module.exports = new UserService();
