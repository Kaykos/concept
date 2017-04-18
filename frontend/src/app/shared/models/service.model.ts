import { PropsMapping } from '../services/model.service';

const propsMapping: PropsMapping = {
  id: 'id',
  providerId: 'provider_id',
  cost: 'cost',
  description: 'description',
  type: 'type',
  name: 'name',
  rating: 'rating',
  latitude: 'latitude',
  longitude: 'longitude'
};

export class Service {
  id?: number;
  providerId: number;
  cost: number;
  description: string;
  type: string;
  name: string;
  rating: number;
  latitude: number;
  longitude: number;

  static getInstance(data: {[prop: string]: any}): Service {
    const service = new Service();
    for(const prop in propsMapping) {
      service[prop] = data[propsMapping[prop]];
    }
    return service;
  }
}
