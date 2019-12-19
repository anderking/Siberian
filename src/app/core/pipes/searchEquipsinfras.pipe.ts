import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchEquipsinfras'
})
export class SearchEquipsinfrasPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultEquipsinfras = [];
    for (const equipsinfras of value)
    {
    	if(equipsinfras.name.toLowerCase().indexOf(arg.toLowerCase()) >-1)
    	{
    		resultEquipsinfras.push(equipsinfras);
    	}
    }
   	return resultEquipsinfras;
  }

}
