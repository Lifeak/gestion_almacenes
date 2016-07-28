import {Pipe, PipeTransform} from "angular2/core";

@Pipe({
	name: 'search'
})
export class SearchPipe implements PipeTransform{
	transform(value, args){
		 if (value.filter((trans)=>trans.nombre.startsWith(args))=="")
		 	return value.filter((trans)=>trans.ciudad.startsWith(args));
 		 else return value.filter((trans)=>trans.nombre.startsWith(args));
		//return value.filter((trans)=>trans.nombre.startsWith(args));
	}
}