

import React, { useState } from 'react';

import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Icons from './components/icons'
import Snackbar from 'react-native-snackbar'
import Icon from 'react-native-vector-icons/FontAwesome'


import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function App() : JSX.Element{
  const isDarkMode = useColorScheme() === 'dark';

  

  const [isCross, setIsCross] = useState<boolean>(false)
  const [gameWinner, setgameWinner] = useState<string>('')
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9))
  const reload = () => {
    setIsCross(false)
    setgameWinner('')
    setGameState(new Array(9).fill('empty', 0, 9))
  }

  const checkWinner = () => {
    if (gameState[0] !== 'empty' && gameState[0] === gameState[1] && gameState[1] === gameState[2]) {
      setgameWinner(`${gameState[0]} won the game 🥳 `)
    }else if (gameState[3] !== 'empty' && gameState[3] === gameState[4] && gameState[4] === gameState[5]) { 
      setgameWinner(`${gameState[3]} won the game 🥳`)
    } else if (gameState[6] !== 'empty' && gameState[6] === gameState[7] && gameState[7] === gameState[8]) {
      setgameWinner(`${gameState[6]} won the game 🥳`)
    } else if (gameState[0] !== 'empty' && gameState[0] === gameState[3] && gameState[3] === gameState[6]) {  
      setgameWinner(`${gameState[0]} won the game 🥳`)
    }
    else if (gameState[1] !== 'empty' && gameState[1] === gameState[4] && gameState[4] === gameState[7]) {
      setgameWinner(`${gameState[1]} won the game 🥳`)
    } else if (gameState[2] !== 'empty' && gameState[2] === gameState[5] && gameState[5] === gameState[8]) {
      setgameWinner(`${gameState[2]} won the game 🥳`)
    } else if (gameState[0] !== 'empty' && gameState[0] === gameState[4] && gameState[4] === gameState[8]) {
      setgameWinner(`${gameState[0]} won the game 🥳`)
    } else if (gameState[2] !== 'empty' && gameState[2] === gameState[4] && gameState[4] === gameState[6]) {
      setgameWinner(`${gameState[2]} won the game 🥳`)
    } else if(!gameState.includes('empty',0)){
      setgameWinner('Game is draw ... 🤦‍♂️')
    }

  }
  

  const onBoxClick = (Index: number) => {
      if(gameWinner){
        return Snackbar.show({
          text: gameWinner,
          backgroundColor: '#000',
          textColor: '#fff'
        
        })
      }

      if(gameState[Index] === 'empty'){
        gameState[Index] = isCross ? 'cross' : 'circle'
        setIsCross(!isCross)
      }else{
        return Snackbar.show({
          text: 'Box is already filled',
          backgroundColor: 'red',
          textColor: '#fff'
        
        })
      }
      checkWinner();
  }

  return (
    <SafeAreaView style={{backgroundColor: isDarkMode? '#111827': '#64748b', height: '100%'}}>
      <StatusBar
        // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        // backgroundColor={backgroundStyle.backgroundColor}
      />
      <View  style={[styles.titlecontainer, {backgroundColor: isDarkMode? '#64748b': '#111827'}]}>
        <Text style={{textAlign: 'center', fontSize: 20,  marginTop: 5, color : isDarkMode? 'white' : 'white'}}>
          Let's Play
        </Text>
        <Text style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginVertical: 10, color : isDarkMode? 'white' : 'white'}}>
          Tic Tac Toe
        </Text>
      </View>
      {gameWinner ? (
        <View style={[styles.playerInfo,styles.winnerInfo]}>
               <Text style={styles.winnerTxt}>{gameWinner}</Text>
                
          </View>
      ):(
        <View style={[styles.playerInfo,isCross ? styles.playerX : styles.playerO]}>
          <Text style={styles.gameTurnTxt}>Player {isCross ? 'X ' : 'O '}'s turn</Text>
        </View>
      )}
      {/* Game Grid */}
       <FlatList
        numColumns={3}
        
        data={gameState}
        style={[styles.grid,{backgroundColor: isDarkMode? '#64748b':'#111827'}]}
        renderItem={({item,index}) => (
          <Pressable
              key={index}
              style={[styles.card,{backgroundColor: isDarkMode? '#334155':'#334155'}]}
              onPress={() => onBoxClick(index)}
          >
            <Icons name={item} />
          </Pressable> 
        )}
       />

       <Pressable style={[styles.gameBtn,{backgroundColor:isDarkMode? '#64748b':'#1e293b'}]} onPress={reload}>
         <Text style={[styles.gameBtnText,{color: isDarkMode? 'white' : 'white'}]}>
          {gameWinner ? 'Start Again' : 'Reload Game'}
         </Text>
        </Pressable>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  playerInfo: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.6,
    marginLeft: windowWidth * 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: windowHeight * 0.05,
    paddingVertical: windowHeight * 0.02,
    marginVertical: windowHeight * 0.03,
    marginHorizontal: windowWidth * 0.1,
    marginTop: windowHeight * 0.04,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: windowHeight * 0.03,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#65a30d',
  },
  playerO: {
    backgroundColor: '#f87171',
  },
  grid: {
    maxHeight: windowHeight * 0.4,
    margin: windowWidth * 0.05,
    padding: windowWidth * 0.05,
    height: windowHeight * 0.3,
    borderRadius: windowWidth * 0.05,
    gap: windowWidth * 0.05,
    shadowOpacity: 0.1,
  },
  card: {
    flex: 1,
    height: windowHeight * 0.108,
    width: windowWidth * 0.1,
    borderRadius: windowWidth * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4b5563',
    marginHorizontal: windowWidth * 0.01,
    marginVertical: windowWidth * 0.01,
  },
  winnerInfo: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.09,
    marginLeft: windowWidth * 0.15,
    borderRadius: windowWidth * 0.18,
    backgroundColor: '#14532d',
    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: windowHeight * 0.025,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',
    marginBottom: windowHeight * 0.08,
    height: windowHeight * 0.06,
    marginTop: windowHeight * 0.04,
    padding: windowWidth * 0.02,
    width: windowWidth * 0.4,
    marginLeft: windowWidth * 0.3,
    marginHorizontal: windowWidth * 0.25,
    borderRadius: windowWidth * 0.02,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: windowHeight * 0.018,
    marginTop: windowHeight * 0.006,
    fontWeight: '500',
    
  },
  titlecontainer: {
    margin: windowWidth * 0.03,
    padding: windowWidth * 0.03,
    borderRadius: windowWidth * 0.05,
    shadowOpacity: 0.1,
  },
});

export default App;
