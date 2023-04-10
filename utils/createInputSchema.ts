import * as z from "zod";

export const createInputSchema = () => {
  return z.object({
    name: z.string().min(1, { message: "入力必須の項目です。" }).optional(),
    email: z
      .string()
      .min(1, { message: "入力必須の項目です。" })
      .email({ message: "メールアドレスの形式ではありません。" }),
    password: z
      .string()
      .min(8, { message: "8文字以上入力してください。" })
      .optional(),
  });
};
