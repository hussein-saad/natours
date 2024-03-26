import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  try {
    console.log(tourId);
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout/${tourId}`,
    );

    window.location.href = session.data.session.url;
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
