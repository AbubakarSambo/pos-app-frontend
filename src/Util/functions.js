export function objectToQueryString(obj) {
  // Initialize an array to store key-value pairs of query parameters
  const queryParams = []

  // Iterate over the keys of the object
  for (const key in obj) {
    // Check if the value is not null or undefined
    if (obj[key] != null) {
      // Push the key-value pair to the array
      queryParams.push(`${key}=${obj[key]}`)
    }
  }

  // Join the array elements with '&' and prepend with '?' to form the query string
  return '?' + queryParams.join('&')
}

export function formatNumberWithCommas(value) {
  // Convert the number to a string and split it into parts before and after the decimal point
  const [integerPart, decimalPart] = parseInt(value, 10).toFixed(2).split('.')

  // Add commas for thousands and millions
  let formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // Add the Nigerian Naira currency symbol
  formattedIntegerPart = `₦ ${formattedIntegerPart}`

  // Add back the decimal part if it exists
  const formattedValue = decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart

  return formattedValue
}

export function getCurrentWeekDates() {
  const today = new Date()
  const dayOfWeek = today.getDay() // 0 (Sunday) to 6 (Saturday)

  // Calculate start date
  const startDate = new Date(today) // Clone the current date
  startDate.setDate(today.getDate() - dayOfWeek) // Set to the first day of the week (Sunday)
  startDate.setHours(0, 1, 0, 0) // Set time to 12:01 am (00:01)

  // Calculate end date
  const endDate = new Date(today) // Clone the current date
  endDate.setDate(today.getDate() + (6 - dayOfWeek)) // Set to the last day of the week (Saturday)
  endDate.setHours(23, 59, 59, 999) // Set time to 11:59:59.999 pm

  return { startDate, endDate }
}
