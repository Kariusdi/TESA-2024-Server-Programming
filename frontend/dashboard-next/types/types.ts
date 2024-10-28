export interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

interface SensorData {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

export interface AppKPIGraphProps {
  data: SensorData[];
}

export interface AppKPIProps {
  name: string;
  value: number;
  time: string;
}
