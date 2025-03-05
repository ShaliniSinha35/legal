import { View, Text } from 'react-native'
import React,{useContext} from 'react'
import { Divider, Layout } from '@ui-kitten/components'
import { Header } from '../Components/Header'
import { StateDistrictSelect } from '../Components/StateDistrictSelect'
import { Searchbar } from 'react-native-paper';
import { CourtSelect } from '../Components/CourtSelect'
import { AppContext } from '../context/AppContext'

const MyCases = ({navigation}) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const {court}= useContext(AppContext)
  
  return (
    <Layout style={{ flex: 1, }}>
      <Header navigation={navigation}></Header>
        <CourtSelect></CourtSelect>
      <Divider></Divider>
      {
      court == "District Court" &&
      <StateDistrictSelect></StateDistrictSelect>

     }


      <Divider>
      </Divider>

      
          <View style={{padding:15}}>
        <Searchbar
            placeholder="Enter text to search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={{backgroundColor:'#f0f0f0'}}
          />
          </View>

 <Text allowFontScaling={false}  style={{textAlign:"center"}}>No Cases</Text>

      
  </Layout>
  )
}

export default MyCases