import { useEffect, useState } from 'react'
import Async, { useAsync } from 'react-select/async'
import { genericFetch } from '../../services/api'

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: 'black',
  }),
}

const AsyncCustomer = ({ customer, onChange }) => {
  const [customerToEdit, setCustomer] = useState(customer ?? { label: '' })

  useEffect(() => {
    setCustomer(customer)
  }, [customer])

  const loadOptions = async (inputValue) => {
    const { data } = await genericFetch('/customers/search', { query: inputValue })
    return data?.map((customer) => {
      return {
        label: `${customer.firstName} ${customer.lastName}`,
        value: customer.id,
      }
    })
  }

  const handleSelectionChange = (selectedOption) => {
    setCustomer(selectedOption)
    onChange(selectedOption)
  }

  return (
    <>
      Customer Name
      <Async
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        styles={customStyles}
        onChange={handleSelectionChange}
        value={customerToEdit}
      />
    </>
  )
}

export default AsyncCustomer
