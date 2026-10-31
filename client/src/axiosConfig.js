import axios from 'axios';


axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response && error.response.status === 403) {
            localStorage.removeItem('token');
            window.location.href ='/login?expired=true';
        }
        return Promise.reject(error);
    }
);



