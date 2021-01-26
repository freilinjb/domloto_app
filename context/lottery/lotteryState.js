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

    return (
        <LotteryContext.Provider
            value={{
                loterias: state.loterias,
                sorteos: state.sorteos,
                getSorteos
            }}
        >
            {props.children}
        </LotteryContext.Provider>
    )
}

export default LotteryState;