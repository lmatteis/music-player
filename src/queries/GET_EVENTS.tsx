import { gql } from '@apollo/client'

export const GET_EVENTS = gql`
	query eventsQuery(
		$site: String
		$size: Int = 100
		$gteStartDateTime: String
		$lteStartDateTime: String
		$searchAfter: [String]
		$location: [Int]
		$subBrand: [Int]
		$contentCategory: [Int]
		$highlight: Boolean = false
	) {
		program(
			site: $site
			size: $size
			gteStartDateTime: $gteStartDateTime
			lteStartDateTime: $lteStartDateTime
			searchAfter: $searchAfter
			location: $location
			subBrand: $subBrand
			contentCategory: $contentCategory
			highlight: $highlight
		) {
			__typename
			events {
				__typename
				id
				uri
				title
				startDateTime
				date
				subtitle
				sort
				eventStatus
				highlight
				supportAct
				announceSupport
				soldOut
				location {
					id
					title
				}
				image {
					mobile
					mobile2x
					mobileWebp
					mobile2xWebp
					tablet
					tablet2x
					tabletWebp
					tablet2xWebp
					desktop
					desktop2x
					desktopWebp
					desktop2xWebp
					desktopL
					desktopL2x
					desktopLWebp
					desktopL2xWebp
					desktopXL
					desktopXL2x
					desktopXLWebp
					desktopXL2xWebp
					type
				}
			}
		}
	}
`
