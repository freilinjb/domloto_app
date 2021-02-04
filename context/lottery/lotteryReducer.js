import AsyncStorage from '@react-native-community/async-storage';

import { 
    OBTENER_LOTERIAS,
    INICIANDO_CONSULTA,
    FINALIZANDO_CONSULTA,
    OBTENER_TICKET,
    OBTENER_TICKETS
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
        
        case OBTENER_TICKETS: {
            return {
                ...state,
                tickets: action.payload.data
            }
        }

        case OBTENER_TICKET_API: {
            return {
                ...state,
                ticket: action.payload.data
            }
        }

        case FINALIZANDO_CONSULTA:
            return {
                ...state,
                cargandoLoteria: false
            }
        default:
            return state;
    }
}