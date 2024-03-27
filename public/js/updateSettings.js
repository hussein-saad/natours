import axios from 'axios';
import { showAlert } from './alerts';
import {logout} from './login';

export const updateData = async (data) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/updateMe',
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'data updated successfully');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const updatePassword = async (
  currentPassword,
  password,
  passwordConfirm,
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/updatePassword',
      data: {
        currentPassword,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'password updated successfully');
      logout(); 
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
