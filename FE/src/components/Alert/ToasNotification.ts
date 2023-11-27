import { toast, ToastContainer } from 'react-toastify';

export const loadingMsg = () => {
  toast.dismiss();
  toast.loading('Please wait...');
};

export const successMsg = (msg: string) => {
  toast.dismiss();
  toast.success(msg, {
    autoClose: 1000
  });
};

export const errorMsg = (msg: string) => {
  toast.dismiss();
  toast.error(msg);
};
