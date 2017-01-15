import { Pipe } from '@angular/core';

@Pipe({
  name: "search"
})

export class SearchPipe{
  transform(value:any[], term):any {

    if (value==null) {
      return value;
    }
    
    if ( typeof term!=='undefined') {
    console.log(term);
      return value.filter((item)=> item.stockId.includes(term));   
      // startsWith
    } 
    else {
      return value.filter((item)=> item.stockId);  
    }

  }

}