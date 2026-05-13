import {z} from "zod";

export const usuarioSchema = z.object({
    nome: z.string().min(3),
    email: z.string().email()
});

export const paramsSchema = z.object({
    id: z.string().transform(value => Number(value))
});

export const usuarioLoginSchema = z.object({
    email: z.string().email(),
    senha: z.string()
});