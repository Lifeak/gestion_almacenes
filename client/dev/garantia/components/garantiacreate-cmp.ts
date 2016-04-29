import {
  Component,
  Input,
  Inject,
  OnInit
} from 'angular2/core';

import {
  Validators,
  FormBuilder,
  ControlGroup,
  Control
} from 'angular2/common';

import {
  RouteParams,
  Router
} from 'angular2/router';


import {Garantia,GarantiaService} from '../services/garantia-service';

@Component({
  templateUrl: 'client/dev/garantia/templates/create.html'
})


export class GarantiaCreateCmp{
  @Input() garantia: Garantia;
  garantiaForm: ControlGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder,private _router: Router, private _routeParams: RouteParams, private _garantiaService: GarantiaService){
    this.garantiaForm = fb.group({
      "_id": ["", Validators.required],
      "tiempo": ["", Validators.required]
    });
  }
  
  gotoIndex(){
    let garantiaId = this.garantia ? this.garantia._id : null;
    this._router.navigate(['/ListGarantias']);

  }

  goBack(){
    window.history.back();
  }

  save(datos: FormData){
      var _id: string = this.garantiaForm.controls['_id'].value;
      var tiempo: number = this.garantiaForm.controls['tiempo'].value;
       this._garantiaService
              .add(_id,tiempo)
              .subscribe((m) => {
          (<Control>this.garantiaForm.controls['_id']).updateValue("");
          (<Control>this.garantiaForm.controls['tiempo']).updateValue("");

              });
          this.gotoIndex();

  }
}
