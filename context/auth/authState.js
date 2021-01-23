import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';
import AsyncStorage from '@react-native-community/async-storage';

const AuthState = props => {

    const initialState = {
        token:  null,
        usuario: null,
        nombre: null,
        apellido: null,
        correo: null
    }

}