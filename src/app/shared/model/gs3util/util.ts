
import {FormGroup, ValidatorFn, FormControl, Validators, FormBuilder, FormArray} from '@angular/forms';


export class Util{

    public static chamarTodosValidadores(formGroup: FormGroup)
    {
        if(formGroup)
        {
            Object.keys(formGroup.controls).forEach(field =>
            {
                const control = formGroup.get(field);
                if (control instanceof FormControl)
                {
                    control.markAsTouched({ onlySelf: true });
                }
                else if (control instanceof FormGroup)
                {
                    this.chamarTodosValidadores(control);
                }
                else if (control instanceof FormArray)
                {
                    for(let i = 0; i < control.length; i++)
                    {
                        this.chamarTodosValidadores(<FormGroup>control.get(i+''));
                    }
                }
            });
        }
    }

    public static extrairDDD(value:string)
    {
        if(value)
        {
            return(value.substring(0,2));
        }

        return(null);
    }

    public static modelToForm(model:any, formulario: FormGroup, formBuilder: FormBuilder):FormGroup
    {
        for (const key in model)
        {
            if (model.hasOwnProperty(key))
            {
                if(typeof(model[key]) == 'object')
                {
                    if(Array.isArray(model[key]))
                    {
                        let array = formBuilder.array([]);
                        let group:FormGroup = formBuilder.group({});
                        array.push(group);

                        formulario.addControl(key, array);
                        this.modelToForm(model[key][0], group, formBuilder);
                    }
                    else
                    {
                        let group = formBuilder.group({});
                        formulario.addControl(key, group);
                        this.modelToForm(model[key], group, formBuilder);
                    }
                }
                else
                {
                    formulario.addControl(key, new FormControl(model[key], null));
                }
            }
        }

        return(formulario);
    }
  }
