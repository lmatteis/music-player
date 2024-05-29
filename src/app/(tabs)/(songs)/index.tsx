import { StopPropagation } from '@/components/utils/StopPropagation'
import { screenPadding } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { formatDateString } from '@/helpers/miscellaneous'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useTracks } from '@/store/library'
import { defaultStyles, utilsStyles } from '@/styles'
import { useQuery } from '@apollo/client'
import { Entypo } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useMemo } from 'react'
import { ActivityIndicator, SectionList, Text, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { GET_EVENTS } from '../../../queries/GET_EVENTS'

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

const getCurrentDate = () => {
	const today = new Date()
	const year = today.getFullYear()
	const month = String(today.getMonth() + 1).padStart(2, '0') // Months are zero-based, so add 1
	const day = String(today.getDate()).padStart(2, '0')
	return `${year}-${month}-${day}`
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

	const router = useRouter()
	const tracks = useTracks()

	const { data, error, loading, fetchMore } = useQuery(GET_EVENTS, {
		variables: {
			site: 'paradisoEnglish',
			size: 50,
			gteStartDateTime: getCurrentDate(),
			lteStartDateTime: null,
			searchAfter: null,
			location: null,
			subBrand: null,
			contentCategory: null,
		},
	})

	const filteredTracks = useMemo(() => {
		if (!search) return tracks

		return tracks.filter(trackTitleFilter(search))
	}, [search, tracks])

	const handleEventSelect = async (selectedEvent) => {
		router.push(`/(modals)/events/${selectedEvent.id}`)
	}

	console.log({ data })

	if (!data) return null

	const groupedData = groupBy(data.program.events, 'date')
	const groupedDatForSectionList = Object.keys(groupedData).map((key) => ({
		title: key,
		data: groupedData[key],
	}))

	return (
		<View style={defaultStyles.container} className="bg-black">
			<SectionList
				className="mt-10"
				contentInsetAdjustmentBehavior="automatic"
				style={{
					paddingHorizontal: screenPadding.horizontal,
				}}
				sections={groupedDatForSectionList}
				keyExtractor={(item, index) => item + index}
				renderItem={({ item }) => (
					<TouchableHighlight
						underlayColor={defaultStyles.container.backgroundColor}
						onPress={() => handleEventSelect(item)}
					>
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
					</TouchableHighlight>
				)}
				renderSectionHeader={({ section: { title } }) => (
					<Text className="absolute top-0 left-0 text-white opacity-60 font-bold text-sm w-14 tracking-tighter leading-tight">
						{formatDateString(title, 'en-US')}
					</Text>
				)}
				renderSectionFooter={ItemDivider}
				ItemSeparatorComponent={ItemSpacer}
				ListHeaderComponent={() => (
					<View className="h-96 flex-row mb-10">
						<View className="w-[70%]">
							<Image
								source={{
									uri: 'https://assets.paradiso.nl/images/transforms/event/_1200x900_crop_center-center_none/2256178/Pommelien-Cropped.webp',
								}}
								style={{
									width: '100%',
									height: '70%',
								}}
							/>
							<View className="flex-row h-[30%] w-full">
								<Image
									source={{
										uri: 'https://assets.paradiso.nl/images/transforms/event/_800x800_crop_center-center_none/2256199/file-1.webp',
									}}
									style={{
										width: '50%',
										height: '100%',
									}}
								/>
								<Image
									source={{
										uri: 'https://assets.paradiso.nl/images/transforms/event/_800x800_crop_center-center_none/2236764/JBEAN-2024-TraumaticLivelihoodNATour-Photo-HiRes-Retouched-Pink.webp',
									}}
									style={{
										width: '50%',
										height: '100%',
									}}
								/>
							</View>
						</View>
						<View className="w-[30%]">
							<Image
								source={{
									uri: 'https://assets.paradiso.nl/images/transforms/event/_800x800_crop_center-center_none/2256253/TheMysterines-web.webp',
								}}
								style={{
									width: '100%',
									height: '50%',
								}}
							/>
							<Image
								source={{
									uri: 'https://assets.paradiso.nl/images/transforms/event/_800x1200_crop_center-center_none/2244543/HATH_CA_X100F_6565-1.webp',
								}}
								style={{
									width: '100%',
									height: '50%',
								}}
							/>
						</View>
					</View>
				)}
				ListFooterComponent={() => (
					<View className="mb-10">
						<ActivityIndicator className="text-white" />
					</View>
				)}
				onEndReached={(_data) =>
					fetchMore({
						variables: { searchAfter: data.program.events[data.program.events.length - 1].sort },
					})
				}
			/>
		</View>
	)
}

export default SongsScreen
