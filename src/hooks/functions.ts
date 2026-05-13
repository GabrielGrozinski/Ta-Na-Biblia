import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

export async function cadastrarUsuario(email: string, senha: string) {
    try {

        const response = await axios.post(
            'http://localhost:3000/login',
            {email, senha}
        
        );

        console.log('res', response);

    } catch (erro) {
        console.error('Houve um erro', erro);
    }
}

export async function verUsuarioCadastrado(order: string, page: number, search?: string) {
    try {
        const response = await api.get(
            '/login',
            {
                params: {
                    search,
                    limit: 15,
                    page,
                    order,
                    admin: true
                }
            }
        );
        console.log('response', response);
        return response.data;

    } catch (erro) {
        console.error('Houve um erro cadastro', erro);
    }
}

export async function deletarUsuarioCadastrado(id: number) {
    try {
        const response = await axios.delete(`http://localhost:3000/login/${id}`);

        console.log('response', response);

    } catch (erro) {
        console.error('Houve um erro delete', erro);
    }
}

export async function fazerLogin(email: string, senha: string) {
    try {
        const response = await api.post(
            '/login-in',
            {email, senha},
        );

        console.log('response', response);

        return response.data;
    } catch (error) {
        console.error('Houve um erro ao fazer login', error);
    }
}

export async function fazerLogout() {
    try {
        const response = await api.post('/login-out');

        console.log('response', response);

        return response.data;
    } catch (error) {
        console.error('Houve um erro ao fazer login', error);
    }
}

export async function loginAutomatico() {
    try {
        
        const response = await api.post('/login-auto');

        return response.data;

    } catch (error) {
        console.error('Houve um erro', error);
        return null;
    }
}
