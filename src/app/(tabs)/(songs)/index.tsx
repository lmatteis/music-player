import graphqlResponse from '@/assets/data/graphql-response.json'
import { TracksList } from '@/components/TracksList'
import { StopPropagation } from '@/components/utils/StopPropagation'
import { screenPadding } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { formatDateString, generateTracksListId } from '@/helpers/miscellaneous'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useTracks } from '@/store/library'
import { defaultStyles, utilsStyles } from '@/styles'
import { Entypo } from '@expo/vector-icons'
import { useMemo } from 'react'
import { ScrollView, SectionList, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'

function groupBy<T>(collection: T[], key: keyof T) {
	const groupedResult = collection.reduce((previous, current) => {
		if (!previous[current[key]]) {
			previous[current[key]] = [] as T[]
		}

		previous[current[key]].push(current)
		return previous
	}, {} as any) // tried to figure this out, help!!!!!
	return groupedResult
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 15, marginLeft: 0 }} />
)
const ItemSpacer = () => <View style={{ marginVertical: 5, marginLeft: 0 }} />

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

	const groupedData = groupBy(graphqlResponse.data.program.events, 'date')
	const groupedDatForSectionList = Object.keys(groupedData).map((key) => ({
		title: key,
		data: groupedData[key],
	}))

	console.log({ groupedDatForSectionList })

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

				<SectionList
					className="mt-10"
					sections={groupedDatForSectionList}
					keyExtractor={(item, index) => item + index}
					renderItem={({ item }) => (
						<View className="ml-16 flex flex-row items-center justify-between gap-4">
							<View className="flex-1">
								<Text className="text-white font-bold tracking-tight">{item.title}</Text>
								<Text className="text-xs text-white opacity-60 tracking-tighter">
									{item.subtitle}
								</Text>
							</View>
							<StopPropagation>
								<Entypo name="dots-three-horizontal" size={18} color="white" />
							</StopPropagation>
						</View>
					)}
					renderSectionHeader={({ section: { title } }) => (
						<Text className="absolute top-0 left-0 text-white opacity-60 font-bold text-sm w-14 tracking-tighter leading-tight">
							{formatDateString(title, 'en-US')}
						</Text>
					)}
					renderSectionFooter={ItemDivider}
					ItemSeparatorComponent={ItemSpacer}
				/>

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
