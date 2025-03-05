import { View, Text, ScrollView } from 'react-native'
import React,{useContext} from 'react'
import { Layout } from '@ui-kitten/components'
import { Divider } from '@ui-kitten/components'
import { Header } from '../Components/Header'
import { StateDistrictSelect } from '../Components/StateDistrictSelect'
import CaseSearchList from '../Components/CaseSearchList'
import { CourtSelect } from '../Components/CourtSelect'
import { AppContext } from '../context/AppContext'
const CaseStatus = ({navigation}) => {

  const { court} = useContext(AppContext);
  return (
   <Layout style={{ flex: 1 }}>
<Header navigation={navigation}></Header>
<CourtSelect></CourtSelect>
     <Divider></Divider>
     {
      court == "District Court" &&
      <StateDistrictSelect></StateDistrictSelect>

     }

     <ScrollView>
     <CaseSearchList navigation={navigation}></CaseSearchList>

     </ScrollView>
   </Layout>
  )
}

export default CaseStatus