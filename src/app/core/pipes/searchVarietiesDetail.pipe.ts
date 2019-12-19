import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchVarietiesDetail'
})
export class SearchVarietiesDetailPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultVarietiesDetail = [];
    for (const varietiesDetail of value)
    {
      if(varietiesDetail.name.toLowerCase().indexOf(arg.toLowerCase()) >-1)
      {
        resultVarietiesDetail.push(varietiesDetail);
      }
    }
    return resultVarietiesDetail;
  }

}
