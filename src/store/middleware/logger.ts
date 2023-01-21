import { Middleware } from "redux";
import { RootState } from "../store";


export const loggerMiddleware: Middleware<{}, RootState> = (store)=> (next) => (action) => {
    if(!action.type){
        return next(action);
    }

    console.log("Type: " , action.type);
    console.log("payload: " , action.payload);
    console.log("currentState: " , store.getState());

    next(action);

    console.log("NextState: " , store.getState());
}