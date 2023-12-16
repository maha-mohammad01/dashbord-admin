// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import moment from 'moment'; // تأكد من تثبيت مكتبة moment باستخدام npm install moment أو yarn add moment
// import GroundTable from './GroundTable';

// const Bookingground = () => {
//   const [formBookingData, setFormBookingData] = useState([]);

//   // useEffect(() => {
//   //   // Fetch data from the API endpoint
//     // axios.get('http://localhost:2000/bookings-info')
//   //     .then(response => {
//   //       // Assuming the response data is an array
//   //       setFormBookingData(response.data);
//   //     })
//   //     .catch(error => console.error('Error fetching data:', error));
//   // }, []);


//   const fetchData = async () => {
//     try {
//       const authToken = getAuthToken();
//       console.log('Authentication Token:', authToken); // Log the token to the console
  
//       const response = await axios.get('http://localhost:2000/bookings-info', {
//         headers: {
//           Authorization: `${authToken}`,
//         },
//       });
  
//       setUsersData(response.data.users); // تحديث usersData بدلاً من userData
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };




//   return (
//     <div className="-my-2 py-2 overflow-x-auto pr-10 lg:px-8 ml-52">
//         <h1 className='font-bold text-2xl'>User Booking playground</h1>
//       <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">

//       </div>
//       <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard pl-11 pt-3 rounded-bl-lg rounded-br-lg">
//         <table className="min-w-full">
//           <thead>
//             <tr>
//               <th className="pl-16 py-5 border-b-2 border-gray-300 text-left text-sm leading-4 text-emerald-500 tracking-wider">Full Name</th>
//               <th className="pl-16 py-5 border-b-2 border-gray-300 text-left text-sm leading-4 text-emerald-500 tracking-wider">Phone</th>
//               <th className="px-16 py-5 border-b-2 border-gray-300 text-left text-sm leading-4 text-emerald-500 tracking-wider">Start Time</th>
//               <th className="px-16 py-5 border-b-2 border-gray-300 text-left text-sm leading-4 text-emerald-500 tracking-wider">End Time</th>
//               <th className="px-16 py-5 border-b-2 border-gray-300 text-left text-sm leading-4 text-emerald-500 tracking-wider">Notice</th>
//               <th className="px-16 py-5 border-b-2 border-gray-300 text-left text-sm leading-4 text-emerald-500 tracking-wider">Status</th>
//               <th className="px-16 py-5 border-b-2 border-gray-300 text-left text-sm leading-4 text-emerald-500 tracking-wider">Total Hours</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white">
//             {formBookingData.map((booking) => (
//               <tr key={booking.id}>
//                 <td className="px- py-3 whitespace-no-wrap border-b border-gray-500">
//                   <div className="text-sm leading-5 text-emerald-900">{booking.fullName}</div>
//                 </td>
//                 <td className="px-2 py-3 whitespace-no-wrap border-b border-gray-500">
//                   <div className="text-sm leading-5 text-emerald-900">{booking.phone}</div>
//                 </td>
//                 <td className="px-2 py-4 whitespace-no-wrap border-b text-emerald-900 border-gray-500 text-sm leading-5">{booking.startTime}</td>
//                 <td className="px-2 py-4 whitespace-no-wrap border-b text-emerald-900 border-gray-500 text-sm leading-5">{booking.endTime}</td>
//                 <td className="px-6 py-4 whitespace-no-wrap border-b text-emerald-900 border-gray-500 text-sm leading-5">{booking.notice}</td>
//                 <td className="px-2 py-4 whitespace-no-wrap border-b text-emerald-900 border-gray-500 text-sm leading-5">
//                   <span className={`relative inline-block px-3 py-1 font-semibold text-${booking.status === 'active' ? 'green' : 'red'}-900 leading-tight`}>
//                     <span aria-hidden className={`absolute inset-0 bg-${booking.status === 'active' ? 'green' : 'red'}-200 opacity-50 rounded-full`}></span>
//                     <span className="relative text-xs">{booking.status}</span>
//                   </span>
//                 </td>
//                 <td className="px-2 py-4 whitespace-no-wrap border-b text-emerald-900 border-gray-500 text-sm leading-5">
//                 {calculateTotalHours(booking.startTime, booking.endTime)} hours
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <GroundTable/>
//     </div>
    
//   );
// };

// const calculateTotalHours = (startTime, endTime) => {
//     const format = 'hh:mm A';
    
//     const start = moment(startTime, format);
//     const end = moment(endTime, format);
  
//     const diffInMinutes = end.diff(start, 'minutes');
//     const diffInHours = diffInMinutes / 60;
  
//     return diffInHours.toFixed(2);
//   };

// export default Bookingground;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Cookies from 'js-cookie';
import GroundTable from './GroundTable';

const Bookingground = () => {
  const [formBookingData, setFormBookingData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAuthToken = () => {
    const tokenFromCookie = Cookies.get('authToken');
    if (tokenFromCookie) {
      return tokenFromCookie;
    }
    return null;
  };

  const fetchData = async () => {
    try {
      const authToken = getAuthToken();
      console.log('Authentication Token:', authToken);

      const response = await axios.get('http://localhost:2000/bookings-info', {
        headers: {
          Authorization: `${authToken}`,
        },
      });

      setFormBookingData(response.data.bookings);
    } catch (error) {
      console.error('Error fetching booking data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to fetch data only once on component mount

  const calculateTotalHours = (startTime, endTime) => {
    const format = 'hh:mm A';
    const start = moment(startTime, format);
    const end = moment(endTime, format);
    const diffInMinutes = end.diff(start, 'minutes');
    const diffInHours = diffInMinutes / 60;
    return diffInHours.toFixed(2);
  };

  return (
    <div className="-my-2 py-2 overflow-x-auto pr-10 lg:px-8 ml-52">
      <h1 className='font-bold text-2xl'>User Booking playground</h1>
      <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12"></div>
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard pl-11 pt-3 rounded-bl-lg rounded-br-lg">
        <table className="min-w-full">
          <thead>
            <tr>
            <th className="pl-16 py-5 border-b-2 border-gray-300 text-left text-sm leading-4 text-emerald-500 tracking-wider">Stadium Id</th>
              <th className="pl-16 py-5 border-b-2 border-gray-300 text-left text-sm leading-4 text-emerald-500 tracking-wider">Full Name</th>
              <th className="pl-16 py-5 border-b-2 border-gray-300 text-left text-sm leading-4 text-emerald-500 tracking-wider">Phone</th>
              <th className="px-16 py-5 border-b-2 border-gray-300 text-left text-sm leading-4 text-emerald-500 tracking-wider">Start Time</th>
              <th className="px-16 py-5 border-b-2 border-gray-300 text-left text-sm leading-4 text-emerald-500 tracking-wider">End Time</th>
              <th className="px-16 py-5 border-b-2 border-gray-300 text-left text-sm leading-4 text-emerald-500 tracking-wider">Notice</th>
              <th className="px-16 py-5 border-b-2 border-gray-300 text-left text-sm leading-4 text-emerald-500 tracking-wider">Status</th>
              <th className="px-16 py-5 border-b-2 border-gray-300 text-left text-sm leading-4 text-emerald-500 tracking-wider">Total Hours</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {formBookingData.map((booking) => (
              <tr key={booking.booking_id}>
                                <td className="px- py-3 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-emerald-900">{booking.stadium_id}</div>
                </td>
                <td className="px- py-3 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-emerald-900">{booking.full_name}</div>
                </td>
                <td className="px-2 py-3 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-emerald-900">{booking.phone}</div>
                </td>
                <td className="px-2 py-4 whitespace-no-wrap border-b text-emerald-900 border-gray-500 text-sm leading-5">{booking.start_time}</td>
                <td className="px-2 py-4 whitespace-no-wrap border-b text-emerald-900 border-gray-500 text-sm leading-5">{booking.end_time}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-emerald-900 border-gray-500 text-sm leading-5">{booking.note}</td>
                <td className="px-2 py-4 whitespace-no-wrap border-b text-emerald-900 border-gray-500 text-sm leading-5">
                  <span className={`relative inline-block px-3 py-1 font-semibold text-${booking.status === 'active' ? 'green' : 'red'}-900 leading-tight`}>
                    <span aria-hidden className={`absolute inset-0 bg-${booking.status === 'active' ? 'green' : 'red'}-200 opacity-50 rounded-full`}></span>
                    <span className={`relative text-${booking.status === 'active' ? 'green' : 'red'}-900`}>{booking.status}</span>
                  </span>
                </td>
                <td className="px-2 py-4 whitespace-no-wrap border-b text-emerald-900 border-gray-500 text-sm leading-5">
                  {calculateTotalHours(booking.start_time, booking.end_time)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <GroundTable />
    </div>
  );
};

export default Bookingground;
