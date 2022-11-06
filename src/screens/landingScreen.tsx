import {StyleSheet, View, Image, Dimensions} from 'react-native';
import React from 'react';
import Button from '../components/button';
import {SplashCarousel} from '../utils/data';
import Animated, {useSharedValue} from 'react-native-reanimated';
import {resHeight} from '../utils/responsive';
import Carousel from 'react-native-reanimated-carousel';
import SplashTab from '../components/splashTab';
import SplashList from '../components/splashList';
import { homeProps } from '../types/types';
import color from '../utils/color';
const {width} = Dimensions.get('window');

const LandingScreen = ({navigation}: homeProps) => {
  const scrollX = useSharedValue(0);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/piggy.png')}
        style={{width: '30%', resizeMode: 'contain'}}
      />
      <View style={styles.midSection}>
        <Carousel
          loop={false}
          width={width}
          height={width}
          autoPlay={true}
          autoFillData={false}
          data={SplashCarousel}
          scrollAnimationDuration={2000}
          renderItem={({item, index}) => (
            <SplashList
              image={item.image}
              mainText={item.mainText}
              secondText={item.secondText}
            />
          )}
          defaultScrollOffsetValue={scrollX}
        />
        <Animated.FlatList
          data={SplashCarousel}
          renderItem={({item, index}) => (
            <SplashTab index={index} scrollValue={scrollX} />
          )}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          horizontal
          pagingEnabled
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button text="LOGIN" click={() => navigation.navigate('Screen1')} />
        <Button text="REGISTER" bordered disabled />
      </View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.black,
    alignItems: 'center',
    paddingBottom: 20,
  },
  midSection: {
    height: resHeight(70),
    alignItems: 'center',
    paddingVertical: 80,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    padding: resHeight(2),
  },
});
