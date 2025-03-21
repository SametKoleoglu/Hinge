import React from 'react'
import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name='sign-in' />
      <Stack.Screen name='phone' />
      <Stack.Screen name='otp' />
    </Stack>
  )
}