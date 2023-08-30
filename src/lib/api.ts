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

type CompassDirPt = {
  degrees: number
  point: string
  right: number
  up: number
  numSamples: number
}

type WindDirectionData = {
  [key: string]: CompassDirPt
  common?: CompassDirPt
}

type SensorData = {
  ave: number
  min: number
  max: number
  numSamples: number
}

type WeatherDataObject = {
  temp?: SensorData
  windSp?: SensorData
  press?: SensorData
  windDir?: WindDirectionData
  firstUTC: string
  lastUTC: string
  season: string
}

type WeatherInsights = {
  [key: string]: WeatherDataObject
}

type WeatherInsightsResponse =  (WeatherInsights | {}) & {
  solKeys: string[]
}

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

const sampleWeatherResp: WeatherInsightsResponse = {
  solKeys: [ "259", "260", "261", "262", "263", "264", "265"],
  "259": {
    temp: {
      ave: -71.233, numSamples: 326642, min: -101.024, max: -27.149
    },
    windSp: {
      ave: 4.35, numSamples: 154146, min: 0.156, max: 17.617
    },
    press: {
      ave: 761.006, numSamples: 163012, min: 742.1498, max: 780.3891
    },
    windDir: {
      common: {
        degrees: 202.5,
        point: "SSW",
        right: -0.382683432365,
        up: -0.923879532511,
        numSamples: 28551
      },
      "8": {
        degrees: 180.0,
        point: "S",
        right: 0.0,
        up: -1.0,
        numSamples: 17699
      },
      "9": {
        degrees: 202.5,
        point: "SSW",
        right: -0.382683432365,
        up: -0.923879532511,
        numSamples: 28551
      },
      "10": {
        degrees: 225.0,
        point: "SW",
        right: -0.707106781187,
        up: -0.707106781187,
        numSamples: 27124
      }
    },
    firstUTC: "2019-08-19T08:03:59Z",
    lastUTC: "2019-08-20T08:43:34Z",
    season: "winter"
  },
  "260": {
    temp: {
      ave: -75.95, numSamples: 300789, min: -101.715, max: -28.634
    },
    press: {
      ave: 762.462, numSamples: 149206, min: 741.1254, max:  777.796
    },
    windDir: {
      common: null
    },
    firstUTC: "2019-08-19T08:03:59Z",
    lastUTC: "2019-08-20T08:43:34Z",
    season: "winter"
  }
}
