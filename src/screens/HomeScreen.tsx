import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import {resFont, resHeight, resWidth} from '../utils/responsive';
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Category from '../components/category';
import CategoryItem from '../components/categoryItem';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {fetchAllCategories, fetchCategoryItem} from '../redux/actions';
import {removeFromCart} from '../redux/slice';
import color from '../utils/color';

const HomeScreen = () => {
  const dispatch = useDispatch<any>();
  const state = useSelector((state: RootState) => state.appSlice);
  const [category, setCategory] = useState<string>('Beef');
  const [groupedItemsInCart, setGroupedItemsInCart] = useState([]);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  useMemo(() => {
    dispatch(fetchCategoryItem(category));
  }, [category]);

  useMemo(() => {
    const groupedItems = state.cart.reduce((results: any, item) => {
      (results[item.strMeal] = results[item.strMeal] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInCart(groupedItems);
  }, [state.cart]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Animated.Text style={styles.userName} entering={FadeInUp.delay(500)}>
            Hi Gabriel
          </Animated.Text>
          <Animated.Text
            style={styles.hungryText}
            entering={FadeInLeft.delay(500)}>
            Hungry Now? 🔥
          </Animated.Text>
        </View>
        <Animated.View
          style={{
            width: 40,
            height: 40,
          }}
          entering={FadeInRight.delay(500)}>
          <Image
            source={require('../assets/user.jpeg')}
            style={styles.userImg}
          />
        </Animated.View>
      </View>

      {/* Search */}
      <Animated.View style={styles.search} entering={FadeIn.delay(500)}>
        <Ionicons name="search" size={resWidth(4.5)} color={color.black} />
        <TextInput
          placeholder="Search..."
          style={styles.input}
          placeholderTextColor="gray"
        />
        <Ionicons
          name="options-outline"
          size={resWidth(4.5)}
          color={color.black}
        />
      </Animated.View>

      {state.loading ? (
        <ActivityIndicator
          size={resWidth(8)}
          style={{
            marginVertical: resHeight(30),
          }}
        />
      ) : (
        <>
          {/* Category */}
          <View>
            <FlatList
              data={state.category}
              horizontal
              keyExtractor={(_, i) => i.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <Category
                  index={index}
                  item={item}
                  category={category}
                  changeCategory={setCategory}
                />
              )}
            />
          </View>
          {/* popular items */}
          <View style={styles.popularItemsContainer}>
            <Text style={[styles.hungryText, {fontSize: resFont(18)}]}>
              Popular items
            </Text>
            <Text style={{color: '#a4a4a4', fontSize: resFont(13)}}>
              See All
            </Text>
          </View>

          {/* Check for category item loading */}
          {state.itemLoading ? (
            <ActivityIndicator
              size={resWidth(8)}
              style={{
                marginVertical: resHeight(17.7),
              }}
            />
          ) : (
            <View>
              {/* category items */}
              <FlatList
                data={state.item}
                horizontal
                keyExtractor={(_, i) => i.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <CategoryItem index={index} item={item} />
                )}
              />
            </View>
          )}
        </>
      )}
      {state.cart.length > 0 ? (
        <Animated.View style={styles.cart} entering={FadeIn.delay(300)}>
          <View>
            <Text
              style={[
                styles.hungryText,
                {fontSize: resFont(18), color: color.white},
              ]}>
              Cart
            </Text>
            <Text style={{color: color.white, fontSize: resFont(13)}}>
              {Object.entries(groupedItemsInCart).length} item
              {state.cart.length > 1 ? 's' : ''}
            </Text>
          </View>
          <View style={styles.bar}>
            <View
              style={{
                width: resWidth(12),
                height: 5,
                borderRadius: 1000,
                backgroundColor: '#c4c4c4',
              }}
            />
          </View>
          <Text
            style={[
              styles.hungryText,
              {fontSize: resFont(18), color: color.white, marginRight: -40},
            ]}>
            {Object.entries(groupedItemsInCart).length > 4
              ? `+${Object.entries(groupedItemsInCart).length - 4}`
              : ''}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {Object.entries(groupedItemsInCart)
              .slice(0, 4)
              .map(([key, t]: any, index) => (
                <TouchableOpacity
                  key={t[0].strMeal}
                  style={styles.cartImageContainer}
                  onPress={() => dispatch(removeFromCart(key))}>
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      resizeMode: 'contain',
                      borderRadius: 100,
                    }}
                    source={{uri: t[0].strMealThumb}}
                  />
                </TouchableOpacity>
              ))}
          </View>
        </Animated.View>
      ) : null}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: resHeight(4),
    backgroundColor: color.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: resHeight(2),
    marginBottom: resHeight(3),
  },
  userName: {
    fontSize: resFont(14),
    color: color.black,
  },
  hungryText: {
    fontSize: resFont(23),
    color: color.black,
    fontWeight: '600',
  },
  userImg: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  search: {
    borderWidth: 1,
    borderColor: '#c4c4c4',
    marginHorizontal: resHeight(2),
    paddingHorizontal: resHeight(1.5),
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginHorizontal: 6,
    fontSize: resFont(14),
    color: color.black,
  },
  popularItemsContainer: {
    marginHorizontal: resHeight(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cart: {
    backgroundColor: color.green,
    marginHorizontal: resHeight(2),
    borderRadius: 20,
    padding: resHeight(2.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: resHeight(10),
  },
  cartImageContainer: {
    width: 52,
    height: 52,
    backgroundColor: color.white,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  bar: {
    backgroundColor: color.white,
    padding: resHeight(1),
    paddingHorizontal: resHeight(3),
    borderRadius: 40,
    position: 'absolute',
    top: 0,
    right: resWidth(35),
    marginTop: -12,
  },
});
