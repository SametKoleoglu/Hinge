import React, { FC } from 'react'
import { router, Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

interface Props {}


export const StackHeader: FC<Props> = () => {
  return (
    <Stack.Screen
        options={{
          headerBackVisible: false,
          title: "",
          headerRight: () => (
            <Ionicons
              name="close"
              size={24}
              color="black"
              className="text-2xl"
              onPress={() => router.back()}
              suppressHighlighting
            />
          ),
          headerShadowVisible: false,
        }}
      />
  )
}