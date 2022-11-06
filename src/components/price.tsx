import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {resFont, resHeight} from '../utils/responsive';
import Animated, {ZoomInRight} from 'react-native-reanimated';
import color from '../utils/color';

const Touch = Animated.createAnimatedComponent(TouchableOpacity);

interface Props {
  amount: string;
  price: string;
  index: number;
  priceID: string;
  changePrice: (id: string) => void;
}

const Price: FC<Props> = props => {
  const setPriceId = () => {
    props.changePrice(props.amount);
  };
  return (
    <Touch
      style={[
        styles.priceContainer,
        {
          borderColor: props.priceID === props.amount ? color.green : '#c4c4c4',
          borderWidth: props.priceID === props.amount ? 2 : 1,
        },
      ]}
      entering={ZoomInRight.delay(props.index * 300)}
      activeOpacity={0.7}
      onPress={setPriceId}>
      <View
        style={[
          styles.circle,
          {
            backgroundColor:
              props.priceID === props.amount ? color.green : color.white,

            borderWidth: props.priceID === props.amount ? 0 : 1,
          },
        ]}>
        <View style={styles.innerCircle} />
      </View>
      <Text style={{fontSize: resFont(16), color: '#90929a'}}>{props.price}"</Text>
      <Text style={styles.amount}>${props.amount}</Text>
    </Touch>
  );
};

export default Price;

const styles = StyleSheet.create({
  priceContainer: {
    padding: resHeight(1),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '28%',
    marginHorizontal: resHeight(0.8),
    paddingVertical: resHeight(3),
    marginVertical: resHeight(1.5),
  },
  circle: {
    width: 17,
    height: 17,
    borderRadius: 100,
    marginBottom: resHeight(1.2),
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: color.white,
  },
  amount: {fontSize: resFont(18), fontWeight: '600', letterSpacing: 1, color: color.black},
});
