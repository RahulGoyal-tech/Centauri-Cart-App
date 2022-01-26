import React, { useState } from 'react'
import { Text, View, Pressable, ScrollView, Image, StyleSheet } from 'react-native'
import { NavigationContainer, NavigationProp, ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

interface CheckoutProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const Checkout: React.FC<CheckoutProps> = ({route}) => {

  console.log(route.params)
  let { number } = route.params;
  let { amount } = route.params;

  return(
    <ScrollView style={styles.mainPage}>
      <View style = {styles.CheckoutItemBox}>
        <Text style = {styles.CheckoutItem}>Number of Items in Cart: {number}</Text>
      </View>
      <View style = {styles.CheckoutAmountBox}>
        <Text style = {styles.CheckoutAmount}>Total Amount:  {'₹'}{amount}</Text>
      </View>
    </ScrollView>
  )
}

interface productProps {
  name: string,
  cost: number,
  image: string,
  setNum: Function,
  setCost: Function,
}

const Product: React.FC<productProps> = ({ name, cost, image, setNum, setCost }) => {

  const img = image
  const [count, setCount] = useState<number>(0);

  const productIncrease = () => {
    console.log(name)
    setCount(count+1)
    setNum((prev:any) => prev+1);
    setCost((prev:any)=> prev+cost);
  }

  const productDecrease = () => {
    console.log(name)
    if(count<=0){
      setCount(0)
    }
    else{
      setCount(count-1)
    }
    if(count>0){
      setNum((prev:any) => prev-1);
      setCost((prev:any)=> prev-cost);
    }
    
  }
  
  return(
    <View style = {styles.productBox}>
      <View style={styles.previewBox}>
        <View style = {styles.imageBox}>
          <Image style={styles.image} source={require('./Images/download.jpg')}/>
        </View>
        <Text style = {styles.productTitle}>{name}({count})</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Pressable style={styles.productDecreaseButton} onPress={productDecrease}>
          <Text style = {styles.productIncreaseText}>-</Text>
        </Pressable>
        <Text style={styles.productCost}>{'₹'}{cost}</Text>
        <Pressable style={styles.productIncreaseButton} onPress={productIncrease}>
          <Text style = {styles.productDecreaseText}>+</Text>
        </Pressable>
      </View>
    </View>
  )
}

interface MainScreenProps {
  navigation: NavigationProp<ParamListBase>;
  route: any,
}

const MainScreen: React.FC<MainScreenProps> = ({navigation}) => {

  const [num, setNum] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);

  const checkout = () => {
    navigation.navigate('MONEY',
      {
        number: num,
        amount: cost
      }
    );
  }

  return(
    <ScrollView style = {styles.mainPage}>
      <View>
      <View style = {{flexDirection: 'row'}}>
        <Product name='Product 1' cost={50} image='./Images/download.jpg' setNum={setNum} setCost = {setCost} />
        <Product name='Product 2' cost={100} image='./Images/download.jpg' setNum={setNum} setCost = {setCost}/>
      </View>
      <View style = {{flexDirection: 'row'}}>
        <Product name='Product 3' cost={150} image='./Images/download.jpg' setNum={setNum} setCost = {setCost}/>
        <Product name='Product 4' cost={200} image='./Images/download.jpg' setNum={setNum} setCost = {setCost} />
      </View>
      <View style = {{flexDirection: 'row'}}>
        <Product name='Product 5' cost={250} image='./Images/download.jpg' setNum={setNum} setCost = {setCost} />
        <Product name='Product 6' cost={300} image='./Images/download.jpg' setNum={setNum} setCost = {setCost} />
      </View>
      <View style = {{flexDirection: 'row'}}>
        <Product name='Product 7' cost={350} image='./Images/download.jpg' setNum={setNum} setCost = {setCost} />
        <Product name='Product 8' cost={400} image='./Images/download.jpg' setNum={setNum} setCost = {setCost} />
      </View>
      <View style = {{flexDirection: 'row'}}>
        <Product name='Product 9' cost={450} image='./Images/download.jpg' setNum={setNum} setCost = {setCost} />
        <Product name='Product 10' cost={500} image='./Images/download.jpg' setNum={setNum} setCost = {setCost} />
      </View>
      <Pressable style={styles.mainButton} onPress={checkout}>
        <Text style = {styles.checkOutText}>Number Of Items = {' '+num} </Text>
      </Pressable>
      </View>
    </ScrollView>
  )
}

const App: React.FC<{}> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='MAIN'
          component={MainScreen}
          options={{ title: 'Product Screen', headerTitleAlign: 'center' }}
        />
        <Stack.Screen
          name='MONEY'
          component={Checkout}
          options={{ title: 'Checkout', headerTitleAlign: 'center' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
    width: '90%'
  },
  CheckoutItem: {
    color: 'black', 
    fontSize: 26, 
    textAlign: 'center', 
    marginTop: 170, 
    fontWeight: 'bold'
  },
  CheckoutAmountBox: {
    margin: 20, 
    marginTop: 60, 
    borderWidth: 2,
    height: 100, 
    width: '90%', 
    backgroundColor: '#2E7D32', 
    borderColor: '#2E7D32', 
    borderRadius: 10
  },
  CheckoutAmount: {
    color: 'white', 
    fontSize: 28, 
    textAlign: 'center', 
    marginTop: 28
  },
  image: {
    height:120, 
    width:155, 
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
    padding:6,
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
      height: 3
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
    borderTopRightRadius: 10 ,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#F0F4C3'
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
    marginLeft: 30, 
    color: 'black', 
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 5, 
  },
  productIncreaseButton: {
    backgroundColor: 'green', 
    borderWidth: 1,  
    borderRadius: 10,
    width: 20, 
    marginTop: 5,
    marginLeft: 135,
    position: 'absolute'
  },
  productDecreaseButton: {
    backgroundColor: '#B71C1C', 
    borderWidth: 1,  
    borderRadius: 10,
    width: 20, 
    marginTop: 5,
    marginLeft: 5,
  },
  productIncreaseText: {
    color: 'white', 
    fontSize: 22, 
    textAlign: 'center'
  },
  productDecreaseText: {
    color: 'white', 
    fontSize: 22, 
    textAlign: 'center'
  }
});

export default App;