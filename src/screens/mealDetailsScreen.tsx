import {StyleSheet, Text, View, ScrollView } from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {resFont, resHeight, resWidth} from '../utils/responsive';
import Animated, {FadeInDown, RollInRight} from 'react-native-reanimated';
import Price from '../components/price';
import color from '../utils/color';

const MealDetailsScreen = ({route, navigation}: any) => {
  const {item} = route.params;
  const [priceId, setPriceId] = useState('9.99');

  const priceData = [
    {
      price: 'Small 8',
      amount: '9.99',
    },
    {
      price: 'Medium 12',
      amount: '12.99',
    },
    {
      price: 'Large 18',
      amount: '16.99',
    },
  ];
  return (
    <ScrollView
      style={{backgroundColor: color.green, height: resHeight(100)}}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={resWidth(7)}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <MaterialCommunityIcons
          name="heart-outline"
          size={resWidth(6)}
          color="#fff"
        />
      </View>
      <Animated.View style={styles.body} entering={FadeInDown.duration(1000)}>
        <Animated.Image
          entering={RollInRight.duration(700)}
          source={{uri: item.strMealThumb}}
          style={styles.imageContainer}
        />
        <Text style={styles.meal}>{item.strMeal}</Text>
        <Text
          style={{
            color: '#90929a',
            fontSize: resFont(16),
          }}>
          🍕 Pizza italiano
        </Text>

        {/* time and rate */}
        <View style={styles.rateContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Feather name="clock" size={resWidth(4)} color="#111" />
            <Text style={{fontSize: resFont(17), color: color.black}}>
              {' '}
              20 min
            </Text>
          </View>
          <View style={styles.dot} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons
              name="star"
              size={resWidth(4)}
              color="#e7b43d"
              style={{marginRight: resHeight(0.7)}}
            />
            <Text style={{fontSize: resFont(17), color: 'gray'}}>
              <Text style={{fontWeight: '600', color: color.black}}>4.8</Text>{' '}
              (2.2k review)
            </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={resWidth(4)}
              style={{marginTop: 4}}
            />
          </View>
        </View>

        {/* price */}

        <View style={{flexDirection: 'row'}}>
          {priceData.map((t, index) => (
            <Price
              key={t.amount}
              amount={t.amount}
              price={t.price}
              index={index}
              priceID={priceId}
              changePrice={(id: string) => setPriceId(id)}
            />
          ))}
        </View>

        {/* description */}

        <Text style={styles.description}>
          Melting cheese pizza makking with Extra virgin olive oil, Cornmeal,
          beef/chicken, Tomato sauce (smooth or pureed), Firm mozza, 100 gm
          onion, 70 gm chopped capsicum...
          <Text
            style={{
              color: color.green,
            }}>
            More
          </Text>
        </Text>

        {/* total amount */}

        <View style={styles.totalamountContainer}>
          <Text style={styles.total}>
            Total: <Text style={{color: color.green}}>$</Text>
            {priceId}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={styles.icon}>
              <Feather name="minus" color={color.black} size={resWidth(4)} />
            </View>
            <Text
              style={{
                fontWeight: '900',
                fontSize: resFont(16),
                marginHorizontal: resHeight(2),
                color: color.black
              }}>
              1
            </Text>
            <View style={styles.icon}>
              <Feather name="plus" color={color.black} size={resWidth(4)} />
            </View>
          </View>
        </View>
        <View style={styles.button}>
          <Text
            style={{
              color: color.white,
              fontWeight: '600',
              fontSize: resFont(18),
            }}>
            Next
          </Text>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

export default MealDetailsScreen;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: resHeight(3),
    width: resWidth(100),
    marginVertical: resHeight(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  body: {
    backgroundColor: color.white,
    flex: 1,
    width: '100%',
    marginTop: resHeight(8),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    padding: resHeight(2),
  },
  imageContainer: {
    width: resWidth(45),
    height: resWidth(45),
    resizeMode: 'contain',
    borderRadius: 100,
    marginTop: -resHeight(12),
    marginBottom: resHeight(1),
  },
  meal: {
    fontSize: resFont(20),
    marginVertical: resHeight(1),
    color: color.black,
    fontWeight: '600',
    textAlign: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: 'gray',
    marginHorizontal: resHeight(1.5),
    borderRadius: 100,
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: resHeight(1.3),
  },
  description: {
    fontSize: resFont(19),
    textAlign: 'center',
    marginVertical: resHeight(1.5),
    color: '#90929a',
  },
  totalamountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: resHeight(3),
  },

  total: {
    fontSize: resFont(18),
    fontWeight: '600',
    letterSpacing: 1,
    color: color.black,
  },
  icon: {
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 10,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addMinus: {
    fontSize: resFont(20),
  },
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 15,
    backgroundColor: color.green,
    marginVertical: resHeight(3),
  },
});
