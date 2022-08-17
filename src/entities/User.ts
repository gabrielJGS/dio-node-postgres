import { Entity, Column, Index, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import bcrypt from "bcryptjs";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @Index("email_index")
  @Column({
    unique: true,
  })
  email!: string;
  @Column()
  password!: string;
  @Column()
  isAdmin: boolean = false;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  // 👇 Validate password
  static async comparePasswords(candidatePassword: string, hashedPassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}
