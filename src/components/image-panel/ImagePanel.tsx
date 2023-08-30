import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import ImageCard from '../image-card/ImageCard';
import Pagination from '../../components/pagination/Pagination';
import { type MPhoto, fetchPhotos } from '../../lib/api';

type ImagePanelProps = {
  limit: number;
  selectedDate: string;
};

type Photos = {
  photos: MPhoto[]
  loaded: boolean
  lastFetched: number
}

const ImagePanel = ({ selectedDate, limit }: ImagePanelProps) => {
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [start, setStart] = useState(0);
  const [photos, setPhotos] = useState<{ [key: string]: Photos }>(
    selectedDate !== '' ? { [selectedDate]: { loaded: false, lastFetched: 0, photos: [] } } : {}
  );
  const [currList, setCurrList] = useState<MPhoto[]>(
    selectedDate !== '' &&
      photos[selectedDate] &&
      photos[selectedDate].photos.length > 0
      ? photos[selectedDate].photos.slice(0, limit)
      : []
  );

  useEffect(() => {
    setPhotos({
      ...photos,
      [selectedDate]: photos[selectedDate] ? photos[selectedDate] : { loaded: false, lastFetched: 0, photos: [] },
    });
    setStart(0);
    setCurrPage(1)
    setLoaded(false)
  }, [selectedDate]);

  useEffect(() => {
    if (
      start !== 0 &&
      selectedDate !== '' &&
      photos[selectedDate].photos.length > 0
    ) {
      if (!loaded && start + 2 * limit > photos[selectedDate].photos.length) {
        setCurrPage(currPage + 1);
      }
    }
  }, [start]);

  useEffect(() => {
    // console.log("ImagePanel: start or photos updated, setting current", {
    //   currPage,
    //   start,
    //   numPhotos: photos && photos[selectedDate] ? photos[selectedDate].photos.length : 0,
    //   end: start + limit < photos[selectedDate].photos.length ? start + limit : photos[selectedDate].photos.length - 1
    // })
    setCurrList(
      photos && photos[selectedDate]
        ? start + limit < photos[selectedDate].photos.length
          ? [...photos[selectedDate].photos.slice(start, start + limit)]
          : [
              ...photos[selectedDate].photos.slice(
                start,
                photos[selectedDate].photos.length - 1
              ),
            ]
        : []
    );
  }, [start, photos]);

  useEffect(() => {
    setCurrList(
      photos
        ? start + limit < photos[selectedDate].photos.length
          ? [...photos[selectedDate].photos.slice(start, start + limit)]
          : [
              ...photos[selectedDate].photos.slice(
                start,
                photos[selectedDate].photos.length - 1
              ),
            ]
        : []
    );
  }, [photos]);

  useEffect(() => {
    const today = dayjs().format('YYYY-MM-DD')
    const isToday = selectedDate === today
    const inPast = dayjs().isAfter(dayjs(selectedDate), 'day')
    const alreadyLoaded = loaded || (photos[selectedDate] && photos[selectedDate].loaded)
    const lastFetched = photos[selectedDate] ? photos[selectedDate].lastFetched : 0

    // console.log("ImagePanel: checking if data fetch required", { today, selectedDate, isToday, inPast, loading, alreadyLoaded, currPage, lastFetched})

    if (
      !loading &&
      !alreadyLoaded &&
      currPage > lastFetched &&
      !isToday &&
      inPast &&
      currPage > 0
    ) {
      // console.log("ImagePanel: fetching data", { currPage, today, selectedDate, isToday, inPast, loading, loaded})
      setLoading(true);
      fetchPhotos(selectedDate, currPage)
        .then(dat => {
          if ((dat as Error).message) {
            setError((dat as Error).message);
            setLoading(false);

            const newSet = { ...photos[selectedDate], lastFetched: currPage, loaded: true }
            setPhotos({
              ...photos,
              [selectedDate]: newSet,
            });
            setLoaded(true)
          } else {
            if ((dat as MPhoto[]).length > 0) {
              const newSet = photos[selectedDate]
                ? { ...photos[selectedDate], lastFetched: currPage, photos: [...photos[selectedDate].photos].concat(dat as MPhoto[])}
                : { loaded: false, lastFetched: currPage, photos: [...(dat as MPhoto[])] }

              setPhotos({
                ...photos,
                [selectedDate]: newSet,
              });
            } else {
              const newSet = { ...photos[selectedDate], lastFetched: currPage, loaded: true }
              setPhotos({
                ...photos,
                [selectedDate]: newSet,
              });
              setLoaded(true)
            }
            setError('');
            setLoading(false);
          }
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);

          const newSet = { ...photos[selectedDate], lastFetched: currPage, loaded: true }
          setPhotos({
            ...photos,
            [selectedDate]: newSet,
          });
          setLoaded(true)
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
      {photos[selectedDate] && photos[selectedDate].photos.length > 0 && (
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
            end={start + limit < photos[selectedDate].photos.length ? start + limit : photos[selectedDate].photos.length - 1}
            total={photos[selectedDate].photos.length}
            onPrev={() => setStart(start - limit)}
            onNext={() => setStart(start + limit)}
          />
        </div>
      )}
    </div>
  );
};

export default ImagePanel;
