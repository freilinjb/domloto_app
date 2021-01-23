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
                console.log('Desde el token: ', AsyncStorage.getItem('token'));
                console.log('action: ', action.payload);
                return {
                    ...state,
                    token: action.payload.token,
                    autenticado: true,
                    mensaje: null,
                    cargando: false
                }
        case OBTENER_USUARIO:
            console.log('action: OBTENER_USUARIO: ', action.payload);
            return {
                ...state,
                autenticado: true
            }

        case LOGIN_ERROR:
            AsyncStorage.removeItem('token');
            console.log('action: ', action.payload);
            return {
                ...state,
                token: null,
                nombre: null,
                apellido: null,
                usuario: null,
                mensaje: action.payload,
                cargando: false
            }
        default: 
            return state;
    }
    
}