import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { getOrderPackage } from '../../api/order.api';
import { OrderPackage } from '../../interface/order.interface';
import { getAllPotograpyName } from '../../api/PotographyPackage.api';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const localizer = momentLocalizer(moment);

const AdminCalendar = () => {
  const [events, setEvents] = useState<OrderPackage[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<OrderPackage | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [responsePackageName, setResponsePackageName] = useState<any>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responsePackageName = await getAllPotograpyName();
        setResponsePackageName(responsePackageName);

        const response = await getOrderPackage();
        if (response.status !== 200) {
          throw new Error('Failed to fetch events');
        }
        const data: OrderPackage[] = response.data;
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, []);

  const handleEventClick = (event: OrderPackage) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
    setOpenDialog(false);
  };

  return (
    <div>
      <h1>לוח שנה של ההזמנות</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor={(event) => new Date(event.date)}
        endAccessor={(event) => new Date(event.date)}
        style={{ height: 500 }}
        onSelectEvent={handleEventClick}
      />
      <Dialog open={openDialog} onClose={handleClosePopup}>
        <DialogTitle style={{marginTop: '30px'}}>
          {selectedEvent && responsePackageName && responsePackageName[selectedEvent.packageId] ? responsePackageName[selectedEvent.packageId].type : 'Loading...'}
          <IconButton aria-label="close" onClick={handleClosePopup} style={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <p>userid: {selectedEvent?.userid}</p>
          <p>beginingHour: {selectedEvent?.beginingHour}</p>
          <p>endHour: {selectedEvent?.endHour}</p>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default AdminCalendar;
