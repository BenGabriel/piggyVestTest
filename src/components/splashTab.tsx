import React, {FC} from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

interface Tab {
  index: number;
  scrollValue: any;
}
const SplashTab: FC<Tab> = ({index, scrollValue}) => {
  const interpolationInputRange = [
    (index - 1) * width,
    index * width,
    (index + 1) * width,
  ];

  const styleTab = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      -(scrollValue.value),
      interpolationInputRange,
      ['#262626', '#f3f3f3', '#262626'],
      'RGB',
    ),
  }));

  return (
    <Animated.View
      style={[
        styleTab,
        {
          width: 20,
          height: 5,
          borderRadius: 10,
          marginRight: 10,
        },
      ]}
    />
  );
};

export default SplashTab;
