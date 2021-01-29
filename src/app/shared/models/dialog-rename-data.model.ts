import { Fridge } from './fridge.model';
import { Shoppinglist } from './shoppinglist.model';

export interface DialogRenameData {
  id: string;
  data: Shoppinglist | Fridge;
  create: string;
}
