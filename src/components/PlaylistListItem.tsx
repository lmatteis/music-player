import { Playlist } from '@/helpers/types'
import { defaultStyles } from '@/styles'
import { StyleSheet, TouchableHighlightProps } from 'react-native'

type PlaylistListItemProps = {
	playlist: Playlist
} & TouchableHighlightProps

export const PlaylistListItem = ({ playlist, ...props }: PlaylistListItemProps) => {
	return null
}

const styles = StyleSheet.create({
	playlistItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
		paddingRight: 90,
	},
	playlistArtworkImage: {
		borderRadius: 8,
		width: 70,
		height: 70,
	},
	playlistNameText: {
		...defaultStyles.text,
		fontSize: 17,
		fontWeight: '600',
		maxWidth: '80%',
	},
})
