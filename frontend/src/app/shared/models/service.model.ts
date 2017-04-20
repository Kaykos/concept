import { PropsMapping } from '../services/model.service';

const propsMapping: PropsMapping = {
  id: 'id',
  providerId: 'provider_id',
  name: 'name',
  cost: 'cost',
  type: 'type',
  description: 'description',
  rating: 'rating',
  latitude: 'latitude',
  longitude: 'longitude'
};

export class Service {
  id?: number;
  providerId: number;
  name: string;
  description: string;
  cost: number;
  type: string;
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
