import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ReactiveForms';
  reactiveForm: FormGroup;
  formStatus;

  // ngOnInit(){
  //   this.reactiveForm = new FormGroup({
  //       firstname: new FormControl(null, Validators.required),
  //       lastname: new FormControl(null, Validators.required),
  //       email: new FormControl(null, [Validators.required, Validators.email]),
  //     gender: new FormControl('male')
  //   });
  // }

  ngOnInit(){
    this.reactiveForm = new FormGroup({
      personalDetails: new FormGroup({
        firstname: new FormControl(null, [Validators.required, this.noSpaceAllowed]),
        lastname: new FormControl(null, [Validators.required, this.noSpaceAllowed ]),
        email: new FormControl(null, [Validators.required, Validators.email], this.emailNotAllowed)
      }),
      gender: new FormControl('male'),
      skills: new FormArray([
        new FormControl(null, Validators.required)
      ])
    });

    // setTimeout(()=>{
    //   this.reactiveForm.setValue({
    //     personalDetails: {
    //       firstname: 'ssr',
    //       lastname:'rrr',
    //       email: ''
    //     },
    //     gender: '',
    //     skills: []
    //   })
    // }, 4000)

    setTimeout(()=>{
      this.reactiveForm.patchValue({
        personalDetails: {
          firstname: 'ssr',
          lastname:'rrr',
          email: 'sssss@gmail.com'
        }
      })
    }, 4000)

  // this.reactiveForm.get('personalDetails.firstname').valueChanges.subscribe((value) =>{
  //   console.log(value);
  //   })

  // this.reactiveForm.valueChanges.subscribe((value) =>{
  //   console.log(value);
  // })

  this.reactiveForm.statusChanges.subscribe((value)=>{
    console.log(value);
    this.formStatus = value;
  })

  }

  addSkills(){
    (<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null, Validators.required));
  }
   //Custom validation
  noSpaceAllowed(control: FormControl){
    if(control.value !=null && control.value.indexOf(' ')!=-1){//if it contain space the value returns a number or else -1
        return {noSpaceAllowed: true}
    }
    return null
  }

  //custom async validation
  emailNotAllowed(control: FormControl): Promise<any> | Observable<any>{
     const resolve = new Promise((resolve, reject)=> {
      setTimeout(()=>{
        if(control.value == 'ssr@gmail.com'){
          resolve({emailNotAllowed: true})
        } else{
          resolve(null)
        }
      }, 5000);
     });
     return resolve;
  }

  onSubmit(){
    console.log(this.reactiveForm);
    this.reactiveForm.reset({
          personalDetails: {
            firstname: '',
            lastname:'',
            email: ''
          },
          gender: 'male',
          skills: []
        })
  }
}
