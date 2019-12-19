import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchVarieties'
})
export class SearchVarietiesPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultVarieties = [];
    for (const varieties of value)
    {
      if(varieties.name.toLowerCase().indexOf(arg.toLowerCase()) >-1)
      {
        resultVarieties.push(varieties);
      }
    }
    return resultVarieties;
  }

}
