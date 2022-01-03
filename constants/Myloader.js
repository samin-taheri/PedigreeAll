import React   from 'react'

import { Text, SafeAreaView, Image } from 'react-native';

const Myloader = (props) => {
    return (
        <>
            {props.Show ?
                <SafeAreaView
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        zIndex: 9999

                    }}>
                    <Image style={{ width: '100%', resizeMode: 'center', height: 200 }} source={require('../assets/horseRun3.gif')} />
                    <Text style={{ color: 'rgb(79,141,228)', fontSize: 20, margin: 20, fontWeight: '500', bottom: '3%' }}>{props.Text}</Text>

                </SafeAreaView> :
                null
            }
        </>
    );
}


export default Myloader;