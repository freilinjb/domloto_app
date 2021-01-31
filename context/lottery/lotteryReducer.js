import AsyncStorage from '@react-native-community/async-storage';

import { 
    OBTENER_LOTERIAS,
    INICIANDO_CONSULTA,
    OBTENER_TICKET
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case OBTENER_LOTERIAS:
            return {
                ...state,
                sorteos: action.payload,
                cargandoLoteria: false
            }

        case INICIANDO_CONSULTA:
            return {
                ...state,
                cargandoLoteria: true
            }

        case OBTENER_TICKET: 
            return {
                ...state,
                ultimoTicket: action.payload
            }
        default:
            return state;
    }
}