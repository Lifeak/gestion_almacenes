"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var todo_service_1 = require('../services/todo-service');
var TodoEditCmp = (function () {
    function TodoEditCmp(fb, _todoService) {
        this._todoService = _todoService;
        this.title = "ng2do";
        this.todos = [];
        this.todoForm = fb.group({
            "todoMessage": ["", common_1.Validators.required],
            "todoM": ["", common_1.Validators.required]
        });
    }
    TodoEditCmp.prototype.ngOnInit = function () {
    };
    TodoEditCmp.prototype._getAll = function () {
        var _this = this;
        this._todoService
            .getAll()
            .subscribe(function (todos) {
            _this.todos = todos;
        });
    };
    TodoEditCmp.prototype.edit = function (id) {
    };
    TodoEditCmp.prototype.update = function (id, datos) {
        /*alert(this.todoForm.controls['todoMessage'].value);
        var a: String = this.todoForm.controls['todoMessage'].value;
        var b: String = this.todoForm.controls['todoM'].value;
        alert(this.todoForm.controls['todoM'].value);
        this._todoService
          .add(a, b)
          .subscribe((m) => {
            this.todos.push(todo[0], todo[1]);
            (<Control>this.todoForm.controls['todoMessage']).updateValue("");
            (<Control>this.todoForm.controls['todoM']).updateValue("");
          });*/
    };
    TodoEditCmp.prototype.getbyId = function (id) {
        var _this = this;
        this._todoService
            .getbyId(id)
            .subscribe(function (todos) {
            _this.todos = todos;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TodoEditCmp.prototype, "_id", void 0);
    TodoEditCmp = __decorate([
        core_1.Component({
            selector: 'todoedit-cmp',
            templateUrl: 'client/dev/todo/templates/todoedit.html',
            styleUrls: ['client/dev/todo/styles/todo.css'],
            providers: [todo_service_1.TodoService],
        }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(1, core_1.Inject(todo_service_1.TodoService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, todo_service_1.TodoService])
    ], TodoEditCmp);
    return TodoEditCmp;
}());
exports.TodoEditCmp = TodoEditCmp;
