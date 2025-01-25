import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;
/* Şemayı hazırladığın gibi git blog modul kısmına import */

@Schema()
export class Blog {
  @Prop()
  title: string;

  @Prop()
  content: string;

  
  @Prop()
  sharedBy: string; /* buraya kulanıcının emailini koyalım */

  @Prop()
  userId: string; /* buraya kulanıcının id sini koyalım */
}
export const BlogSchema = SchemaFactory.createForClass(Blog);
