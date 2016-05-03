interface ValidationResult {
  [key: string]: boolean;
}
class RValidator {

  static signo(control: Control): ValidationResult {

    if (control.value !=”” && control.find('.')) ){
      return { “signo”: true };
    }

    return null;
  }

}