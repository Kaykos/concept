import {PropsMapping} from '../services/model.service';

const propsMapping: PropsMapping = {
  id: 'id',
  providerId: 'provider_id',
  cost: 'cost',
  description: 'description',
  type: 'type',
  name: 'name'
};

export class Service {
  id?: number;
  providerId: number;
  cost: number;
  description: string;
  type: string;
  name: string;

  static getInstance(data: {[prop: string]: any}): Service{
    const model = new Service();
    for(const prop in propsMapping){
      model[prop] = data[propsMapping[prop]];
    }
    return model;
  }
}
