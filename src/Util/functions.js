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
