export const formatSecondsToMinutes = (seconds: number) => {
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = Math.floor(seconds % 60)

	const formattedMinutes = String(minutes).padStart(2, '0')
	const formattedSeconds = String(remainingSeconds).padStart(2, '0')

	return `${formattedMinutes}:${formattedSeconds}`
}

export const generateTracksListId = (trackListName: string, search?: string) => {
	return `${trackListName}${`-${search}` || ''}`
}

export function formatDateString(dateString: string, locale: string): string {
	// Create a Date object from the input string
	const date = new Date(dateString)

	// Define options for the date format
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'short',
		day: 'numeric',
		month: 'short',
	}

	// Create a formatter using the specified locale
	const formatter = new Intl.DateTimeFormat(locale, options)

	// Format the date and return the result
	return formatter.format(date)
}
