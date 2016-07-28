import {Component , Output, EventEmitter} from "angular2/core";
@Component({
	selector:'search-box',
	template:`<div>
			<label>Búsqueda por nombre o ciudad:</label>
			<input #input type="text" (input)="update.emit(input.value)">
			</div>`
})
export class SearchBox{
	@Output() update= new EventEmitter();

	ngOnInit(){
		this.update.emit('');
	}
}