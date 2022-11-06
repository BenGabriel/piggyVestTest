import { StackScreenProps } from '@react-navigation/stack';

//This is for the stack screens
export type StackParamList = {
    LandingScreen: undefined;
    Screen1: undefined;
    Screen2: undefined;
};

export type homeProps = StackScreenProps<StackParamList, 'Screen1'>;
export type detailsProps = StackScreenProps<StackParamList, 'Screen2'>;

// This is for the landing page
export interface Splash {
    mainText: string,
    secondText: string,
    image: any
}

// This is for category, item and cart
export type CategoryItem = {
    idCategory: string,
    strCategory: string,
    strCategoryThumb: string
}
export type Category = {
    categories: CategoryItem[]
}



export type Item = {
    strMeal: string,
    strMealThumb: string,
}

// this is for the appSlice
export type AppState = {
    cart: Item[],
    category: CategoryItem[],
    item: Item[],
    loading: boolean,
    itemLoading: boolean
}
