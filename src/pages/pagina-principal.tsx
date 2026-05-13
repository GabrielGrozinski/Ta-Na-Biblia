import { useEffect, useRef } from "react";
import { observerPersonalizado, observerVerboso, observerContext, observerContextAtualizado } from "../hooks/oberserver-hook";
import { todosContext } from "../context/context";


export default function PaginaPrincipal() {
    const {valor, setValor} = todosContext();
    const divObserver = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        // callback do observer
        const callback: IntersectionObserverCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setValor(1);
                }
            });
        };

        // opções do observer
        const options: IntersectionObserverInit = {
            root: null, // viewport,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(callback, options);

        if (divObserver.current) observer.observe(divObserver.current)

        // cleanup

        return () => observer.disconnect();

    }, []);

    const seen = useRef(false);
    const divObserver2 = observerVerboso<HTMLDivElement>((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !seen.current) {
                seen.current = true;
                setValor(2);
            }
        })
    }, {
        threshold: 0.5,
    });

    const divObserver3 = observerPersonalizado<HTMLDivElement>({threshold: 0.8});
    useEffect(() => {
        if (divObserver3.isVisivel) {
                setValor((v: number) => v + 1);
        }
    }, [divObserver3.isVisivel]);

    const divObserver4 = observerContext<HTMLDivElement>(true, {threshold: 0.5});

    
    const divUnicaObserver = useRef<HTMLDivElement | null>(null);
    const divObserver5 = observerContextAtualizado<HTMLDivElement>(0, false, {root: divUnicaObserver.current});

    return (
        <div className="min-h-screen bg-slate-800 flex flex-col justify-end pb-10 items-center">
            <h1 className="text-6xl text-white fixed top-2 left-1/2 -translate-x-1/2">{valor}</h1>
            <div ref={divObserver} className="mt-[120vh] min-h-80 min-w-[90%] bg-red-900">
                <h1 className="text-4xl text-white">Vira 1</h1>
            </div>
            <div ref={divObserver2} className="mt-30 min-h-80 min-w-[90%] bg-blue-900">
                <h1 className="text-4xl text-white">Vira 2</h1>
            </div>
            <div ref={divObserver3.ref} className="mt-30 min-h-80 min-w-[90%] bg-green-900">
                <h1 className="text-4xl text-white">Aumenta 1</h1>
            </div>
            <div ref={divObserver4} className="mt-30 min-h-80 min-w-[90%] bg-yellow-900">
                <h1 className="text-4xl text-white">Aumenta 2</h1>
            </div>
            <div ref={divUnicaObserver} className="mt-30 min-h-80 min-w-[90%] bg-orange-900 max-h-80 overflow-y-auto">
                <h1 ref={divObserver5} className="mt-150 text-center text-6xl text-white">Diminui até 0</h1>
            </div>

        </div>
    )
}
