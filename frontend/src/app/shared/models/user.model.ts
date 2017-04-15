import {PropsMapping} from '../services/model.service';

const propsMapping: PropsMapping = {
  id: 'id',
  name: 'name',
  lastName: 'lastName',
  email: 'email',
  username: 'username',
  role: 'role'
};

export class User {
  id?: number;
  name: string;
  lastName: string;
  email: string;
  username: string;
  role: string;

  static getInstance(data: {[prop: string]: any}): User{
    let model = new User();
    for(let prop in propsMapping){
      model[prop] = data[propsMapping[prop]];
    }
    return model;
  }
}
