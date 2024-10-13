import React, { useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import { CreateModal } from '../../components/CreateModal'
import { BookingForm } from '../../components/forms/BookingForm'
import { genericFetch } from '../../services/api'
import { saveBooking, updateBooking } from './services/api'

const locales = {
  'en-US': enUS,
}
const ITEMS_PER_PAGE = 100

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
})

const MyBigCalendar = () => {
  const [events, setEvents] = useState([])
  const [filterParams, setFilterParams] = useState({
    skip: 0,
    take: ITEMS_PER_PAGE,
  })

  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [bookingFormData, setBookingFormData] = useState({
    title: '',
    start: '',
    end: '',
    confirmed: false,
    id: null,
  })
  const [isInEditMode, setIsInEditMode] = useState(false)
  const [activeEvent, setActiveEvent] = useState({})

  useEffect(() => {
    genericFetch('/bookings', filterParams).then(({ data }) => {
      const events = data.map((event) => {
        return {
          title: event.title,
          start: new Date(event.start),
          end: new Date(event.end),
          confirmed: event.confirmed,
          id: event.id,
        }
      })
      setEvents(events)
    })
  }, [filterParams])

  const handleSelectSlot = (slot) => {
    setBookingModalOpen(true)
    setBookingFormData({
      ...bookingFormData,
      start: slot.slots[0],
      end: slot.slots[slot.slots.length - 1],
    })
  }
  const handleSelectEvent = (event) => {
    setBookingModalOpen(true)
    setIsInEditMode(true)
    setActiveEvent(event)
    setBookingFormData(event)
  }
  const handlePressMore = (moreEvents) => {}
  const handleClose = () => {
    setBookingFormData({})
    setBookingModalOpen(false)
    setActiveEvent({})
    setIsInEditMode(false)
  }
  const handleSubmit = () => {
    const newEndDate = new Date(bookingFormData.end)
    newEndDate.setDate(newEndDate.getDate() + 1)
    if (!isInEditMode) {
      saveBooking({ ...bookingFormData, end: newEndDate }).then(({ data }) => {
        setActiveEvent({})
        setBookingFormData({})
        setBookingModalOpen(false)
        setEvents([
          ...events,
          {
            title: data.title,
            start: new Date(data.start),
            end: new Date(data.end),
            confirmed: data.confirmed,
            id: data.id,
          },
        ])
      })
    } else {
      updateBooking({ ...bookingFormData, end: newEndDate }).then(({ data }) => {
        setBookingFormData({})
        setActiveEvent({})
        setBookingModalOpen(false)
        const updatedEvents = events.map((event) => {
          return event.id === data.id
            ? {
                title: data.title,
                start: new Date(data.start),
                end: new Date(data.end),
                confirmed: data.confirmed,
                id: data.id,
              }
            : event
        })
        setEvents(updatedEvents)
      })
    }
    setActiveEvent({})
  }
  const handleChange = (e) => {
    if (e.target?.name) {
      const { name, value } = e.target
      if (name !== 'confirm') {
        setBookingFormData({ ...bookingFormData, [name]: value })
      } else {
        setBookingFormData({ ...bookingFormData, confirmed: !bookingFormData.confirmed })
      }
    }
  }
  const handleDateChange = (value, title) => {
    setBookingFormData({ ...bookingFormData, [title]: value })
  }

  return (
    <>
      <div style={{ height: '500px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          onShowMore={handlePressMore}
          endAccessor="end"
          defaultView="month"
          views={['month']}
          selectable
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          style={{ height: 600 }}
          eventPropGetter={(event) => {
            let style = { backgroundColor: '#a07ae3' }
            if (event.confirmed) {
              style.backgroundColor = '#4CAF50'
            } else {
              style.backgroundColor = '#FFC107'
            }
            return { style }
          }}
          messages={{ more: 'more' }}
        />
      </div>
      <CreateModal
        visible={bookingModalOpen}
        title="Create Booking"
        handleClose={handleClose}
        body={
          <BookingForm
            handleDateChange={handleDateChange}
            data={bookingFormData}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        }
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default MyBigCalendar
