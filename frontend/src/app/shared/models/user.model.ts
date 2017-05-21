import { PropsMapping } from '../services/model.service';

const propsMapping: PropsMapping = {
  id: 'id',
  name: 'name',
  lastName: 'last_name',
  email: 'email',
  username: 'user_name',
  role: 'role',
  userImage: 'user_image',
  imageData: 'image_data',
  extension: 'extension'
};

export class User {
  id?: number;
  name: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  userImage: string;
  imageData: string;
  extension: string;

  static getInstance(data: {[prop: string]: any}): User {
    const user = new User();
    for(const prop in propsMapping){
      user[prop] = data[propsMapping[prop]];
    }
    return user;
  }
}
