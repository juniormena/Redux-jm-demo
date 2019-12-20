//aqui vamos a crear acciones asincronas que son utilizadas cuando queremos llamar datos desde una api
const redux = require('redux');
const createstore = redux.createStore;
const applyMiddleware =  redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios')
//state
const initialState = {
    loading:false,
    users:[],
    error:''
}

//actions

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_SUCCESS'

//con esta accion ponemos que loading true porque si esta llamando lo datos
function fetchUsersRequest(){
    return {type:FETCH_USERS_REQUEST}
}
//con esta accion decimos que lo datos fueron obtenidos bien y ponenmos loading en false
function fetchUsersSuccess(users){
    return {type:FETCH_USERS_SUCCESS, payload:users}
}
//aqui cambiamos el estado del error trayendo el error que nos mandaron desde la api
function fetchUsersFailure(error){
    return {type:FETCH_USERS_FAILURE, payload:error}
}

const reducer = (state= initialState, action)=>{
    switch(action.type){
        case FETCH_USERS_REQUEST: return { 
            ...state,
            loading:true
        }
        case FETCH_USERS_SUCCESS: return {
            loading:false,
            users:action.payload,
            error:''
        }
        case FETCH_USERS_FAILURE: return{
            loading:false,
            users:[],
            error:action.payload         
        }
    }

}
//redux thun nos permite que en un action creator podamos retornaunafuncion en evez de un action object
//esta accion permite disparar acciones acciones porque recibe el dispath metodo como uno de sus argumentos
const fetchUsers = ()=>{
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get('https://jsonlaceholder.typicode.com/users')
        .then(response=>{
            //response.data es el array of users
            //map se utiliza para devolver lo que yo desee
            const users = response.data.map((user)=> user.id);
            dispatch(fetchUsersSuccess(users));
        })
        .catch(error=>{
            //error.message tiene el mensaje de error
            dispatch(fetchUsersFailure(error.message));
        })
    }
}

const store = createstore(reducer,applyMiddleware(thunkMiddleware));
store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchUsers())
