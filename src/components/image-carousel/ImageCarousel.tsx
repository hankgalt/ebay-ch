import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import ImageCard from '../image-card/ImageCard';
import { type MPhoto, fetchPhotos } from '../../lib/api';

type ImageCarouselProps = {
  limit: number;
};

const ImageCarousel = ({ limit }: ImageCarouselProps) => {
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [start, setStart] = useState(0);
  const [photos, setPhotos] = useState<MPhoto[]>([]);
  const [currList, setCurrList] = useState<MPhoto[]>(
    photos ? photos.slice(0, limit) : []
  );

  useEffect(() => {
    if (start !== 0 && photos.length > 0) {
      if (!loaded && start + (2 * limit) > photos.length) {
        setCurrPage(currPage + 1);
      }
    }
  }, [start]);

  useEffect(() => {
    setCurrList(
      photos
        ? start + limit < photos.length
          ? [...photos.slice(start, start + limit)]
          : [...photos.slice(start, photos.length - 1)]
        : []
    );
  }, [start, photos]);

  useEffect(() => {
    if (!loaded && currPage > 0 && !loading) {
      setLoading(true);
      fetchPhotos(dayjs().subtract(7, 'day').format('YYYY-MM-DD'), currPage)
        .then(dat => {
          if ((dat as Error).message) {
            setError((dat as Error).message);
            setLoading(false);
            setLoaded(true)
          } else {
            if ((dat as MPhoto[]).length > 0) {
              const newSet = [...photos].concat(dat as MPhoto[]);
              setPhotos(newSet);
            } else {
              setLoaded(true)
            }
            setError('');
            setLoading(false);
          }
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
          setLoaded(true)
        });
    }
  }, [currPage]);

  return (
    <div
      style={{
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {error !== '' && <span style={{ width: '100%' }}>{error}</span>}
      <div
        style={{
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {start > 0 && (
          <span
            style={{
              fontSize: '20px',
              textAlign: 'center',
              alignSelf: 'center',
              cursor: 'pointer',
              margin: '10px'
            }}
            onClick={() => setStart(start - 1)}
          >
            {'<<'}
          </span>
        )}
        <div style={{ width: '70%', display: 'flex', flexDirection: 'row'}}>
          {currList.length > 0 &&
            currList.map((pht: MPhoto) => (
              <ImageCard
                key={pht.id}
                photo={pht}
                height={'150px'}
                width={'150px'}
              />
            ))}
        </div>
        {start + limit < photos.length && (
          <span
            style={{
              fontSize: '20px',
              textAlign: 'center',
              alignSelf: 'center',
              cursor: 'pointer',
              margin: '10px'
            }}
            onClick={() => setStart(start + 1)}
          >
            {'>>'}
          </span>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;
