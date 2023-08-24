import React, { useState } from 'react';
import dayjs from 'dayjs';
import ImagePanel from '../components/image-panel/ImagePanel';
import LinkButton from '../components/link-button/LinkButton';

const Images = () => {
  const [selectedDate, setSelectedData] = useState(
    dayjs().format('YYYY-MM-DD')
  );

  const onDateSelect: React.ChangeEventHandler<HTMLInputElement> = event => {
    event.preventDefault();
    setSelectedData(event.target.value);
  };

  return (
    <div style={{ margin: '2rem', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ height: '7vh', fontSize: '30px', margin: '0.3rem' }}>
        {'Images By Date'}
      </h2>

      <div
        style={{
          height: '5vh',
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '5px',
        }}
      >
        <p
          style={{ alignSelf: 'center', marginRight: '5px', fontSize: '16px' }}
        >
          Earth date:
        </p>

        <input
          type='date'
          id='start'
          value={selectedDate}
          min='2018-01-01'
          max={dayjs().format('YYYY-MM-DD')}
          onChange={onDateSelect}
          style={{
            alignSelf: 'center',
            border: '0.5px',
            borderRadius: '6px',
            height: '28px',
            fontSize: '14px',
          }}
        />

        <LinkButton href={'/'} label={'Home'} />
        <LinkButton href={'/weather'} label={'View Weather'} />
      </div>

      <div style={{ width: '100%', minHeight: '80vh' }}>
        <ImagePanel limit={12} selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export default Images;
