import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {AppError} from '../utils/app-error.js';
import { asyncHandler } from "../middlewares/async-handler.js";
import { resposta } from "../utils/resposta.ts";

export const enviarCadastro = asyncHandler(async (req, res, next) => {
    const {email, senha} = req.body;

    if (!email || !senha) {
        throw new AppError("É preciso ter um e-mail e senha válidos", 400);
    }

    const senhaCript = await bcrypt.hash(senha, 10);

    const cadastrado = await pool.query(
        `
            INSERT INTO login
            VALUES ($1, $2)
            RETURNING *
        `,
        [email, senhaCript]
    );

    return res.status(201).json(
        true,
        cadastrado.rows[0],
        {}
    );
});

export const verUsuariosCadastrado = asyncHandler(async (req, res, next) => {
    const {email} = req.user;
    const search = req.query.search || "";
    const limit = Number(req.query.limit) || 5;
    const page = Number(req.query.page) || 1;
    const offset = (page - 1) * limit;
    const order = req.query.order === 'asc' ? 'ASC' : 'DESC';
    console.log('admin', req.query.admin);

    let query = 
    `
        SELECT * FROM login 
        where email != $1 and 
        email ILIKE $2
        ORDER BY id ${order}
        LIMIT $3
        OFFSET $4
    `;
    const values = [email, `%${search}%`, limit, offset];

    const usuarios = await pool.query(query, values);

    if (usuarios.rowCount === 0) {
        throw new AppError("Usuário não encontrado", 404);
    }

    const totalResult = await pool.query(
        `
            SELECT COUNT(*) FROM LOGIN
            WHERE email != $1 and
            email ILIKE $2
        `, 
        [email, `%${search}%`]
    );

    const total = Number(totalResult.rows[0].count);
    const totalPages = Math.ceil(total / limit);

    return res.json(resposta(
        true,
        usuarios.rows,
        {
            totalPages,
            limit,
            page,
            total
        }
    ));

});

export const deletarUsuarioCadastrado = asyncHandler(async (req, res, next) => {
        const id = req.params.id;
        if (!id) {
            throw new AppError("ID faltando", 400);
        }

        const result = await pool.query(
            `
                DELETE FROM login where id = $1
            `,
            [id]
        );

        if (result.rowCount === 0) {
            return res.json(resposta(
                false,
                {},
                {},
                "Nenhum usuário deletado"
            ));
        } else {
            return res.json(resposta(
                false,
                {},
                {},
                "Usuário deletado com sucesso"
            ));
        }

});

export const fazerLogin = asyncHandler(async (req, res, next) => {
    if (!req.user) {
        throw new AppError("Usuário não encontrado", 404);
    }
    let user = {
        id: req.user.id,
        email: req.user.email,
    };
    
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 1000
    });

    return res.json(resposta(
        true,
        user,
        {}
    ));

});

export const fazerLogout = asyncHandler(async (req, res, next) => {
        
    res.cookie("token", "", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: new Date(0)
    });

    res.json(resposta(
        true,
        {},
        {},
        "Usuário deslogado"
    ));

});

export const loginAutomatico = asyncHandler(async (req, res, next) => {

    if (!req.user) {
        throw new AppError("Usuário não encontrado", 404);
    }
    let user = {
        id: req.user.id,
        email: req.user.email,
    };

    return res.json(resposta(
        true,
        user,
        {}
    ));

});