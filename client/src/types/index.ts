export interface User {
  id: string;
  email: string;
  fullName: string;
  token: string;
}

export interface UserLoginResponse {
  token: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
    password: string;
  };
}

export interface Captain {
  id: string;
  email: string;
  fullName: string;
  token: string;
  vehicle: {
    type: string;
    color: string;
    numberPlate: string;
    capacity: number;
  };
  location: {
    lat: number;
    log: number;
  };
  status: string;
}

export interface CaptainLoginResponse {
  token: string;
  captain: {
    vehicle: {
      type: string;
      color: string;
      numberPlate: string;
      capacity: number;
    };
    location: {
      lat: number;
      lon: number;
    };
    _id: string;
    fullName: string;
    email: string;
    password: string;
    status: string;
    socketId: string | null;
  };
}

export enum VehicleType {
  car = "car",
  auto = "auto",
  motorcycle = "motorcycle"
}
