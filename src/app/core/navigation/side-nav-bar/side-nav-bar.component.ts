import { Component, Input } from '@angular/core';
import { Shoppinglist } from 'src/app/shared/models/shoppinglist.model';

import { Fridge } from './../../../shared/models/fridge.model';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent {

  @Input() fridges: Fridge[];
  @Input() shoppinglists: Shoppinglist[];

}
