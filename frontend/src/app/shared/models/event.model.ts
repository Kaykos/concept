import { PropsMapping } from '../services/model.service';

const propsMapping: PropsMapping = {
  id: 'id',
  clientId: 'client_id',
  date: 'date',
  cost: 'cost',
  title: 'title',
  services: 'services',
  comment: 'comment',
  rating: 'rating'
};

export class Event {
  id?: number;
  clientId: number;
  date: string;
  cost: number;
  title: string;
  services: number[];
  comment: string;
  rating: number;

  static getInstance(data: {[prop: string]: any}): Event {
    const service = new Event();
    for(const prop in propsMapping) {
      service[prop] = data[propsMapping[prop]];
    }
    return service;
  }
}
