import axios from 'axios';

const { API_KEY, API_HOST } = process.env;

export const fetchallexercises = async () => {
    const options = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises',
        params: {
            limit: '100',
            offset: '0',
        },
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST,
        },
    };

    try {
        const response = await axios.request(options);
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const fetchExcercisesByID = async (id) => {
    const options = {
        method: 'GET',
        url: `https://exercise-db-fitness-workout-gym.p.rapidapi.com/exercise/${id}`,
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST,
        },
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(`Error al conseguir detalles del ejercicio ${id}`, error);
    }
};
