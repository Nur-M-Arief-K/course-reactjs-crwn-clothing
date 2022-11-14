import { takeLatest, all, call, put } from "typed-redux-saga";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";
import { CATEGORY_ACTION_TYPES } from "./category.types";

export function* fetchCategoriesAsync() {
    try {
        //turn a function into an effect, "categories" below is a parameter
        const categoriesArray = yield* call(getCategoriesAndDocuments);
        //put is a "synonim" of dispatch inside redux-thunk
        yield* put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        yield* put(fetchCategoriesFailed(error as Error));    
    }

};

export function* onFetchCategories () {
    //recieve latest action
    //if takeLatest hear CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START , run fetchCategoriesAsync
    yield* takeLatest(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
};

export function* categoriesSaga() {
    //run all and if everything is succeded, run the code below it
    yield* all([call(onFetchCategories)]); 
};