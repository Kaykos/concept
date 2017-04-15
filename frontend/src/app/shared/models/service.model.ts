import {PropsMapping} from '../services/model.service';

const propsMapping: PropsMapping = {
  id: 'id',
  cost: 'cost',
  description: 'description'
};

export class Service {
  id?: number;
  cost: number;
  description: string;

  static getInstance(data: {[prop: string]: any}): Service{
    let model = new Service();
    for(let prop in propsMapping){
      model[prop] = data[propsMapping[prop]];
    }
    return model;
  }
}
