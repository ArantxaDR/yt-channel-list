import axios from 'axios';
import { YOUTUBE_API_URL } from '../constants/constants';

const apiKey = 'AIzaSyCYVo4lvpZU6XjSc8I0ghLxS4F0LfdpVto';
const ApiSearch = async (search:string) => {
  const searchChannel = await axios
    .get(`${YOUTUBE_API_URL}search?part=snippet&maxResults=8&q=${search}&type=channel&key=${apiKey}`)
    .then((response) => {
      console.log(response);
      return response;
    });
  return searchChannel;
};

export default ApiSearch;