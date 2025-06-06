import { useState, useEffect } from 'react';

import { NoveltiesAcceptsCount, NoveltiesPendingCount, NoveltiesRejectsCount } from '../../../../API/API';

export const NoveltiesPending = (FullName) => {
    const [nolveltiePending, setNolveltiePending] = useState([]);
    useEffect(() => {
        const getNovelties = async () => {

            try {
                if (FullName && FullName.length > 0) {
                    const Usuario_Red = FullName.map((data) => data.Usuario_Red);
                    const response = await NoveltiesPendingCount(Usuario_Red);
                    const Count = response;
                    setNolveltiePending(Count);
                    setTimeout(() => {
                        getNovelties();
                    }, 10000);
                }
            } catch (error) {
                console.log('Sin resultados');
            }
        }
        getNovelties();
    }, [FullName]);
    return nolveltiePending;
}
export const NoveltiesAccepts = (FullName) => {
    const [nolveltieAccepts, setNolveltieAccepts] = useState([]);
    useEffect(() => {
        const getNoveltiesAccepts = async () => {

            try {
                if (FullName && FullName.length > 0) {
                    const Usuario_Red = FullName.map((data) => data.Usuario_Red);
                    const response = await NoveltiesAcceptsCount(Usuario_Red);
                    const Count = response;
                    setNolveltieAccepts(Count);
                    setTimeout(() => {
                        getNoveltiesAccepts();
                    }, 10000);
                }
            } catch (error) {
                console.log('Sin resultados');
            }
        }
        getNoveltiesAccepts();
    }, [FullName]);
    return nolveltieAccepts;
}
export const NoveltiesRejects = (FullName) => {
    const [nolveltieRejects, setNolveltieRejects] = useState([]);
    useEffect(() => {
        const getNoveltiesAccepts = async () => {

            try {
                if (FullName && FullName.length > 0) {
                    const Usuario_Red = FullName.map((data) => data.Usuario_Red);
                    const response = await NoveltiesRejectsCount(Usuario_Red);
                    const Count = response;
                    setNolveltieRejects(Count);
                    setTimeout(() => {
                        getNoveltiesAccepts();
                    }, 10000);
                }
            } catch (error) {
                console.log('Sin resultados');
            }
        }
        getNoveltiesAccepts();
    }, [FullName]);
    return nolveltieRejects;

}