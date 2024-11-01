export interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export interface SensorData {
  name: string;
  timestamp: string;
  hour: string;
  minute: string;
  date: string;
  sensorValue: number;
}

export interface AppKPIGraphProps {
  data: SensorData[];
}

export interface AppKPIProps {
  name: string;
  timestamp: string;
  sensorValue: number;
}
