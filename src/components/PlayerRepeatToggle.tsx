import { useTrackPlayerRepeatMode } from '@/hooks/useTrackPlayerRepeatMode'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ComponentProps } from 'react'

type IconProps = Omit<ComponentProps<typeof MaterialCommunityIcons>, 'name'>
type IconName = ComponentProps<typeof MaterialCommunityIcons>['name']

export const PlayerRepeatToggle = ({ ...iconProps }: IconProps) => {
	return null

	const { repeatMode, changeRepeatMode } = useTrackPlayerRepeatMode()
}
