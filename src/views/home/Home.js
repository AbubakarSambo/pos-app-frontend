import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import { CChart } from '@coreui/react-chartjs'
import { CCard, CCardBody, CCol, CRow, CCardHeader } from '@coreui/react'
import { genericFetch } from '../../services/api'
import { getCurrentWeekDates } from '../../Util/functions'

const Home = () => {
  const [dailyStats, setDailyStats] = useState([0, 0, 0, 0, 0, 0, 0])
  const [dates, setDates] = useState({ startDate: null, endDate: null })

  useEffect(() => {
    const { startDate, endDate } = getCurrentWeekDates()
    setDates({
      startDate,
      endDate,
    })
  }, [])
  useEffect(() => {
    genericFetch('/daily-stats', dates).then(({ data }) => {
      setDailyStats(data)
    })
  }, [dates])

  const handleStartDateSelect = (date) => {
    console.log({ date })
  }
  const handleStartDateChange = (date) => {
    console.log({ date })
    setDates({
      ...dates,
      startDate: date,
    })
  }
  const handleEndDateSelect = (date) => {
    console.log({ date })
  }
  const handleEndDateChange = (date) => {
    console.log({ date })
    setDates({
      ...dates,
      endDate: date,
    })
  }
  return (
    <CCard className="mb-4">
      <CCardBody>
        <CRow>
          <CCol xs>
            <CCard className="mb-4">
              <CCardHeader>Daily Sales</CCardHeader>
              <CCardBody>
                <DatePicker
                  selected={dates?.startDate}
                  onSelect={handleStartDateSelect} //when day is clicked
                  onChange={handleStartDateChange} //only when value has changed
                />
                {` --- `}
                <DatePicker
                  selected={dates?.endDate}
                  onSelect={handleEndDateSelect} //when day is clicked
                  onChange={handleEndDateChange} //only when value has changed
                />
                <CChart
                  type="bar"
                  data={{
                    labels: [
                      'Sunday',
                      'Monday',
                      'Tuesday',
                      'Wednesday',
                      'Thursday',
                      'Friday',
                      'Saturday',
                    ],
                    datasets: [
                      {
                        label: 'Sales (₦)',
                        backgroundColor: '#f87979',
                        data: dailyStats,
                      },
                    ],
                  }}
                  labels="Days"
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default Home
