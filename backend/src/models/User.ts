import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity("users")
class User {

  @PrimaryColumn()
  readonly id!: string;

  @Column({ nullable: false })
  nameClientContact!: string;

  @Column({ nullable: false })
  emailContact!: string;

  @Column({ nullable: false })
  telephoneContact!: string;

  @Column({ nullable: false })
  nameFantasyContact!: string;

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: false })
  telephoneCommercial!: string;

  @Column({ nullable: false })
  cnpj!: string;

  @Column()
  cep!: number;

  @Column()
  address!: string;

  @Column()
  district!: string;

  @Column()
  city!: string;

  @Column()
  state!: string;

  @Column({ nullable: false })
  companySize!: string;

  @Column({ nullable: false })
  quantityEmployees!: number;

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { User }