import React, { useState } from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Feature from '../components/feature'
import { dummyMessages } from '../constants'
import GifImage from '@lowkey/react-native-gif';

const HomeScreen = () => {
  const [messages, setMessages] = useState(dummyMessages)
  const [recording, setRecording] = useState(false)
  const [speaking, setSpeaking] = useState(false)

  const clearMessages = () => {
    setMessages([])
  }

  const stopSpeaking = () => {
    setSpeaking(false)
  }

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 flex mx-5">
        <View className="flex-row justify-center">
          <Image source={require("../../assets/images/bot.png")} style={{ width: hp(15), height: hp(15), marginTop: 40 }} />
        </View>

        {
          messages.length > 0 ? (
            <View className="space-y-2 flex-1">
              <Text style={{ fontSize: wp(5) }} className="text-gray-700 font-semibold ml-1">Assistant</Text>
              <View className="bg-neutral-200 rounded-3xl p-4">
                <ScrollView
                  bounces={false}
                  className="space-y-4"
                  showsVerticalScrollIndicator={false}
                >
                  {
                    messages.map((message, index) => {
                      if (message.role == "assistant") {
                        if (message.content.includes("https")) {
                          return (
                            <View key={index} className="flex-row justify-start">
                              <View className="p-2 flex rounded-2xl bg-emerald-100 rounded-tl-none">
                                <Image key={index} source={{ uri: message.content }} style={{ width: wp(60), height: wp(60) }} className="rounded-2xl"/>
                              </View>
                            </View>
                          )
                        } else {
                          return (
                            <View style={{ width: wp(70) }} className="bg-emerald-100 rounded-xl  p-2 rounded-tl-none">
                              <Text>{message.content}</Text>
                            </View>
                          )
                        }
                      } else {
                        return (
                          <View key={index} className="flex-row justify-end">
                            <View style={{ width: wp(70) }} className="bg-white rounded-xl p-2 rounded-tr-none">
                              <Text>{message.content}</Text>
                            </View>
                          </View>
                        )
                      }
                    })
                  }
                </ScrollView>
              </View>
            </View>
          ) : (
            <Feature />
          )
        }
        <View className="flex justify-center items-center my-4">
          {
            recording ? (
              <TouchableOpacity>
                <Image source={require("../../assets/images/voiceloading_new.gif")} style={{ width: hp(10), height: hp(10) }} className="rounded-full"/>
              </TouchableOpacity>
            ):(
              <TouchableOpacity>
                <Image source={require("../../assets/images/recordingicon.png")} style={{ width: hp(8), height: hp(8) }} className="rounded-full"/>
              </TouchableOpacity>
            )
          }
          {
            messages.length > 0 && (
              <TouchableOpacity onPress={clearMessages} className="bg-neutral-400 rounded-3xl p-2 absolute right-10">
                <Text className="text-white font-semibold">Clear</Text>
              </TouchableOpacity>
            )
          }
          {
            speaking && (
              <TouchableOpacity onPress={stopSpeaking} className="bg-red-400 rounded-3xl p-2 absolute left-10">
                <Text className="text-white font-semibold">Stop</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </SafeAreaView>
    </View>
  )
}

export default HomeScreen
