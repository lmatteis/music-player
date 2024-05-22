import { colors, fontSize } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { StyleSheet, ViewProps } from 'react-native'

export const PlayerProgressBar = ({ style }: ViewProps) => {
	return null
}

const styles = StyleSheet.create({
	timeRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'baseline',
		marginTop: 20,
	},
	timeText: {
		...defaultStyles.text,
		color: colors.text,
		opacity: 0.75,
		fontSize: fontSize.xs,
		letterSpacing: 0.7,
		fontWeight: '500',
	},
})
