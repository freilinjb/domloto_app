import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';
import AsyncStorage from '@react-native-community/async-storage';

export default (state, action) => {
    switch(action.type) {
        case LOGIN_EXITOSO:
                AsyncStorage.setItem('token', action.payload.token);
            return {
                ...state,
                autenticado: true,
                mensaje: null,//Muestrar mensaje de advertencia, manejado por el state
                cargando: false
            }
        default: 
            return state;
    }
    
}