import { AppDataSource } from "../db/datasource";
// import * as MUser from "../models/user.model";
import { User } from "../entities/User";
import DatabaseError from "../models/errors/database.error.model";
import ForbiddenError from "../models/errors/forbidden.error.model";

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

  async findByEmailAndPassword(email: string, password: string): Promise<User | null> {
    try {
      const result = await this.UserRepo.findOneBy({ email });
      if (!result) throw new DatabaseError("Email não encontrado", { message: "Email não encontrado" });
      const passIsRight = await User.comparePasswords(password, result.password);
      if (!passIsRight) throw new DatabaseError("Senha incorreta", { message: "Senha incorreta" });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async create(user: User): Promise<string> {
    try {
      const userToCreate = new User();
      userToCreate.name = user.name;
      userToCreate.email = user.email;
      userToCreate.password = user.password;

      const result = await this.UserRepo.save(userToCreate);
      return result.id?.toString() || "";
    } catch (error: any) {
      console.error(error);
      throw new DatabaseError("Erro na consulta por id", error.detail);
    }
  }

  async update(user: User): Promise<void> {
    try {
      const userToUpdate = await this.findById(user.id);
      if (!userToUpdate) throw new DatabaseError("Id de usuário não encontrado", null);

      userToUpdate.email = user.email;
      userToUpdate.email = user.email;
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
