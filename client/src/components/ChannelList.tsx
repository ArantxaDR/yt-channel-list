import { useState, useEffect } from 'react';
import { Item } from '../types/searchTypes';
import ApiSearch from '../api/youtubeSearch';
import { Link } from 'react-router-dom';

interface Channel {
  id: string;
  title: string;
  thumbnail: string;
}

const ChannelList = () => {
  const [query, setQuery] = useState<string>('');
  const [channels,setChannels] = useState<Channel[]>([]);

  const apiKey = 'AIzaSyBgHxU0iJbAeECtaz6sj1jLfxaX3ra3ZPg';

  useEffect(() => {
    if (query.trim() === '') return;

    const fetchData = async () => {
      try {
        const response = await ApiSearch(query);

        setChannels(
          response.data.items.map((item: Item) => ({
            id: item.id.channelId,
            title: item.snippet.channelTitle,
            thumbnail: item.snippet.thumbnails.default.url,
          }))
        );
      } catch (error) {
        console.error('Error fetching data from YouTube API:', error);
      }
    };

    fetchData();
    console.log('Query', query);

  }, [query, apiKey]);
  
  return (
    <>
      <form className="bg-primary text-primary-dark p-9 flex justify-center items-center">
        <input
          className="bg-secondary text-primary-dark rounded-lg border border-primary shadow-inner shadow-primary-light p-2 w-72 focus:border-primary-dark outline-none"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for videos..."
        />
      </form>

      <ul className="grid gap-4 grid-cols-4 bg-primary p-9">
        {channels.map((channel) => (
          <li key={channel.id}>
            <Link to={`/videos-list/${channel.id}`} >
            <img
              className="w-56 h-56 object-cover"
              src={channel.thumbnail}
              alt={channel.title}
            />
              <p>{channel.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChannelList;
