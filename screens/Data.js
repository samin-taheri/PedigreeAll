import React ,{ Component } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

  
export default class Data extends Component {  

    displayData = async () => {
        try {
          const value = await AsyncStorage.getItem('TOKEN');
          if (value !== null) {
            // We have data!!
            console.log("Global")
            console.log(value);
            alert(token);
            //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
          }
        } catch (error) {
          // Error retrieving data
          console.log("error");
        }
      };

 


  render() {  

  }  
}