import { useState, useEffect } from 'react';
import { formatTime } from '@/Utilities/function';

const Time = () => {
  const [time, setTime] = useState({
    date: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    day: new Date().getDay(),
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    status: 'Ban ngày',
  });

  const updateTime = () => {
    const dateObj = new Date();
    const hours = dateObj.getHours();

    setTime({
      date: dateObj.getDate(),
      month: dateObj.getMonth() + 1,
      year: dateObj.getFullYear(),
      day: dateObj.getDay(),
      hours: hours,
      minutes: dateObj.getMinutes(),
      status: (new Date().getHours() >=18 || new Date().getHours() <= 5)? 'Ban đêm' : 'Ban ngày',
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      updateTime();
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <p className='pb-2'>{time.date + ' Tháng ' + time.month + ' ' + time.year}</p>
      <p className="pb-2">{formatTime(time.day, time.hours, time.minutes)}</p>
      <p>{time.status}</p>
    </div>
  );
};

export default Time;
