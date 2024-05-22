import { colors } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { StyleSheet, ViewProps } from 'react-native'

type QueueControlsProps = {
	tracks: Track[]
} & ViewProps

export const QueueControls = ({ tracks, style, ...viewProps }: QueueControlsProps) => {
	return null
}

const styles = StyleSheet.create({
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
