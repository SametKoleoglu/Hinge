import { View, Text } from 'react-native'
import React from 'react'
import { ProfileView } from '@/src/components'
import { useEdit } from '@/src/store/edit'
import { transformPrivateProfile } from '@/src/utils/profile'

const Profile = () => {
  const {edits} = useEdit()
  
  if(!edits){
    return(
      <View className='flex-1 bg-white justify-center items-center'>
        <Text>Something went wrong</Text>
      </View>
    )
  }
  return (
    <View className='flex-1 px-5'>
      <ProfileView profile={transformPrivateProfile(edits)} />
    </View>
  )
}

export default Profile