export function resposta(success: boolean, data: any, meta: any, message?: string) {
    const json = {
        success,
        data,
        meta,
        message: message ?? ""
    };

    return json;
}