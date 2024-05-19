import { useEffect, useState } from 'react'
import Async, { useAsync } from 'react-select/async'
import { genericFetch } from '../../services/api'

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: 'black',
  }),
}

const AsyncSource = ({ source, onChange }) => {
  const [orderSource, setOrderSource] = useState({ label: '' })

  useEffect(() => {
    setOrderSource(source)
  }, [source])

  const loadOptions = async () => {
    const { data } = await genericFetch('/order-sources')
    return data?.map((orderSource) => {
      return {
        label: orderSource.name,
        value: orderSource.id,
      }
    })
  }

  const handleSelectionChange = (selectedOption) => {
    setOrderSource(selectedOption)
    onChange(selectedOption)
  }

  return (
    <>
      Source
      <Async
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        styles={customStyles}
        onChange={handleSelectionChange}
        value={orderSource}
      />
    </>
  )
}

export default AsyncSource
