import {
  Check,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import Product from "./Product.model";

@Entity("product_feedbacks")
@Check('"rating" BETWEEN 1 AND 5')
export default class ProductFeedback {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  description: string;

  @Column()
  rating: number;

  @Column({ name: "product_id" })
  productId: string;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
