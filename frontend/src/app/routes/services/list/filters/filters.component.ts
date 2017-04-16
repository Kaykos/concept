import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'filters-services',
  templateUrl: './filters.component.html'
})
export class FiltersServicesComponent implements OnInit, OnDestroy{
  @Input() term: string;
  @Output() searchClick: EventEmitter<{[key: string]: string}>;

  model: {[key: string]: string};

  constructor(){
    this.searchClick = new EventEmitter<{[key: string]: string}>();
  }

  ngOnInit(){
    this.model = {term: this.term};
  }

  ngOnDestroy(){
    this.searchClick = null;
    this.model = null;
  }

  isDisabled() {
    const modelTerm: string = this.model['term'] ? this.model['term'] : '';
    const term: string = this.term ? this.term : '';
    return modelTerm === term;
  }

  search(){
    // Filtra los parametros diferentes a falsy
    const filteredModel: {[key: string]: string} = _.pickBy(this.model, (value) => {
      return !!value;
    });
    this.searchClick.emit(filteredModel);
  }
}
