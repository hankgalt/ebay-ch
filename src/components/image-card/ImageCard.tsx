import React, { useEffect, useState } from 'react';
import { type MPhoto } from '../../lib/api';

type ImageCardProps = {
  photo: MPhoto;
  height?: string;
  width?: string;
};

const ImageCard = ({
  photo,
  height = '200px',
  width = '200px',
}: ImageCardProps) => {
  const [loaded, setLoaded] = useState(false);
  const [loadedSrc, setLoadedSrc] = useState(null);

  useEffect(() => {
    if (photo.imgSrc) {
      const img = new Image();
      img.onload = () => {
        setLoadedSrc(img.src);
        setLoaded(true);
      };
      img.onerror = () => {
        console.log('error loading image');
      };
      img.src = photo.imgSrc;
    }
  }, [photo]);

  return (
    <div style={{ padding: '3px' }}>
      {loaded ? (
        <img
          src={photo.imgSrc}
          alt={`${photo.rover.name}-${photo.id}`}
          style={{
            maxWidth: height,
            maxHeight: width,
            border: '1px solid blue',
          }}
        />
      ) : (
        <div
          style={{
            height,
            width,
            border: '0.5px solid #4B4941',
            boxShadow: '10px 5px 5px #4B4941',
            display: 'flex',
            flexDirection: 'column',
            margin: '0.5rem 1.5rem',
          }}
        >
          <p style={{ fontSize: '12px', textAlign: 'center' }}>{photo.id}</p>
          <p style={{ fontSize: '16px', textAlign: 'center' }}>
            {photo.rover.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageCard;
