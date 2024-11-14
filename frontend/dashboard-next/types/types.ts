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

export interface StatusData {
  _id: string;
  id: number;
  status: number;
  date: string;
}

export interface StatusDataNoId {
  id: number;
  status: number;
  date: string;
}

export interface AppKPIGraphProps {
  data: SensorData[];
}

export interface AppKPIProps {
  name: string;
  timestamp: string;
  sensorValue: number;
}

export interface Message {
  id: number;
  status: number;
}

interface MachinesVol {
  "L1-GND": number;
  "L2-GND": number;
  "L3-GND": number;
}

export interface MachineInfo {
  ["Cycle Count"]: number;
  ["Energy Consumption"]: {
    Power: number;
  };
  Force: number;
  ["Position of the Punch"]: number;
  Pressure: number;
  Voltage: MachinesVol;
}

interface CycleCount {
  CycleCount: number;
}
