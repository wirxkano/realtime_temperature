import { Link } from '@inertiajs/react';
import Header from '@/Layouts/Header';
import { useEffect, useState } from 'react';
import { capitalizeFirstLetter, isEmpty } from '@/Utilities/function';
import Loading from '@/Components/Loading';
import Time from '@/Components/Time';
import axios from "axios";

function Home() {
  const [locationInfor, setLocationInfor] = useState({});
  const [weatherInfors, setWeatherInfors] = useState([]);
  const [temp, setTemp] = useState(null);

  let weatherIcons = {
    sunny: 'myImg/sunny.svg',
    clouds: 'myImg/clouds.svg',
    rain: 'myImg/north.svg'
  };

  const [weatherIcon, setWeatherIcon] = useState(weatherIcons.sunny);

  useEffect(() => {
    async function getLocation() {
      try {
        const response = await axios.get('/api/weather');
        setLocationInfor(response.data);
      } catch (error) {
        console.error("Error fetching location information:", error);
      }
    }

    getLocation();
  }, []);

  // Fetch weather information and set up polling
  useEffect(() => {
    async function getWeatherInfors() {
      try {
        const response = await axios.get('/api/get-sensor');
        setWeatherInfors([
          {
            name: 'Độ ẩm',
            value: Math.round(response.data.humidity) + '%',
            icon: <i className="fa-solid fa-droplet text-blue-300"></i>
          },
          {
            name: 'Nhiệt độ',
            value: Math.round(response.data.temperature) + '° C',
            icon: <i className="fa-solid fa-temperature-three-quarters text-red-400"></i>
          },
          {
            name: 'Ánh sáng',
            value: Math.round(response.data.light_level) + ' lux',
            icon: <i className="fa-regular fa-sun text-amber-400"></i>
          },
          {
            name: 'Thống kê',
            value: <div><i className="fa-solid fa-chart-line text-4xl py-2"></i></div>,
            icon: <i className="fa-solid fa-chart-simple text-amber-600"></i>
          }
        ]);
        setTemp(response.data.temperature);
      } catch (error) {
        console.error("Error fetching weather information:", error);
      }
    }

    // Initial fetch and set up interval
    getWeatherInfors();
    const interval = setInterval(getWeatherInfors, 60000);

    // Cleanup function to clear interval
    return () => clearInterval(interval);
  }, []);

  if (isEmpty(locationInfor)) {
    return (
      <div className='flex items-center justify-center min-h-svh'>
        <Loading type='spin' color='#83dcf7' />
      </div>
    )
  }

  return (
    <Header title='Thời tiết hôm nay'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='bg-white rounded-2xl flex items-center justify-center'>
          <div className='bg-weather-img bg-cover w-full h-full rounded-2xl shadow-lg shadow-slate-400'>
            <div >
              <img
                className='mr-auto ml-auto w-44 h-44'
                // src={`https://openweathermap.org/img/wn/${locationInfor.weather[0].icon}@2x.png`}
                src={weatherIcon}
                alt="Weather Icon"
              />
            </div>

            <div className='text-center text-gray-700 text-xl'>
              <p className='font-bold text-4xl '>{Math.round(temp)}° C</p>
              <p className='text-xl p-4'>{capitalizeFirstLetter(locationInfor.weather[0].description)}</p>

              <div className='border-b-2 w-40 mr-auto ml-auto border-gray-700'></div>

              <div className='p-4'>
                <Time />
              </div>

              <p className='text-xl p-4 text-gray-800'>{locationInfor.name}, {locationInfor.sys.country}</p>
            </div>
          </div>

        </div>

        <div className='grid grid-cols-2 gap-4'>
          {weatherInfors.map((weatherInfor, index) => (
            <div
              key={index}
              className='bg-gray-100 border-2 border-gray-200 rounded-2xl shadow-sm shadow-gray-400 hover:bg-gray-200 cursor-pointer'
            >
              {weatherInfor.name === 'Thống kê' ? (
                <Link
                  href='/statistic'
                >
                  <div className='w-full h-full p-10 text-gray-600'>
                    <span className='text-2xl'>{weatherInfor.name}</span>
                    <span className='ml-2'>{weatherInfor.icon}</span>
                    <div className='text-3xl text-gray-700 mt-2'>{weatherInfor.value}</div>
                  </div>
                </Link>
              ) : (
                <div>
                  <div className='w-full h-full p-10 text-gray-600'>
                    <span className='text-2xl'>{weatherInfor.name}</span>
                    <span className='ml-2'>{weatherInfor.icon}</span>
                    <div className='text-3xl text-gray-700 mt-2'>{weatherInfor.value}</div>
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </Header>
  );
}

export default Home;