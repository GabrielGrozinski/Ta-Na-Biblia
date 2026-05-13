import bcrypt from "bcrypt";
import { pool } from "../db.js";
import jwt from 'jsonwebtoken';
import { AppError } from "../utils/app-error.js";

export function autenticarToken(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw new AppError("Token não recebido", 401);
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;
        next();

    } catch (erro) {
        if (erro.name === "TokenExpiredError") {
            throw new AppError("Token expirado", 401);
        }

        throw new AppError("Token inválido", 401);
    }

}

export const autenticarBody = (schema) => (req, res, next) => {
    try {
        const dadosValidados = schema.parse(req.body);
        req.body = dadosValidados;
        next();
    } catch (erro) {
        throw new AppError(erro.message, 400);
    }
}

export const autenticarParams = (schema) => (req, res, next) => {
    try {
        const dadosValidados = schema.parse(req.params);
        req.params = dadosValidados;
        next();
    } catch (error) {
        throw new AppError(error.message, 400);
    }
}

export const autenticarLogin = async (req, res, next) => {
    try {
        const {email, senha} = req.body;

        const usuarioEscolhido = await pool.query(
            `
                SELECT * from login
                where email = $1
            `,
            [email]
        );

        if (usuarioEscolhido.rowCount === 0) {
            throw new AppError("Não há um usuário com este email.", 401);
        }

        const user = usuarioEscolhido.rows[0];

        const senhaValida = await bcrypt.compare(
            senha,
            user.senha
        );

        if (!senhaValida) {
            throw new AppError("Senha inválida!", 403);
        }
        req.user = user;
        next();

    } catch (erro) {
        throw new AppError(erro.message, 400);
    }
}
