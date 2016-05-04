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


import {GarantiaService, Garantia} from '../services/garantia-service';
import {LoginService} from '../../login/services/login-service';

@Component({
  templateUrl: 'client/dev/garantia/templates/details.html'
})


export class GarantiaDetailsCmp implements OnInit {
  @Input() garantia: Garantia;
  garantiaForm: ControlGroup;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private _router: Router, private _routeParams: RouteParams, private _garantiaService: GarantiaService, @Inject(LoginService) private _loginService: LoginService) {
    this.garantiaForm = fb.group({
      "_id": ["", Validators.required],
      "tiempo": ["", Validators.required]
    });
  }
  

  ngOnInit() {
    let id = this._routeParams.get('id');
    this._garantiaService
    .getGarantiaId(id)
    .subscribe((garantia) => {
    this.garantia = garantia;
    });
  }

  gotoIndex(){
    let userId = this.garantia ? this.garantia._id : null;
    this._router.navigate(['/ListGarantias']);
  }
  private _getAll():void {
    this._garantiaService
        .getAll()
        .subscribe((garantia) => {
      this.garantia = garantia;
        });
  }
  edit(garantia: Garantia) {
    
    let id = this._routeParams.get('id');
    alert("nos llega a editar:" + garantia._id+" pero vamos a borrar "+id);
    this._garantiaService
      .remove(id)
      .subscribe(() => {
        return this.garantia;

      });

    this._garantiaService
    .add(garantia._id, garantia.tiempo)
      .subscribe((m) => {
          (<Control>this.garantiaForm.controls['_id']).updateValue("");
          (<Control>this.garantiaForm.controls['tiempo']).updateValue("");
    });

    
    this.gotoIndex();

  }
  delete(garantia: Garantia) {
    this._garantiaService
    .remove(garantia._id)
      .subscribe(() => {
      return this.garantia;

      });
    this.gotoIndex();

  }

}