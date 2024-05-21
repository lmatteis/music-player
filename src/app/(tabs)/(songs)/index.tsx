import { TracksList } from '@/components/TracksList'
import { screenPadding } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTracksListId } from '@/helpers/miscellaneous'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useTracks } from '@/store/library'
import { defaultStyles } from '@/styles'
import { useMemo } from 'react'
import { ScrollView, View } from 'react-native'
import FastImage from 'react-native-fast-image'

const SongsScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Search',
		},
	})

	const tracks = useTracks()

	const filteredTracks = useMemo(() => {
		if (!search) return tracks

		return tracks.filter(trackTitleFilter(search))
	}, [search, tracks])

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<View className="h-96 flex-row">
					<View className="w-[70%]">
						<FastImage
							source={{
								uri: 'https://assets.paradiso.nl/images/transforms/event/_1200x900_crop_center-center_none/2256178/Pommelien-Cropped.webp',
								priority: FastImage.priority.normal,
							}}
							style={{
								width: '100%',
								height: '70%',
							}}
						/>
						<View className="flex-row h-[30%] w-full">
							<FastImage
								source={{
									uri: 'https://assets.paradiso.nl/images/transforms/event/_800x800_crop_center-center_none/2256199/file-1.webp',
									priority: FastImage.priority.normal,
								}}
								style={{
									width: '50%',
									height: '100%',
								}}
							/>
							<FastImage
								source={{
									uri: 'https://assets.paradiso.nl/images/transforms/event/_800x800_crop_center-center_none/2236764/JBEAN-2024-TraumaticLivelihoodNATour-Photo-HiRes-Retouched-Pink.webp',
									priority: FastImage.priority.normal,
								}}
								style={{
									width: '50%',
									height: '100%',
								}}
							/>
						</View>
					</View>
					<View className="w-[30%]">
						<FastImage
							source={{
								uri: 'https://assets.paradiso.nl/images/transforms/event/_800x800_crop_center-center_none/2256253/TheMysterines-web.webp',
								priority: FastImage.priority.normal,
							}}
							style={{
								width: '100%',
								height: '50%',
							}}
						/>
						<FastImage
							source={{
								uri: 'https://assets.paradiso.nl/images/transforms/event/_800x1200_crop_center-center_none/2244543/HATH_CA_X100F_6565-1.webp',
								priority: FastImage.priority.normal,
							}}
							style={{
								width: '100%',
								height: '50%',
							}}
						/>
					</View>
				</View>

				<TracksList
					id={generateTracksListId('songs', search)}
					tracks={filteredTracks}
					scrollEnabled={false}
				/>
			</ScrollView>
		</View>
	)
}

export default SongsScreen
