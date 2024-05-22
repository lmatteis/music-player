import { utilsStyles } from '@/styles'
import { FlatListProps, View } from 'react-native'

export type TracksListProps = Partial<FlatListProps<any>> & {
	id: string
	tracks: any[]
	hideQueueControls?: boolean
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

export const TracksList = ({
	id,
	tracks,
	hideQueueControls = false,
	...flatlistProps
}: TracksListProps) => {
	return null
}
