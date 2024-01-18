import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import fetchYoutubeVideos from '../api/youtubeAPI';
import { Button } from '../commons/Button';

interface Video {
  id: { videoId: string };
  snippet: { title: string };
}

const VideosList = () => {
  const maxResults : number = 10;
  const { channelId } = useParams<{ channelId: string | undefined }>();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [prevPage,setPrevPage] = useState('');
  const [nextPage,setNextPage] = useState('');
  const [currentPage,setCurrentPage] = useState('');
  //const [totalPages, setTotalPages] = useState(maxResults);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchYoutubeVideos(channelId, currentPage, maxResults);
        console.log(data.items);
        setVideos(data.items);
        //console.log(data);
        setPrevPage(data.prevPageToken);
        setNextPage(data.nextPageToken);
        //setTotalPages(Math.ceil(data.pageInfo.totalResults / data.pageInfo.resultsPerPage));
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        console.log('current: ',currentPage);
        console.log('prev: ',prevPage);
        console.log('next: ',nextPage);
        setLoading(false);
      }
    };

    fetchData();
  }, [channelId, currentPage]);

  return (
    <>
      <Link to="/account">
        <Button className="m-3 bg-primary-light text-primary-dark hover:bg-primary-extraLight hover:text-primary-dark">
          Back to channels search
        </Button>
      </Link>
      <div className="bg-secondary text-primary-dark flex flex-col justify-center items-center">
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="p-9 flex flex-col gap-2">
                <h2>Videos from the channel</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 p-10">
                  {videos.map((video) => (
                    <li key={video.id.videoId}>
                      <iframe
                        width="300"
                        height="200"
                        src={`https://www.youtube.com/embed/${video.id.videoId}`}
                        title={video.snippet.title}
                        allowFullScreen
                      ></iframe>
                      <p>{video.snippet.title}</p>
                    </li>
                  ))}                  
                </ul>
              </div>
            </>
          )}
          <div className='flex flex-row justify-evenly items-center mb-10'>
            
              <Button
                //value={prevPage}
                onClick={() => setCurrentPage(prevPage)}
                disabled={prevPage === ''  ? true : false}
              >
                Prev
              </Button>
              <Button
                //value={nextPage}
                onClick={() => setCurrentPage(nextPage)}
                disabled={nextPage === '' ?true : false}
              >
                Next
              </Button>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default VideosList;
