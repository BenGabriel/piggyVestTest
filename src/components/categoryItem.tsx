import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Animated, {FadeInRight} from 'react-native-reanimated';
import {resFont, resHeight, resWidth} from '../utils/responsive';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {addToCart} from '../redux/slice';
import {useNavigation} from '@react-navigation/native';
import {detailsProps} from '../types/types';
import color from '../utils/color';
const Touch = Animated.createAnimatedComponent(TouchableOpacity);
const CategoryItem = ({index, item}: any) => {
  const navigation = useNavigation<detailsProps | any>();
  const dispatch = useDispatch();
  const addItemToCart = () => {
    dispatch(addToCart(item));
  };

  const navigateOut = () => {
    navigation.navigate('Screen2', {
      item,
    });
  };
  return (
    <Touch
      style={styles.category}
      entering={FadeInRight.delay(300 * index)}
      activeOpacity={0.7}
      onPress={navigateOut}>
      <Text style={styles.meal}>{item.strMeal}</Text>
      <Text style={styles.price}>
        <Text style={{color: color.green}}>$</Text>9.99
      </Text>
      <Image source={{uri: item.strMealThumb}} style={styles.image} />
      <View style={styles.cartDetails}>
        <View>
          <Text style={styles.price}>🔥 44 Calories</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Feather name="clock" size={resWidth(3)} color="#90929a" />
            <Text style={styles.time}>20 min</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.cartIcon} onPress={addItemToCart}>
          <Feather name="shopping-bag" size={resWidth(5)} color={color.black} />
        </TouchableOpacity>
      </View>
    </Touch>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  category: {
    marginLeft: resHeight(2),
    borderRadius: 20,
    width: resWidth(60),
    marginVertical: resHeight(3),
    alignItems: 'center',
    justifyContent: 'center',
    padding: resHeight(2),
    backgroundColor: '#f3f3f3',
  },
  meal: {
    fontSize: resFont(15),
    color: color.black,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  price: {
    fontSize: resFont(15),
    color: color.black,
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  image: {
    width: resWidth(31),
    height: resWidth(31),
    resizeMode: 'contain',
    borderRadius: 100,
    marginVertical: resHeight(2),
  },
  cartDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  time: {
    margin: 5,
    fontSize: resFont(14),
    color: '#90929a',
  },
  cartIcon: {
    backgroundColor: color.white,
    padding: resHeight(1.5),
    borderRadius: 20,
  },
});
