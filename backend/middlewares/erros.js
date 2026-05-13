export async function errorMD(err, req, res, next) {
    console.error('Houve um erro', err);

    const statusErro = err.statusCode || 500;
    const mensagemErro = err.message || "Erro interno";

    res.status(statusErro).json({
        error: mensagemErro
    });
}