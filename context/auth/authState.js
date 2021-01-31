import React, {useReducer} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

import authReducer from './authReducer';
import { AuthContext } from './authContext';

import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    INICIANDO_CONSULTA
} from '../../types';


const AuthState = props => {

    const initialState = {
        token: AsyncStorage.getItem('token'),
        autenticado: null,
        usuario: null,//La informacion del usuario
        idUsuario: null,
        nombre: null,
        apellido: null,
        mensaje: null,
        cargando: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const usuarioAutenticado = async (token) => {

        dispatch({
            type: INICIANDO_CONSULTA
        })
        if(token) {
            tokenAuth(`Bearer ${token}`);
        }

        try {
            const resultado = await clienteAxios.get('/api/auth')
            .then((response) => {


                dispatch({
                    type: OBTENER_USUARIO,
                    payload: response.data
                });
            });

            console.log('resultadousuarioAutenticado: ', resultado);

            

        } catch (error) {
            console.log(error);
            dispatch({
                type: LOGIN_ERROR,
                payload: resultado.data.message
            });
        }
    }

    const iniciarSesion = async (usuario, clave) => {

        try {
            console.log('Usuario: ', usuario,'\nClave: ', clave);
            // return;
             const resultado = await clienteAxios.post('/api/auth', {
                 usuario,
                 clave
             });

             console.log('iniciarSesion: ' , resultado);

             if(resultado.data.success === 1) {
                dispatch({
                    type: LOGIN_EXITOSO,
                    payload: resultado.data 
                });
                const token = resultado.data.token;

                await usuarioAutenticado(token);

             } else if(resultado.data.success === 0) {
                console.log('Error: ', resultado);
                dispatch({
                    type: LOGIN_ERROR,
                    payload: resultado.data.message
                });
             }

        } catch (error) {
            console.log(error);
        }
    }

    const cerrarSesion = () => {
        dispatch({
            type:CERRAR_SESION
        });
    }

    const saludar =() => {
        console.log('Hola mundo como estas');
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                idUsuario: state.idUsuario,
                usuario: state.usuario,
                nombre: state.nombre,
                apellido: state.apellido,
                mensaje: state.mensaje,
                cargando: state.cargando,
                iniciarSesion,
                saludar,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;