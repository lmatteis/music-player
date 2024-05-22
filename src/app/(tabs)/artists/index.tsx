import { defaultStyles, utilsStyles } from '@/styles'
import { StyleSheet, View } from 'react-native'

const ItemSeparatorComponent = () => {
	return <View style={[utilsStyles.itemSeparator, { marginLeft: 50, marginVertical: 12 }]} />
}

const ArtistsScreen = () => {
	return null
}

const styles = StyleSheet.create({
	artistItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
	},
	artistImage: {
		borderRadius: 32,
		width: 40,
		height: 40,
	},
	artistNameText: {
		...defaultStyles.text,
		fontSize: 17,
		maxWidth: '80%',
	},
})

export default ArtistsScreen
