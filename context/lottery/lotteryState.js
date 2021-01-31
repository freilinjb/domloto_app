import React, {useReducer} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import clienteAxios from '../../config/axios';
// import tokenAuth from '../../config/token';

import lotteryReducer from './lotteryReducer';
import LotteryContext from './lotteryContext';

import {
    OBTENER_LOTERIAS
} from '../../types';

const LotteryState = props => {

    const initialState = {
        loterias: [],
        sorteos: []
    }

    const [state, dispatch] = useReducer(lotteryReducer, initialState);

    const getSorteos = async () => {
        
        try {
            const resultados = await clienteAxios.get('/api/lottery')
            .then((response) => {

                console.log('resultadosSorteos: ', response.data.data);

                dispatch({
                    type: OBTENER_LOTERIAS,
                    payload: response.data.data
                });
            });

        } catch (error) {
            console.log('error: ', error);
        }
    }

    const registrarTicket = async (idUsuario, juegos) => {
        // console.log('state: idUsuario: ', idUsuario);
        // return;
        const jugadas_array = [];
        const jugadas_array_temp = [];

        if(juegos.length > 0) {
            juegos.forEach((data) => {
                const { idJuego, tipoJuego, numeros, montos } = data;

                jugadas_array_temp.push({idJuego, tipoJuego, numeros, monto: montos});
            });

            console.log('resultadosJuegos: ', jugadas_array_temp);

            // jugadas_array.push();

            if(jugadas_array_temp.length > 0) {
                clienteAxios.post('/api/lottery/ticket/add',{
                    idUsuario, numeros: jugadas_array_temp
                })
                .then((respuesta) => {
                    console.log('resultadosSorteos: ', respuesta);

                    console.log('respuesta Guardada: ', respuesta);

                    // dispatch({
                    //     type: OBTENER_LOTERIAS,
                    //     payload: respuesta
                    // });
                });
            }

            console.log('Juegos Final:', jugadas_array[0]);
        }
    }

    return (
        <LotteryContext.Provider
            value={{
                loterias: state.loterias,
                sorteos: state.sorteos,
                getSorteos,
                registrarTicket
            }}
        >
            {props.children}
        </LotteryContext.Provider>
    )
}

export default LotteryState;