import * as React from 'react';
import {Dimensions} from 'react-native'
import { Card, Button, Text  } from 'react-native-paper';


interface Props{
    URL:string,
    title: string,
    description: string,
    price: string
}

export const CardForProducts =({URL, title, description,price}:Props) =>{
    const { width } = Dimensions.get('window');

    return (
  <Card style={{width:(width-40)/2, margin:"0.5rem"}}>
    <Card.Cover source={{ uri: `${URL}` }} />
    <Card.Content>
      <Text variant="titleLarge">{title}</Text>
      <Text variant="bodyMedium">{description}</Text>
      <Text>
        {price}₽
        </Text>
    </Card.Content>
    <Card.Actions >
        <Button>
            +
        </Button>
    </Card.Actions>
  </Card>
    )
};