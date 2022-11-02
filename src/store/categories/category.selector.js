import {createSelector} from "reselect";

//select categories prop (out of 2 props) from combine reducer inside store.js
const selectCategoryReducer = (state) => state.categories;

//memoization #1
export const selectCategories = createSelector(
    //input, if this different, run the code below
    [selectCategoryReducer],
    //output
    (categoriesSlice) => categoriesSlice.categories
);

//memoization #2
export const selectCategoriesMap = createSelector(
    //input, if this different, run the code below
    [selectCategories],

    //output
    (categories) => {
        return categories.reduce((acc, category) => { 
            const {title, items} = category;
            acc[title.toLowerCase()] = items; //is a method to add new prop with its value to an object
            return acc;
        }, {});
    }
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
);  