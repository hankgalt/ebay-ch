import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import ImageCard from '../image-card/ImageCard';
import Pagination from '../../components/pagination/Pagination';
import { type MPhoto, fetchPhotos } from '../../lib/api';

type ImagePanelProps = {
  limit: number;
  selectedDate: string;
};

const ImagePanel = ({ selectedDate, limit }: ImagePanelProps) => {
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [start, setStart] = useState(0);
  const [photos, setPhotos] = useState<{ [key: string]: MPhoto[] }>(
    selectedDate !== '' ? { [selectedDate]: [] } : {}
  );
  const [currList, setCurrList] = useState<MPhoto[]>(
    selectedDate !== '' &&
      photos[selectedDate] &&
      photos[selectedDate].length > 0
      ? photos[selectedDate].slice(0, limit)
      : []
  );

  useEffect(() => {
    const newSet = photos[selectedDate] ? [...photos[selectedDate]] : [];
    setPhotos({
      ...photos,
      [selectedDate]: newSet,
    });
    setStart(0);
  }, [selectedDate]);

  useEffect(() => {
    if (
      start !== 0 &&
      selectedDate !== '' &&
      photos[selectedDate].length > 0 &&
      start + 2 * limit > photos[selectedDate].length
    ) {
      setCurrPage(currPage + 1);
    }
  }, [start]);

  useEffect(() => {
    setCurrList(
      photos
        ? start + limit < photos[selectedDate].length
          ? [...photos[selectedDate].slice(start, start + limit)]
          : [
              ...photos[selectedDate].slice(
                start,
                photos[selectedDate].length - 1
              ),
            ]
        : []
    );
  }, [start]);

  useEffect(() => {
    setCurrList(
      photos
        ? start + limit < photos[selectedDate].length
          ? [...photos[selectedDate].slice(start, start + limit)]
          : [
              ...photos[selectedDate].slice(
                start,
                photos[selectedDate].length - 1
              ),
            ]
        : []
    );
  }, [photos]);

  useEffect(() => {
    console.log('ImagePanel: state', { selectedDate });
    if (
      selectedDate !== dayjs().format('YYYY-MM-DD') &&
      currPage > 0 &&
      !loading
    ) {
      setLoading(true);
      fetchPhotos(selectedDate, currPage)
        .then(dat => {
          if ((dat as Error).message) {
            setError((dat as Error).message);
            setLoading(false);
          } else {
            const newSet = photos[selectedDate]
              ? [...photos[selectedDate]].concat(dat as MPhoto[])
              : [...(dat as MPhoto[])];
            setPhotos({
              ...photos,
              [selectedDate]: newSet,
            });
            setError('');
            setLoading(false);
          }
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [currPage, selectedDate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {error !== '' && <span style={{ width: '100%' }}>{error}</span>}
      <div
        style={{
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {currList.length > 0 &&
          currList.map((pht: MPhoto) => <ImageCard key={pht.id} photo={pht} />)}
      </div>
      {photos[selectedDate] && photos[selectedDate].length > 0 && (
        <div
          style={{
            width: '100%',
            height: '5vh',
            display: 'flex',
            flexDirection: 'row-reverse',
          }}
        >
          <Pagination
            start={start}
            end={start + limit}
            total={photos[selectedDate].length}
            onPrev={() => setStart(start - limit)}
            onNext={() => setStart(start + limit)}
          />
        </div>
      )}
    </div>
  );
};

export default ImagePanel;
