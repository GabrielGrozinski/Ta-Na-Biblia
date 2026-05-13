import express from 'express';
import { enviarCadastro, verUsuariosCadastrado, deletarUsuarioCadastrado, fazerLogin, fazerLogout, loginAutomatico } from '../controllers/controller-usuario.js';
import { autenticarToken, autenticarBody, autenticarParams, autenticarLogin } from '../middlewares/autenticacao.js';
import { paramsSchema, usuarioLoginSchema } from '../schemas/usuario-schema.js';


const router = express.Router();

router.post('/login', autenticarBody(usuarioLoginSchema), enviarCadastro);

router.get('/login', autenticarToken, verUsuariosCadastrado);

router.delete('/login/:id', autenticarParams(paramsSchema), deletarUsuarioCadastrado);

router.post('/login-in', autenticarLogin, fazerLogin);

router.post('/login-out', fazerLogout);

router.post('/login-auto', autenticarToken, loginAutomatico)

export default router;