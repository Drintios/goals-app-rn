import { db } from '../config/db';

export const addItem = (object, itemId) => {
  if (itemId !== 'create') {
    db.ref('/items/' + itemId).update(object);
  } else {
    db.ref('/items').push(object);
  }
}