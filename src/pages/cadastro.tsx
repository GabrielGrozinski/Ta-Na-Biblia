import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import "../styles/login.css";
import { cadastrarUsuario , verUsuarioCadastrado, deletarUsuarioCadastrado, fazerLogin, fazerLogout} from '../hooks/functions';
import { observerLista } from '../hooks/oberserver-hook';


export default function LoginLayout() {
    const [loading, setLoading] = useState<boolean>(false);
    setLoading(false);
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [id, setId] = useState<string>('');
    setId('');
    const observer_lista_1 = observerLista<HTMLDivElement>();
    const observer_lista_2 = observerLista<HTMLDivElement>();
    const [busca, setBusca] = useState<string>('');
    const [limite, setLimite] = useState<number>(1);
    const [ordem, setOrdem] = useState<string>('asc');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [usuarios, setUsuarios] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const [totalPages, setTotalPages] = useState<number | null>(null);


    return (
        <main style={{background: "radial-gradient(circle at center, #cfd9ff 0%, #9fb3ff 40%, #6f8df5 100%)"}} className='cadastro-screen flex flex-col' id="imagem">

        <div className="fixed top-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
            <input
            onChange={(e) => setLimite(Number((e.currentTarget.value).trim()))} 
            type='number'
            onKeyDown={(e) => {
                if (e.key === 'Enter') false;
            }}
            className="input cadastro-screen" 
            placeholder="Página" />
            <h1 className='mt-4 text-2xl'>{totalPages}</h1>
        </div>
        
        <div className="fixed right-0 top-1/2 bg-white -translate-y-1/2">
            <input
            onChange={() => setOrdem(prev => prev === 'asc' ? 'desc' : 'asc')} 
            type='checkbox'
            className="input cadastro-screen" 
            placeholder="Página" />
        </div>

        <div 
        style={{background: "linear-gradient(180deg,#f2f4fa 0%,#b3c4f9 100%)", boxShadow: "0 25px 60px #0000004a"}}
        className='absolute top-1/2 left-1/2 -translate-1/2 p-6 pt-2 rounded-2xl flex flex-col items-center justify-center outline-5 outline-white/70 scale-90 lg:scale-100'>
            <div className="form-container cadastro-screen">
                <form className="form cadastro-screen">

                    <input
                    onChange={(e) => setEmail((e.currentTarget.value).trim().toLocaleLowerCase())} 
                    type="email" 
                    className={`input cadastro-screen mt-8`} 
                    placeholder="Email" />

                    <div className="relative mb-2">
                        <input
                        onChange={(e) => setSenha((e.currentTarget.value).trim())} 
                        type={mostrarSenha ? 'text' : 'password'}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') false;
                        }}
                        className="input cadastro-screen" 
                        placeholder="Senha" />
                        <i onClick={() => setMostrarSenha(!mostrarSenha)} className={`fa-regular ${mostrarSenha ? 'fa-eye-slash' : 'fa-eye'} text-gray-600 cursor-pointer absolute top-1/2 right-4 -translate-y-1/2`}></i>
                    </div>

                    <div className="relative mb-5">
                        <input
                        onChange={(e) => setBusca((e.currentTarget.value).trim())} 
                        type='text'
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') false;
                        }}
                        className="input cadastro-screen" 
                        placeholder="Busca" />
                    </div>

                    {!loading ? (
                        <input
                        onClick={(e) => {
                            e.preventDefault();
                            cadastrarUsuario(email, senha);
                        }}
                        value="Cadastrar"
                        type='button'
                        className="form-btn cadastro-screen"/>
                    ) : (
                        <ClipLoader className='self-center' color='#000' loading size={35} />
                    )
                    }

                    {!loading ? (
                        <input
                        onClick={(e) => {
                            e.preventDefault();
                            deletarUsuarioCadastrado(Number(id));
                        }}
                        value="Deletar usuário"
                        type='button'
                        className="form-btn cadastro-screen"/>
                    ) : (
                        <ClipLoader className='self-center' color='#000' loading size={35} />
                    )
                    }

                    {!loading ? (
                        <input
                        onClick={(e) => {
                            e.preventDefault();
                            fazerLogout();
                        }}
                        value="Fazer logout"
                        type='button'
                        className="form-btn cadastro-screen"/>
                    ) : (
                        <ClipLoader className='self-center' color='#000' loading size={35} />
                    )
                    }

                </form>

                <div className='min-h-6 max-h-6 grid grid-cols-[1fr_auto_1fr] max-w-110 min-w-full sm:min-w-78 my-4'>
                    <span className='col-1 max-h-px translate-y-3.5 bg-slate-800/10'>
                    </span>
                    <span className='col-2 mx-1 text-slate-800/70'>ou</span>
                    <span className='col-3 max-h-px bg-slate-800/10 translate-y-3.5'>
                        <span></span>
                    </span>
                </div>

                <div className="buttons-container cadastro-screen">
                    <button
                    onClick={async () => {
                        const userLogin = await fazerLogin(email, senha);
                        setUser(userLogin);
                    }} 
                    className="gsi-material-button">
                        <div className="gsi-material-button-state"></div>
                        <div className="gsi-material-button-content-wrapper">
                            <div className="gsi-material-button-icon">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" className="block;">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </svg>
                            </div>
                            <span className="gsi-material-button-contents">Continuar com Google</span>
                            <span className="hidden">Continuar com Google</span>
                        </div>
                    </button>
                    {/* Google */}
                    
                </div>

                <p className="sign-up-label cadastro-screen">
                    Já tem uma conta?
                    <span
                    onClick={async (e) => {
                        e.preventDefault();
                        const result = await verUsuarioCadastrado(ordem, limite, busca);
                        const user = result.data;
                        setTotalPages(result.meta.totalPages);
                        setUsuarios(user);
                    }}
                    className="sign-up-link cadastro-screen hover:underline">
                        Faça login
                    </span>
                </p>
            </div>
        </div>
        
        {user &&
        <div className='min-h-100 min-w-100 bg-slate-300 flex flex-col absolute max-h-100 max-w-100 left-4 top-1/2 -translate-y-1/2 overflow-x-hidden px-2'>
                <div className='bg-slate-200 overflow-x-auto rounded-md my-2 py-2 flex justify-between px-4 relative pb-10'>
                    <h1>
                        {user.id} - {user.email}
                    </h1>
                </div>
        </div>
        }

        {usuarios &&
        <div className='min-h-100 mt-[100vh] bg-slate-300 flex flex-col max-h-300 gap-10'>
            {usuarios.map((user: any, index: number) => {
                const refAtual = 
                    index === 9 ?
                        observer_lista_2.ref
                    :
                    index === 4 ?
                        observer_lista_1.ref
                    :
                        null;
                
                return (
                    ((index < 5) || ((index >= 5 && index < 10) && observer_lista_1.value) || (index >= 10 && observer_lista_2.value)) &&
                    <div ref={refAtual} key={index} className={`${refAtual !== null ? 'bg-red-400' : 'bg-slate-200'} min-h-30 overflow-x-auto rounded-md my-2 py-2 flex justify-between px-4`}>
                        <h1>
                            {user.id} - {user.email}
                        </h1>
                    </div>
                );
            })}
        </div>
        }
        </main>
    );
}
