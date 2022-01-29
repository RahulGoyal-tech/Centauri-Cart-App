import React, {useState, createContext, useContext} from 'react';
import {
  Text,
  View,
  Pressable,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import {
  NavigationContainer,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';

const Stack = createNativeStackNavigator();

const UserContext = createContext({
  num: 0,
  cost: 0,
  setNum: function (value: number) {
    return;
  },
  setCost: function (value: number) {
    return;
  },
});

interface CheckoutProps {
  navigation: NavigationProp<ParamListBase>;
}

const Checkout: React.FC<CheckoutProps> = () => {
  const data = useContext(UserContext);
  const number = data.num;
  const amount = data.cost;

  return (
    <ScrollView style={styles.mainPage}>
      <View style={styles.CheckoutItemBox}>
        <Text style={styles.CheckoutItem}>
          Number of Items in Cart: {number}
        </Text>
      </View>
      <View style={styles.CheckoutAmountBox}>
        <Text style={styles.CheckoutAmount}>
          Total Amount: {'₹'}
          {amount}
        </Text>
      </View>
    </ScrollView>
  );
};

interface productProps {
  name: string;
  cost: number;
  image: string;
  setNum: Function;
  setCost: Function;
}

const Product: React.FC<productProps> = ({
  name,
  cost,
  image,
  setNum,
  setCost,
}) => {
  const img = image;
  const [count, setCount] = useState<number>(0);

  const productIncrease = () => {
    console.log(name);
    setCount(count + 1);
    setNum((prev: any) => prev + 1);
    setCost((prev: any) => prev + cost);
  };

  const productDecrease = () => {
    console.log(name);
    if (count <= 0) {
      setCount(0);
    } else {
      setCount(count - 1);
    }
    if (count > 0) {
      setNum((prev: any) => prev - 1);
      setCost((prev: any) => prev - cost);
    }
  };

  return (
    <View style={styles.productBox}>
      <View style={styles.previewBox}>
        <View style={styles.imageBox}>
          <FastImage
            style={styles.image}
            source={{
              uri: img,
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
          />
        </View>
        <Text style={styles.productTitle}>
          {name} ({count})
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Pressable
          style={styles.productDecreaseButton}
          onPress={productDecrease}>
          <Text style={styles.productIncreaseText}>-</Text>
        </Pressable>
        <Text style={styles.productCost}>
          {'₹'}
          {cost}
        </Text>
        <Pressable
          style={styles.productIncreaseButton}
          onPress={productIncrease}>
          <Text style={styles.productDecreaseText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

interface MainScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const MainScreen: React.FC<MainScreenProps> = ({navigation}) => {
  const data = useContext(UserContext);
  const num = data.num;

  const checkout = () => {
    FastImage.clearMemoryCache;
    navigation.navigate('MONEY');
  };

  return (
    <ScrollView style={styles.mainPage}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Product
            name="RAZE"
            cost={50}
            image="https://www.nme.com/wp-content/uploads/2020/07/072220-Raze-Valorant-Riot-Games.jpg"
            setNum={data.setNum}
            setCost={data.setCost}
          />
          <Product
            name="CYPHER"
            cost={100}
            image="https://cdn1.dotesports.com/wp-content/uploads/2021/01/22161816/VALORANT_Cypher_Dark-scaled.jpg"
            setNum={data.setNum}
            setCost={data.setCost}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Product
            name="OMEN"
            cost={150}
            image="https://cdn1.dotesports.com/wp-content/uploads/2021/01/22161358/VALORANT_Omen_Dark-scaled.jpg"
            setNum={data.setNum}
            setCost={data.setCost}
          />
          <Product
            name="NEON"
            cost={200}
            image="https://cdn.talkesport.com/wp-content/uploads/VALORA1.png"
            setNum={data.setNum}
            setCost={data.setCost}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Product
            name="CHAMBER"
            cost={250}
            image="https://cdn1.dotesports.com/wp-content/uploads/2021/10/01040143/ezgif-3-ad7ee9114111.jpg"
            setNum={data.setNum}
            setCost={data.setCost}
          />
          <Product
            name="ASTRA"
            cost={300}
            image="https://cdn1.dotesports.com/wp-content/uploads/2021/02/26080227/Astra_Wallpapers_Blue1-scaled.jpg"
            setNum={data.setNum}
            setCost={data.setCost}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Product
            name="VIPER"
            cost={350}
            image="https://cdn1.dotesports.com/wp-content/uploads/2021/03/11142935/VALORANT_Viper_Dark-scaled.jpg"
            setNum={data.setNum}
            setCost={data.setCost}
          />
          <Product
            name="BRIMSTONE"
            cost={400}
            image="https://staticg.sportskeeda.com/editor/2020/09/3bd84-16001841344420-800.jpg"
            setNum={data.setNum}
            setCost={data.setCost}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Product
            name="KAYO"
            cost={450}
            image="https://wallpapercave.com/wp/wp9452970.png"
            setNum={data.setNum}
            setCost={data.setCost}
          />
          <Product
            name="KILLJOY"
            cost={500}
            image="https://cdn1.dotesports.com/wp-content/uploads/2021/01/22161909/KillJoy_Wallpapers_blue2-scaled.jpg"
            setNum={data.setNum}
            setCost={data.setCost}
          />
        </View>
        <Pressable style={styles.mainButton} onPress={checkout}>
          <Text style={styles.checkOutText}>
            Number Of Items = {' ' + num}{' '}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const App: React.FC<{}> = () => {
  const [num, setNum] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  var obj = {
    setNum: setNum,
    setCost: setCost,
    num: num,
    cost: cost,
  };
  return (
    <UserContext.Provider value={obj}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MAIN"
            component={MainScreen}
            options={{title: 'Product Screen', headerTitleAlign: 'center'}}
          />
          <Stack.Screen
            name="MONEY"
            component={Checkout}
            options={{title: 'Checkout', headerTitleAlign: 'center'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

const styles = StyleSheet.create({
  checkOutText: {
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
  },
  CheckoutItemBox: {
    margin: 20,
    marginTop: 60,
    borderWidth: 2,
    height: 400,
    width: '90%',
  },
  CheckoutItem: {
    color: 'black',
    fontSize: 26,
    textAlign: 'center',
    marginTop: 170,
    fontWeight: 'bold',
  },
  CheckoutAmountBox: {
    margin: 20,
    marginTop: 60,
    borderWidth: 2,
    height: 100,
    width: '90%',
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
    borderRadius: 10,
  },
  CheckoutAmount: {
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
    marginTop: 28,
  },
  image: {
    height: 120,
    width: 155,
    borderRadius: 10,
  },
  imageBox: {
    height: 105,
  },
  mainButton: {
    backgroundColor: '#0277BD',
    borderColor: '#0277BD',
    borderWidth: 1,
    marginLeft: 30,
    maxHeight: 100,
    height: 50,
    width: 350,
    margin: 10,
    borderRadius: 10,
    marginTop: 2,
    padding: 6,
  },
  mainPage: {
    backgroundColor: '#ECEFF1',
    height: '100%',
  },
  productBox: {
    borderColor: 'black',
    borderWidth: 0,
    height: 200,
    width: 160,
    margin: 18,
    marginLeft: 22,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.9,
    elevation: -5,
    backgroundColor: 'white',
  },
  previewBox: {
    borderWidth: 1,
    height: 150,
    margin: 2,
    marginBottom: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#80CBC4',
  },
  productTitle: {
    textAlign: 'center',
    margin: 18,
    fontSize: 16,
    color: 'black',
    fontWeight: '900',
  },
  productCost: {
    textAlign: 'center',
    marginLeft: 20,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 5,
  },
  productIncreaseButton: {
    backgroundColor: 'green',
    borderWidth: 1,
    borderRadius: 100,
    width: 30,
    marginTop: 5,
    marginLeft: 125,
    position: 'absolute',
  },
  productDecreaseButton: {
    backgroundColor: '#B71C1C',
    borderWidth: 1,
    borderRadius: 100,
    width: 30,
    marginTop: 5,
    marginLeft: 5,
  },
  productIncreaseText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  productDecreaseText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
});

export default App;
