import { AppDataSource } from "../db/datasource";
// import * as MUser from "../models/user.model";
import { User } from "../entities/User";
import DatabaseError from "../models/errors/database.error.model";

class UserRepository {
  UserRepo = AppDataSource.getRepository(User);

  async findAllUsers(): Promise<User[]> {
    try {
      const result = await this.UserRepo.find();
      return result || [];
    } catch (error) {
      console.error(error);
      throw new DatabaseError("Erro na consulta por id", error);
    }
  }

  async findById(id: number): Promise<User | null> {
    try {
      const result = await this.UserRepo.findOneBy({ id });
      return result;
    } catch (error) {
      throw new DatabaseError("Erro na consulta por id", error);
    }
  }

  async findByUsernameAndPassword(username: string, password: string): Promise<User | null> {
    try {
      const result = await this.UserRepo.findOneBy({ username, password });

      return result || null;
    } catch (error) {
      throw new DatabaseError("Erro na consulta por username e password", error);
    }
  }

  async create(user: User): Promise<string> {
    try {
      const userToCreate = new User();
      userToCreate.email = user.email;
      userToCreate.username = user.username;
      userToCreate.password = user.password;

      const result = await this.UserRepo.save(userToCreate);
      return result.id?.toString() || "";
    } catch (error) {
      console.error(error);
      throw new DatabaseError("Erro na consulta por id", error);
    }
  }

  async update(user: User): Promise<void> {
    try {
      const userToUpdate = await this.findById(user.id);
      if (!userToUpdate) throw new DatabaseError("Id de usuário não encontrado", null);

      userToUpdate.email = user.email;
      userToUpdate.username = user.username;
      userToUpdate.password = user.password;

      await this.UserRepo.save(userToUpdate);
    } catch (error) {
      throw new DatabaseError("Erro na consulta por id", error);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.UserRepo.delete(id);
    } catch (error) {
      throw new DatabaseError("Erro na consulta por id", error);
    }
  }
}

export default new UserRepository();
