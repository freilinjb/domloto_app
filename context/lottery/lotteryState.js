import React, {useReducer} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import clienteAxios from '../../config/axios';
// import tokenAuth from '../../config/token';

import lotteryReducer from './lotteryReducer';
import LotteryContext from './lotteryContext';

import {
    OBTENER_LOTERIAS,
    OBTENER_TICKET,
    OBTENER_TICKETS,
    INICIANDO_CONSULTA,
    FINALIZANDO_CONSULTA
} from '../../types';

const LotteryState = props => {

    const initialState = {
        cargandoLoteria: false,
        loterias: [],
        sorteos: [],
        ultimoTicket: [],
        tickets: []
    }

    const [state, dispatch] = useReducer(lotteryReducer, initialState);

    const getTickets = async () => {
        dispatch({
            type: INICIANDO_CONSULTA,
        });

        try {
            await clienteAxios.get('/api/lottery/ticket')
                .then((response) => {
                    console.log('getTickets: ', response);

                    dispatch({
                        type: OBTENER_TICKETS,
                        payload: response.data
                    });
                });
        } catch (error) {
            console.log('error: ', error);
            dispatch({
                type: FINALIZANDO_CONSULTA
            });
        }
    }

    const getSorteos = async () => {

        dispatch({
            type: INICIANDO_CONSULTA,
        });

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

            dispatch({
                type: FINALIZANDO_CONSULTA
            });
        }
    }

    const registrarTicket = async (idUsuario, juegos) => {
        // console.log('state: idUsuario: ', idUsuario);
        // return;
        
        dispatch({
            type: INICIANDO_CONSULTA,
        });

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

                    dispatch({
                        type: OBTENER_TICKET,
                        payload: respuesta.data.datos
                    });
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
                cargandoLoteria: state.cargandoLoteria,
                ultimoTicket: state.ultimoTicket,
                tickets: state.tickets,
                getSorteos,
                registrarTicket,
                getTickets
            }}
        >
            {props.children}
        </LotteryContext.Provider>
    )
}

export default LotteryState;