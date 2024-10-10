import React from 'react'
import { View } from 'react-native'
import ScreenHeaderLogo from './ScreenHeaderLogo'
import ScreenHeaderProfile from './ScreenHeaderProfile'
import { COLORS } from '../../../constants/theme'
import images from '../../../constants/images'

function MainHeader() {
  return (
    <View style={{minHeight:100, margin:0, paddingTop:70, alignItems:'center',  backgroundColor:COLORS.lightWhite}}>
        <View style={{justifyContent:'space-between', flexDirection: "row", width:"92%"}}>
            <ScreenHeaderLogo imageUrl={images.logoBrainWare} dimension='100%' />
            <ScreenHeaderProfile imageUrl={"https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"} dimension = '100%'/>
        </View>
    </View>
  )
}

export default MainHeader