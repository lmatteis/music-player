import { fontSize } from '@/constants/tokens'
import { Artist } from '@/helpers/types'
import { defaultStyles } from '@/styles'
import { StyleSheet } from 'react-native'

export const ArtistTracksList = ({ artist }: { artist: Artist }) => {
	return null
}

const styles = StyleSheet.create({
	artistHeaderContainer: {
		flex: 1,
		marginBottom: 32,
	},
	artworkImageContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		height: 200,
	},
	artistImage: {
		width: '60%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 128,
	},
	artistNameText: {
		...defaultStyles.text,
		marginTop: 22,
		textAlign: 'center',
		fontSize: fontSize.lg,
		fontWeight: '800',
	},
})
