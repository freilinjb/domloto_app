import AsyncStorage from '@react-native-community/async-storage';

import { 
    OBTENER_LOTERIAS
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case OBTENER_LOTERIAS:
            return {
                ...state,
                sorteos: action.payload
            }
        default:
            return state;
    }
}