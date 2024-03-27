import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  try {
    const session = await axios(
      `/api/v1/bookings/checkout/${tourId}`,
    );

    window.location.href = session.data.session.url;
  } catch (err) {
    showAlert('error', err);
  }
};
