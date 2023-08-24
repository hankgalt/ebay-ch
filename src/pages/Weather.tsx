import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import ImagePanel from '../components/image-panel/ImagePanel';
import LinkButton from '../components/link-button/LinkButton';

const API_KEY = 'DEMO_KEY';

const Weather = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const addData = (dt: any) => {
    const currData = [...data];
    currData.push(dt);
    setData([...currData]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`
        );
        if (!response.ok || !response.body) {
          throw response.statusText;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let processing = true;
        while (processing) {
          const { value, done } = await reader.read();
          if (done) {
            setLoading(false);
            processing = false;
            return;
          }

          const decodedChunk = decoder.decode(value, { stream: true });
          const val = await JSON.parse(decodedChunk);
          addData(val);
        }
      } catch (err) {
        console.log('error ', err);
        setLoading(false);
        setError(err);
      }
    };

    if (!loading || !data || data.length < 1) fetchData();
  }, [data]);

  useEffect(() => {
    console.log('dataStr: ', { data, error });
  }, [data]);

  return (
    <div style={{ margin: '2rem', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          height: '7vh',
          display: 'flex',
          margin: '0.3rem',
          flexDirection: 'row',
        }}
      >
        <h2 style={{ alignSelf: 'center', fontSize: '30px', width: '60%' }}>
          {'Weather'}
        </h2>

        <LinkButton href={'/'} label={'Home'} />
        <LinkButton href={'/images'} label={'View Images'} />

        <div style={{ alignSelf: 'center', width: '20%' }}>
          <div style={{ float: 'right', alignSelf: 'center' }}>
            {'sort selection goes here'}
          </div>
        </div>
      </div>

      <div style={{ width: '100%', minHeight: '80vh' }}>
        <ImagePanel
          limit={12}
          selectedDate={dayjs().subtract(15, 'day').format('YYYY-MM-DD')}
        />
      </div>

      <div style={{ width: '100%', height: '10vh' }}>
        <div>{'legend goes here'}</div>
      </div>
    </div>
  );
};

export default Weather;
