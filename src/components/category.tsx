import {Image, StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';
import Animated, {FadeInRight} from 'react-native-reanimated';
import {resFont, resHeight, resWidth} from '../utils/responsive';
import color from '../utils/color';

const Touch = Animated.createAnimatedComponent(Pressable);

const Category = ({index, item, category, changeCategory}: any) => {
  return (
    <Touch
      style={[
        styles.category,
        {
          backgroundColor:
            category === item.strCategory ? color.green : color.white,
          borderWidth: category === item.strCategory ? 0 : 1,
        },
      ]}
      entering={FadeInRight.delay(100 * index)}
      onPress={() => changeCategory(item.strCategory)}>
      <Image
        source={{
          uri: item.strCategoryThumb,
        }}
        style={{
          height: 45,
          width: 45,
          resizeMode: 'contain',
        }}
      />
      <Text
        style={{
          fontSize: resFont(13),
          color: category === item.strCategory ? color.white : color.black,
          fontWeight: '500',
          textAlign: 'center',
        }}>
        {item.strCategory}
      </Text>
    </Touch>
  );
};

export default Category;

const styles = StyleSheet.create({
  category: {
    marginLeft: resHeight(2),
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 20,
    width: resWidth(18),
    height: resHeight(11),
    marginVertical: resHeight(3),
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
