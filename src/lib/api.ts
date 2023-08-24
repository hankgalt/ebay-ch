type Rover = {
  id: number;
  name: string;
};

export type MPhoto = {
  id: number;
  imgSrc: string;
  earthDate: string;
  rover: Rover;
};

const API_KEY = 'DEMO_KEY'

export const fetchPhotos = async (
  date: string,
  page: number
): Promise<MPhoto[] | Error> => {
  return fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${API_KEY}&page=${page}`
  )
    .then(response => response.json())
    .then(dat => {
      if (dat.photos) {
        return dat.photos;
      } else {
        if (dat.error) {
          return dat.error;
        } else {
          return new Error('fetchPhotos API error');
        }
      }
    })
    .catch(err => {
      return err as Error;
    });
};

export const fetchWeatherInsights = async (): Promise<any | Error> => {
  return fetch(
    `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`
  )
    .then(response => response.json())
    .then(dat => {
      console.log('fetchWeatherInsights - data: ', { data: dat });
      if (dat.validity_checks) {
        return dat;
      } else {
        if (dat.error) {
          return dat.error;
        } else {
          return new Error('fetchWeatherInsights API error');
        }
      }
    })
    .catch(err => {
      return err as Error;
    });
};

export async function* fetchData() {
  try {
    const response = await fetch(
      `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`
    );
    if (!response.ok || !response.body) {
      throw response.statusText;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        return;
      }

      const decodedChunk = decoder.decode(value, { stream: true });
      yield decodedChunk;
    }
  } catch (error) {
    yield error;
    return;
  }
}

export const add = (a: number, b: number): number => {
  return a + b;
};

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function* generatePoints({
  min,
  max,
  total,
}: {
  min: number;
  max: number;
  total: number;
}): Generator<{ x: number; y: number }> {
  for (let i = 0; i < total; i++) {
    yield {
      x: getRandomInt(min, max),
      y: getRandomInt(min, max),
    };
  }
}

// useEffect(() => {
//   fetch("https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0")
//   .then(response => response.json())
//       // 4. Setting *dogImage* to the image url that we received from the response above
//   .then(dat => {
//     console.log("data: ", { data: dat })
//     setData(dat)
//   })
// },[])
