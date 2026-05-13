import { useState, useContext, createContext, type ReactNode } from "react";

interface ContextTypes {
    valor: number;
    setValor: React.Dispatch<React.SetStateAction<number>>;
}

type Props = {
    children: ReactNode;
}

export const all_context = createContext<ContextTypes>({} as ContextTypes);

export function AllContext({children}: Props) {
    const [valor, setValor] = useState(0);

    return (
        <all_context.Provider value={{
            valor,
            setValor
        }}>
            {children}
        </all_context.Provider>
    )
}

export const todosContext = () => {
    return useContext(all_context);
}