import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllCategories = createAsyncThunk('fetchAllCategories', async () => {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
  if (res.status === 200) {
    let data = await res.json()
    return data.categories.slice(0, 6);
  } else {
    console.log(res, 'error');
  }
});

export const fetchCategoryItem = createAsyncThunk('fetchCategoryItem', async (category: string) => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  if (res.status === 200) {
    let data = await res.json()
    return data.meals.slice(0, 5);
  } else {
    console.log(res, 'error');
  }
});