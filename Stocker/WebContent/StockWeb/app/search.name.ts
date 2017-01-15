import {Component, Output, EventEmitter} from '@angular/core';

@Component({
	selector:'search-name',
	template:`
	<div class="container">
      <div class="row">
	    <div class="col-md-4">
          <div id="custom-search-input">
		    <div class="input-group col-md-12">
		      <input #input type="text" (input)="update.emit(input.value);" class="form-control input-lg" placeholder="Company Name" />
              <span class="input-group-btn">
			    <button class="btn btn-info btn-lg" type="button">
				  <i class="glyphicon glyphicon-search"></i>
				</button>
			  </span>	
			</div>		
		  </div>
		</div>
      </div>	  	  	  
	</div>`
})
export class SearchName{

	@Output() update = new EventEmitter();

	ngOnInit(){
		this.update.emit('');
	}

}