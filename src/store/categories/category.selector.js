export const selectCategoriesMap = (state) => state.categories.categories
.reduce((acc, category) => { 
        const {title, items} = category;
        acc[title.toLowerCase()] = items; //is a method to add new prop with its value to an object
        return acc;
    }, {});