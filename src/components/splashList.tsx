import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Splash} from '../types/types';
import {resFont, resWidth} from '../utils/responsive';
import color from '../utils/color';

const SplashList = (props: Splash) => {
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <View style={styles.imageContainer}>
        <Image
          source={props.image}
          style={{width: '100%', height: '100%', resizeMode: 'contain'}}
        />
      </View>
      <Text style={styles.carouselText}>{props.mainText}</Text>
      <Text style={styles.carouselText}>{props.secondText}</Text>
    </View>
  );
};

export default SplashList;

const styles = StyleSheet.create({
  carouselText: {
    color: color.white,
    fontSize: resFont(20),
    fontWeight: '600',
  },
  imageContainer: {
    width: resWidth(60),
    height: resWidth(60),
    marginVertical: 30,
  },
});
