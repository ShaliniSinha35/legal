import { View, Text, Dimensions, ImageBackground,Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Carousel from 'react-native-reanimated-carousel';
const width = Dimensions.get('screen').width


const Banner = () => {

   const [bannerImg,setBannerImg]= useState([
    {
      id: 0,
      image: require("../assets/b2.jpg")
    },
    {
      id: 1,
      image: require("../assets/b2.jpg")
    }
   ])

  //  const getBannerImg= async()=>{
  //   try{
  //      const res = await axios.get("https://mahilamediplex.com/mediplex/bannerImage")
  //      const data= res.data
  //      setBannerImg(data)
  //   }
  //   catch(err){
  //     console.log(err.message)
  //   }
  //  }
  //  useEffect(()=>{
  //   getBannerImg()
  //  },[])
  return (

<View style={{ flex: 1,alignItems:"center",marginTop:15,marginBottom:15 }}>
  {
    bannerImg!=null && 

    <Carousel
    loop
    width={width * 0.9}
    height={150}
    autoPlay={true}
    data={bannerImg}
    scrollAnimationDuration={1000}
    renderItem={({ item, index }) => (
      <Image
        style={{ height: "100%",width:width, resizeMode:"stretch" }}
        source={item.image}
      />
    )}
  />
  
  }

</View>
  )
}

export default Banner

  