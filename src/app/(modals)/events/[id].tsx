import { MovingText } from '@/components/MovingText'
import { unknownTrackImageUri } from '@/constants/images'
import { colors, fontSize, screenPadding } from '@/constants/tokens'
import { GET_EVENTS } from '@/queries/GET_EVENTS'
import { client } from '@/queries/client'
import { defaultStyles } from '@/styles'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const PlayerScreen = () => {
	const { id } = useLocalSearchParams<{ id: string }>()

	const data = client.readQuery({ query: GET_EVENTS })

	const events = data.program.events

	const activeEvent = events.find((e) => e.id === id)

	// const { imageColors } = usePlayerBackground(activeEvent?.image[0].mobile ?? unknownTrackImageUri)

	const { top, bottom } = useSafeAreaInsets()

	if (!activeEvent) {
		return (
			<View style={[defaultStyles.container, { justifyContent: 'center' }]}>
				<ActivityIndicator color={colors.icon} />
			</View>
		)
	}

	return (
		<View style={styles.overlayContainer}>
			<DismissPlayerSymbol />

			<View style={{ flex: 1, marginTop: top + 70, marginBottom: bottom }} className="gap-10">
				<View style={styles.artworkImageContainer}>
					<Image
						source={{
							uri: activeEvent?.image[0].desktopXL2x ?? unknownTrackImageUri,
						}}
						resizeMode="cover"
						style={styles.artworkImage}
					/>
				</View>

				<View style={{ flex: 1 }} className="gap-10">
					<View style={{ marginTop: 'auto' }}>
						<View style={{ height: 60 }}>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								{/* Track title */}
								<View style={styles.trackTitleContainer}>
									<MovingText
										text={activeEvent.title ?? ''}
										animationThreshold={30}
										style={styles.trackTitleText}
									/>
								</View>
							</View>

							{/* Track artist */}
							{activeEvent.subtitle && (
								<Text numberOfLines={1} style={[styles.trackArtistText, { marginTop: 6 }]}>
									{activeEvent.subtitle}
								</Text>
							)}
						</View>
					</View>
					<View style={{ flex: 1 }}>
						<TouchableOpacity activeOpacity={0.8} style={styles.button} className="rounded">
							<Text className="text-white">Buy tickets</Text>
							<Ionicons name="arrow-forward" size={22} color={colors.primary} />
						</TouchableOpacity>
					</View>

					{/* <View style={utilsStyles.centeredRow}>
							<PlayerRepeatToggle size={30} style={{ marginBottom: 6 }} />
						</View> */}
				</View>
			</View>
		</View>
	)
}

const DismissPlayerSymbol = () => {
	const { top } = useSafeAreaInsets()

	return (
		<View
			style={{
				position: 'absolute',
				top: top + 8,
				left: 0,
				right: 0,
				flexDirection: 'row',
				justifyContent: 'center',
			}}
		>
			<View
				accessible={false}
				style={{
					width: 50,
					height: 8,
					borderRadius: 8,
					backgroundColor: '#fff',
					opacity: 0.7,
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	overlayContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	artworkImageContainer: {
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.44,
		shadowRadius: 11.0,
		flexDirection: 'row',
		justifyContent: 'center',
		height: '45%',
	},
	artworkImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 12,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: 22,
		fontWeight: '700',
	},
	trackArtistText: {
		...defaultStyles.text,
		fontSize: fontSize.base,
		opacity: 0.8,
		maxWidth: '90%',
	},
	button: {
		padding: 12,
		backgroundColor: 'rgba(47, 47, 47, 0.5)',
		borderRadius: 8,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		columnGap: 8,
	},
	buttonText: {
		...defaultStyles.text,
		color: colors.primary,
		fontWeight: '600',
		fontSize: 18,
		textAlign: 'center',
	},
})

export default PlayerScreen
