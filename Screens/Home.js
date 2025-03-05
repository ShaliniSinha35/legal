import React, { useContext } from 'react';
import { Layout, Text,Divider } from '@ui-kitten/components';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Header } from '../Components/Header';
import { StateDistrictSelect } from '../Components/StateDistrictSelect';
import CaseSearchList from '../Components/CaseSearchList';
import SearchBar from '../Components/SearchBar';
import HowToUse from '../Components/HowToUse';
import { ScrollView } from 'react-native';
import Section1 from '../Components/Section1';
import Banner from '../Components/Banner';
import { AppContext } from '../context/AppContext';
import ThemeSwitcher from '../Components/ThemeSwitch';
import { CourtSelect } from '../Components/CourtSelect';


const Home = ({navigation}) => {
   const {theme,setTheme}= useContext(AppContext)
  return(
    <Layout style={{ flex: 1,backgroundColor:theme=='light'?"#fff":"#111" }}>
    <Header navigation={navigation}></Header>
  {/* <CourtSelect></CourtSelect> */}

    {/* <Divider></Divider> */}

<SearchBar></SearchBar>

<Divider></Divider>
<ScrollView>

  <Section1 navigation={navigation}></Section1>
  <Divider></Divider>

  <Banner></Banner>
  <Divider></Divider>

<HowToUse></HowToUse>

</ScrollView>






  </Layout>
  )
 
};

export default Home;
