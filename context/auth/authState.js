import React, {useReducer} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

import authReducer from './authReducer';
import authContext from './authContext';

import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';


const AuthState = props => {

    const initialState = {
        token:  AsyncStorage.getItem('token'),
        autenticado: null,
        usuario: null,//La informacion del usuario
        nombre: null,
        apellido: null,
        mensaje: null,
        cargando: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const iniciarSesion = async (usuario, clave) => {

        try {
            console.log('Usuario: ', usuario,'\nClave: ', clave);
            const data = {
                usuario,
                clave
            }
            console.log('data: ', data);
            // return;
             const resultado = await clienteAxios.post('/api/auth/LogIn/', data);
             console.log('Hola: ', resultado);

        } catch (error) {
            console.log(error);
        }
    }

    const saludar =() => {
        console.log('Hola mundo como estas');
    }

    return(
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                nombre: state.nombre,
                apellido: state.apellido,
                mensaje: state.mensaje,
                cargando: state.cargando,
                iniciarSesion,
                saludar
            }}
        >
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState;