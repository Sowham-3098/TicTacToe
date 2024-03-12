import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import type { PropsWithChildren } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

type IconProps =PropsWithChildren<{
    name: string;
}>

const icons = ({name} : IconProps) => {
  switch(name){
    case 'circle':
        return <Icon name="circle-o" size={50} color="#f87171" />
        break;
    case 'cross':
        return <Icon name="times" size={50} color="#65a30d" />
        break;
    default:
        return <Icon name="times" size={1} color="black" />
        break;
  }
   
  }

export default icons

const styles = StyleSheet.create({})