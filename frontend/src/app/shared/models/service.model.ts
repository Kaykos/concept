import { PropsMapping } from '../services/model.service';

const propsMapping: PropsMapping = {
  id: 'id',
  providerId: 'provider_id',
  name: 'name',
  cost: 'cost',
  description: 'description',
  address: 'address',
  phone: 'phone',
  type: 'type',
  rating: 'rating',
  latitude: 'latitude',
  longitude: 'longitude',
  serviceImage: 'service_image',
  imageData: 'image_data',
  extension: 'extension'
};

export class Service {
  id?: number;
  providerId: number;
  name: string;
  cost: number;
  description: string;
  address: string;
  phone: string;
  type: string;
  rating: number;
  latitude: number;
  longitude: number;
  serviceImage: string;
  imageData: string;
  extension: string;

  static getInstance(data: {[prop: string]: any}): Service {
    const service = new Service();
    for(const prop in propsMapping) {
      service[prop] = data[propsMapping[prop]];
    }
    return service;
  }
}
