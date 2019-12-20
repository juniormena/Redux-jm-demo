const redux = require('redux')
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
//redux-logger es un middleware utilizado para loggear toda la actividad y acciones que pasen en nuestra app
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;
//Action core concepts in redux

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

//esto es llamado un action creator que es una funcion que devuelve el objeto del action
function buyCake(){
 return {
    type:  BUY_CAKE,
    info: 'first redux action'
 }
}

function buyIceCream(){
    return {
       type:  BUY_ICECREAM,
       info: 'second redux action'
    }
   }

/*un action no es mas que un objeto de javascript con una propiedad type como necesaria y que tambien 
puede contener info o payload que es la informacion que puede acompanar a un action*/


//un reducer recibe el state anterior y el action y retorna el nuevo estado de la aplicacion
//(prevState, action) => new State




//utilizando un solo reducer
const initialState={
    numOfCakes:10,
    numOfIceCreams:20
}
const reducer = (state = initialCakeState,action)=>{
    switch(action.type){
        case BUY_CAKE: return {
            ...state,/*con esto le pasamos o hacemos una copia de nuestro state completo y solo cambiamos las propiedades que necesitamos */
            numOfCakes: state.numOfCakes - 1
        }

        case BUY_ICECREAM: return {
            ...state,/*con esto le pasamos o hacemos una copia de nuestro state completo y solo cambiamos las propiedades que necesitamos */
            numOfIceCreams: state.numOfIceCreams - 1
        }

        default: return state
    }
}

//utilizando multiples reducers

const initialCakeState={
    numOfCakes:10
}

const initialIceCreamState={
    numOfIceCreams:20
}

const CakeReducer = (state = initialCakeState,action)=>{
    switch(action.type){
        case BUY_CAKE: return {
            ...state,/*con esto le pasamos o hacemos una copia de nuestro state completo y solo cambiamos las propiedades que necesitamos */
            numOfCakes: state.numOfCakes - 1
        }

        default: return state
    }
}

const IceCreamReducer = (state = initialIceCreamState,action)=>{
    switch(action.type){
        case BUY_ICECREAM: return {
            ...state,/*con esto le pasamos o hacemos una copia de nuestro state completo y solo cambiamos las propiedades que necesitamos */
            numOfIceCreams: state.numOfIceCreams - 1
        }
        default: return state
    }
}

//aqui el store guarda el state que esta en el reducer para asi el estado de nuestra app se guarde en un solo lugar y este puede cambiar cuando se dispatch un accion
const rootReducer = combineReducers({
    cake:CakeReducer,
    iceCream:IceCreamReducer
})

const store = createStore(rootReducer,applyMiddleware(logger));
//console.log('Initial State', store.getState())//getState es para obtener el estado inicial de la app
const unsubscribe= store.subscribe(()=>console.log('updated state',store.getState()))//esto es para obtener el nuevo cambio que se le gizo al state usando el subscribe, esto aparece cada vez que se dispara una accion
store.dispatch(buyCake())
store.dispatch(buyCake())//esto dispara la accion para que cambie el estado de nuestra aplicacion
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()