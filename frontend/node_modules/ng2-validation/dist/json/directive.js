"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var _1 = require('./');
var JSON_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return JSONValidator; }),
    multi: true
};
var JSONValidator = (function () {
    function JSONValidator() {
    }
    JSONValidator.prototype.validate = function (c) {
        return _1.json(c);
    };
    JSONValidator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[json][formControlName],[json][formControl],[json][ngModel]',
                    providers: [JSON_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    JSONValidator.ctorParameters = [];
    return JSONValidator;
}());
exports.JSONValidator = JSONValidator;
//# sourceMappingURL=directive.js.map