import { useCallback, useEffect, useRef, useState } from "react";
import { todosContext } from "../context/context";

export function observerVerboso<T extends HTMLElement>(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
) {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(callback, options);

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, [callback, options]);

    return ref;
}

export function observerPersonalizado<T extends HTMLElement>(
    options?: IntersectionObserverInit
) {
    const ref = useRef<T | null>(null);
    const [isVisivel, setIsVisivel] = useState(false);
    const visto = new Set<Element>();

    useEffect(() => {

        const callback: IntersectionObserverCallback = (entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !visto.has(entry.target)) {
                    visto.add(entry.target);
                    setIsVisivel(true);
                }
            });
        });

        const observer = new IntersectionObserver(callback, options);

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();

    }, [options]);

    return { ref, isVisivel }
}

export function observerContext<T extends HTMLElement>(
    triggerOnce: boolean,
    options?: IntersectionObserverInit
) {
    const ref = useRef<T | null>(null);
    const visto = useRef(false);
    const {setValor} = todosContext();

    useEffect(() => {
        const callback: IntersectionObserverCallback = (entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !visto.current) {
                    setValor(v => v + 2);
                    if (triggerOnce) visto.current = true;
                }
            })
        });

        const observer = new IntersectionObserver(callback, options);

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();

    }, [options, triggerOnce]);

    return ref;
}

export function observerContextAtualizado<T extends HTMLElement>(
    value: number,
    triggerOnce: boolean,
    options?: IntersectionObserverInit
) {
    const ref = useRef<T | null>(null);
    const visto = useRef(false);
    const {setValor, valor} = todosContext();

    useEffect(() => {
        const callback: IntersectionObserverCallback = (entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !visto.current) {
                    visto.current = triggerOnce;
                    setTimeout(() => {
                        valor > 0 && setValor(v => v - 1)
                    }, 1000);
                }
            })
        });

        const observer = new IntersectionObserver(callback, options);

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();

    }, [value, options]);

    return ref;
}

export function observerLista<T extends HTMLElement>() {
    const [value, setValue] = useState(false);

    const ref = useCallback((node: T | null) => {
        const callback: IntersectionObserverCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setValue(true);
            });
        }

        const options: IntersectionObserverInit = {
            threshold: 0.1,
            root: null,
        }

        const observer = new IntersectionObserver(callback, options);

        if (node) observer.observe(node);

        return () => observer.disconnect();
    }, []);

    return {ref, value};
}