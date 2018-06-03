import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, Button } from 'react-native';
import { Constants } from "expo";
import TimerMixin from 'react-timer-mixin';


class Horse {
  constructor(finalX){
    this.x=0;
    this.speed=3;
    this.completed=false;
    this.finalX=finalX;
  }

  run() {
    if (!this.completed) {
      return;
    }
    
    this.x+=this.speed;

    if (this.x>this.finalX) {
      this.x=this.finalX;
      this.completed=true;
    }
  }
  
  changeSpeed() {
    this.speed=3;
  }
}

export default class App extends React.Component {
  constructor() {
    super()

    let horses=[];
    for (let i=0; i<5; i++) {
      horses[i] = new Horse(Dimensions.get("screen").width)
    }
    this.state={
      horses
    }
    this.start = this.start.bind(this);

  }

  start() {
    this.changeSpeed();
    this.run();

  }

  run() {

    this.state.horses.forEach(horse => horse.run());

    this.setState({
      horses: this.state.horses
    })

    if (this.state.horses.filter(h => !h.completed).length ===0) {
      return;
    }

    TimerMixin.setTimeout(() => this.run, 1000/60);
    

  }

  changeSpeed() {

    this.state.horses.forEach(horse => horse.changeSpeed());

    if (this.state.horses.filter(h => !h.completed).length === 0) {
      return;
    }

  }

  render() {
    const {horses} = this.state;

    let divHorses = horses.map((horse,i) => {
      return(
        <View style={styles.horse} key={i}>
        
          <Image
            style={{width: 50, height: 50,transform: [{ rotateY: '180deg'}],marginLeft:horse.x}}
            source={{uri:"http://icons.iconarchive.com/icons/martin-berube/square-animal/256/Horse-icon.png"}}/>
        
          </View>

      )
        
        
    })

    return (
      <View style={styles.container}>
        {divHorses}
        <Button
        onPress={this.start}
        title="Start" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex:1,
    backgroundColor: '#fff',
    alignItems:'flex-start'

  },
  horse: {
    width:"100%",
    borderBottomColor: 'black',
    borderBottomWidth: 1

  }
});
