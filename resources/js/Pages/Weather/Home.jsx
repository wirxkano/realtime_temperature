import { Link } from '@inertiajs/react';
import Header from '@/Layouts/Header';
import { useEffect, useState } from 'react';
import { formatTime, capitalizeFirstLetter, isEmpty } from '@/Utilities/function';
import Loading from '@/Components/Loading';
import axios from "axios";

function Home() {
  const [locationInfor, setLocationInfor] = useState({});

  let weatherInfors = [
    {
      name: 'Độ ẩm',
      value: locationInfor?.main?.humidity + '%'
    },
    {
      name: 'Nhiệt độ',
      value: Math.round(locationInfor?.main?.temp) + '° C'
    },
    {
      name: 'Lịch sử nhiệt độ',
      value:
        <div>
          <div className='py-2'>
            <i className="fa-solid fa-arrow-up text-red-300 pr-2 font-bold"></i>
            <span>{Math.round(locationInfor?.main?.temp_max) + '° C'}</span>
          </div>
          <div>
            <i className="fa-solid fa-arrow-down text-cyan-300 pr-2 font-bold"></i>
            <span>{Math.round(locationInfor?.main?.temp_min) + '° C'}</span>
          </div>
        </div>
    },
    {
      name: 'Thống kê',
      value:
        <div>
          <i className="fa-solid fa-chart-line text-4xl py-2"></i>
        </div>
    }
  ]

  const dateObj = new Date();
  let date = dateObj.getDate();
  let month = dateObj.getMonth() + 1;
  let year = dateObj.getFullYear();
  let day = dateObj.getDay();
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  let status = 'Ban ngày';

  if (hours >= 18 || hours <= 5) {
    status = 'Ban đêm';
  }

  useEffect(() => {
    async function getLocation() {
      axios.get('/weather')
        .then(response => {
          setLocationInfor(response.data);
          console.log("🚀 ~ getLocation ~ response.data:", response.data)
        })
        .catch(error => {
          console.error(error);
        });
    }

    getLocation();
  }, [])

  if (isEmpty(locationInfor)) {
    return (
      <div className='flex items-center justify-center'>
        <Loading type='spin' color='#83dcf7' />
      </div>
    )
  }

  return (
    <Header title='Thời tiết hôm nay'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='bg-white rounded-2xl flex items-center justify-center'>
          <div className='bg-weather-img bg-cover w-full h-full rounded-2xl shadow-lg shadow-cyan-300/50'>
            <div >
              <img 
                className='mr-auto ml-auto w-44 h-44'
                src={`https://openweathermap.org/img/wn/${locationInfor.weather[0].icon}@2x.png`} 
                alt="Weather Icon" 
              />
            </div>

            <div className='text-center text-white text-xl'>
              <p className='font-bold text-4xl '>{Math.round(locationInfor.main.temp)}° C</p>
              <p className='text-xl p-4'>{capitalizeFirstLetter(locationInfor.weather[0].description)}</p>

              <div className='border-b-2 w-40 mr-auto ml-auto'></div>

              <div className='p-4'>
                <p className='pb-2'>{date + ' Tháng ' + month + ' ' + year}</p>
                <p className='pb-2'>{formatTime(day, hours, minutes)}</p>
                <p>{status}</p>
              </div>

              <p className='text-xl p-4'>{locationInfor.name}, {locationInfor.sys.country}</p>
            </div>
          </div>

        </div>

        <div className='grid grid-cols-2 gap-4'>
          {weatherInfors.map((weatherInfor, index) => (
            <div
              key={index}
              className='bg-sky-400 rounded-2xl text-white h-50 shadow-lg shadow-sky-500/40 hover:bg-sky-500 cursor-pointer'
            >
              <Link
                href={weatherInfor.name === 'Thống kê' ? '/statistic' : '#'}
              >
                <div className='w-full h-full p-10'>
                  <p className='text-xl text-slate-200'>{weatherInfor.name}</p>
                  <div className='text-3xl'>{weatherInfor.value}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Header>
  );
}

export default Home;