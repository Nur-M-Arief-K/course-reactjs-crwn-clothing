import { AnyAction } from "redux";

//TYPE DECLARATION
type Matchable<AC extends () => AnyAction> = AC & {
    type: ReturnType<AC>["type"];
    match(action: AnyAction): action is ReturnType<AC>;
};

//THE EXPECTED RESULT OF withMatcher FUNCTION
export function withMatcher<AC extends () => AnyAction & {type: string}>(actionCreator: AC): Matchable<AC>;

export function withMatcher<AC extends (...args: any[]) => AnyAction & {type: string}>(actionCreator: AC): Matchable<AC>;

//THE REAL FUNCTION
export function withMatcher(actionCreator: Function) {
    const type = actionCreator().type;
    return Object.assign(actionCreator, {
        type,
        match(action: AnyAction){
            return action.type === type;
        }

    })
};

//KINDA PROTOTYPE TYPE DECLARATION
export type ActionWithPayload<T, P> = {
    type: T,
    payload: P
};

export type Action<T> = {
    type: T
};

//PRESUPPOSES HOW THE RESULT LOOKS LIKE
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

export function createAction<T extends string>(type: T, payload: void): Action<T>;

//THE REAL FUNCTION
export function createAction<T extends string, P>(type: T, payload: P) {
    return {type, payload};
};