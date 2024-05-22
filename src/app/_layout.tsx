import { colors } from '@/constants/tokens'
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayerState'
import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer'
import { ApolloProvider } from '@apollo/client'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useCallback } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import '../global.css'
import { client } from '../queries/client'

SplashScreen.preventAutoHideAsync()

const App = () => {
	const handleTrackPlayerLoaded = useCallback(() => {
		SplashScreen.hideAsync()
	}, [])

	useSetupTrackPlayer({
		onLoad: handleTrackPlayerLoaded,
	})

	useLogTrackPlayerState()

	return (
		<ApolloProvider client={client}>
			<SafeAreaProvider>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<RootNavigation />

					<StatusBar style="auto" />
				</GestureHandlerRootView>
			</SafeAreaProvider>
		</ApolloProvider>
	)
}

const RootNavigation = () => {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />

			<Stack.Screen
				name="(modals)/events/[id]"
				options={{
					presentation: 'modal',
					gestureEnabled: true,
					gestureDirection: 'vertical',
					animationDuration: 400,
					headerShown: false,
				}}
			/>

			<Stack.Screen
				name="(modals)/addToPlaylist"
				options={{
					presentation: 'modal',
					headerStyle: {
						backgroundColor: colors.background,
					},
					headerTitle: 'Add to playlist',
					headerTitleStyle: {
						color: colors.text,
					},
				}}
			/>
		</Stack>
	)
}

export default App
