import { Link } from '@inertiajs/react';
import Header from '@/Layouts/Header';

function Home() {
  let weatherInfors = [
    {
      name: 'Độ ẩm',
      value: '80%'
    },
    {
      name: 'Nhiệt độ',
      value: '32° C'
    },
    {
      name: 'Lịch sử nhiệt độ',
      value:
        <div>
          <div className='py-2'>
            <i className="fa-solid fa-arrow-up text-red-300 pr-2 font-bold"></i>
            <span>32° C</span>
          </div>
          <div>
            <i className="fa-solid fa-arrow-down text-cyan-300 pr-2 font-bold"></i>
            <span>25° C</span>
          </div>
        </div>
    },
    {
      name: 'Thống kê',
      value:
        <div>
          <i className="fa-solid fa-chart-line"></i>
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
  const weatherStatus = ['Có nắng', 'Nắng nhẹ', 'Ít mây', 'Nắng nhẹ', 'Nhiều mây', 'Có mây', 'Nhiều mây'];

  if (hours >= 18 || hours <= 5) {
    status = 'Ban đêm';
  }

  function formatTime(day, hours, minutes) {
    const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];

    const period = hours >= 12 ? 'PM' : 'AM';

    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${days[day]}, ${hours}:${formattedMinutes} ${period}`;
  }

  return (
    <Header title='Thời tiết hôm nay'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='bg-white rounded-2xl flex items-center justify-center'>
          <div className='bg-weather-img bg-cover w-full h-full rounded-2xl shadow-lg shadow-cyan-300/50'>
            <div className='w-44 h-44 mr-auto ml-auto'>
              <img src={`https://www.accuweather.com/images/weathericons/${day}.svg`} alt="Weather Icon" />
            </div>

            <div className='text-center text-white text-xl'>
              <p className='font-bold text-4xl '>{weatherInfors[1].value}</p>
              <p className='text-xl p-4'>{weatherStatus[day]}</p>

              <div className='border-b-2 w-40 mr-auto ml-auto'></div>

              <div className='p-4'>
                <p>{date + ' Tháng ' + month + ' ' + year}</p>
                <p>{formatTime(day, hours, minutes)}</p>
                <p>{status}</p>
              </div>

              <p className='text-xl p-4'>Thành phố Hồ Chí Minh, Việt Nam</p>
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
                  <p className='text-lg text-slate-200'>{weatherInfor.name}</p>
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