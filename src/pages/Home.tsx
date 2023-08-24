import React from 'react';
import LinkButton from '../components/link-button/LinkButton';
import ImageCarousel from '../components/image-carousel/ImageCarousel';

const Home = () => {
  return (
    <div style={{ margin: '2rem', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ height: '7vh', fontSize: '30px', margin: '0.5rem' }}>
        {'About The Program'}
      </h2>

      <div style={{ height: '60vh', display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '40%', margin: '0.5rem' }}>
          <img
            style={{ width: '100%', height: '100%' }}
            src='https://mars.nasa.gov/layout/mars2020/images/PIA23764-RoverNamePlateonMars-web.jpg'
            alt='mars rover'
          />
        </div>
        <div style={{ width: '60%', display: 'flex', flexDirection: 'column' }}>
          <p
            style={{
              height: '90%',
              overflowWrap: 'break-word',
              fontSize: '16px',
              margin: '0.5rem',
            }}
          >
            {
              'NASA’s Mars Exploration Program (MEP) is seeking feedback from the science community for its draft plan for the future of the program. MEP is excited to share this draft vision for the program’s future, entitled “Plan for a Sustainable Future for Science at Mars.” The plan is intended to look toward the next 20 years and center on community-responsive science themes. The draft plan suggests a new strategic paradigm designed to: send low-cost, high-value science missions to Mars at a higher frequency; develop new mission-enabling technologies; and address critical infrastructure at Mars.'
            }
          </p>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '5px' }}>
            <LinkButton href={'/images'} label={'View Images'} />
            <LinkButton href={'/weather'} label={'View Weather'} />
          </div>
        </div>
      </div>

      <div
        style={{
          height: '30vh',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '10px',
        }}
      >
        <h2 style={{ fontSize: '25px', margin: '0.5rem' }}>
          {'Curiosity rover images from today'}
        </h2>
        <div style={{ height: '80%', padding: '0.5rem' }}>
          <ImageCarousel limit={5} />
        </div>
      </div>
    </div>
  );
};

export default Home;
