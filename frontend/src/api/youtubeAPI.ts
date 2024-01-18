import axios from 'axios';
import { YOUTUBE_API_URL } from '../constants/constants';
import { Videos } from '../types/videoTypes';

const apiKey = 'AIzaSyCYVo4lvpZU6XjSc8I0ghLxS4F0LfdpVto';
const fetchYoutubeVideos = async (channelId: string, pageToken?: string, resultsPerPage?: number):Promise<Videos> => {
  const geChannelVideos = await axios
    .get(
      `${YOUTUBE_API_URL}search?part=snippet&channelId=${channelId}&maxResults=${resultsPerPage}&pageToken=${pageToken}&type=video&key=${apiKey}`, 
      
    )
    .then((response) => {
      console.log('response', response.data);
      return response.data;
      
    }); 
  return geChannelVideos;

};

export default fetchYoutubeVideos;
