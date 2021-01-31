import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    INICIANDO_CONSULTA,
    FINALIZANDO_CONSULTA
} from '../../types';
import AsyncStorage from '@react-native-community/async-storage';

export default (state, action) => {
    switch(action.type) {
        case LOGIN_EXITOSO:
                AsyncStorage.setItem('token', action.payload.token.toString());
                // console.log('Desde el token: ', AsyncStorage.getItem('token'));
                // console.log('Desde el 222: ', action.payload.token);
                // console.log('action: ', action.payload);
                return {
                    ...state,
                    token: action.payload.token,
                    autenticado: true,
                    mensaje: null,
                    cargando: false
                }
        case OBTENER_USUARIO:
            // console.log('action: OBTENER_USUARIO: ', action.payload.data);
                // console.log('nombreReducer: ', action.payload.data[0].nombre);
            return {
                ...state,
                autenticado: true,
                nombre: action.payload.data.nombre,
                apellido: action.payload.data.apellido,
                idUsuario:  action.payload.data.idUsuario,
                usuario: action.payload.data.usuario,
                mensaje: null,
                cargando: false
            }

        case INICIANDO_CONSULTA: 
            return { 
                ...state,
                cargando: true
            }

        case LOGIN_ERROR:
            AsyncStorage.removeItem('token');
            // console.log('action: ', action.payload);
            return {
                ...state,
                token: null,
                // nombre: null,
                // apellido: null,
                // usuario: null,
                mensaje: action.payload,
                cargando: false
            }

        case CERRAR_SESION:
            case REGISTRO_ERROR:
            AsyncStorage.removeItem('token');
            return{
                ...state,
                token: null,
                autenticado: null,
                mensaje: action.payload ? action.payload : null,//se maneta con el authState
                cargando: false
            }
        default: 
            return state;
    }
    
}