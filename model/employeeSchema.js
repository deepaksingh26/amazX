const mongoose=require('mongoose');

const employeeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    employee_id:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile_no:{
        type:String,
        // required:true
    },
    alt_mobile_no:{
        type:String,
        // required:true
    },
    password:{
        type:String,
        required:true
    },
    job_location:{
        type:String,
        // required:true
    },
    temp_address:{
        type:String,
        // required:true
    },
    per_address:{
        type:String,
        // required:true
    },
    dept:{
        type:String,
        // required:true
    },
    img_url:{
        type:String,
        // required:true
    },
    pan_no:{
        type:String,
        // required:true
    },
    aadhar_no:{
        type:String,
        // required:true
    },
    bank_name:{
        type:String,
        // required:true
    },
    account_no:{
        type:String,
        // required:true
    },
    ifsc_code:{
        type:String,
        // required:true
    },
    fixed_salary:{
        type:String,
        // required:true
    },
    attendance:[
         {
            month:{
                type:String
            },
            no_of_working_days:{
                type:String
            },
            no_of_days_attended:{
                type:String
            },
            sick:{
                type:String
            },
            personal:{
                type:String
            },
            vacation:{
                type:String
            }
         }
    ],

    salary_history:[
          {
            amount:{
                type:String
            },
            date:{
                type:String
            },
            month:{
                type:String
            },
            mode:{
                type:String
            },
            status:{
                type:String
            },
            year:{
                type:String
            }
          }
    ],

})


const Employee=mongoose.model('EMPLOYEE',employeeSchema);

// Try retrieving some data to see if that works
Employee.find().then((results) => {
}).catch((error) => {
  console.error('Error:', error);
});
module.exports=Employee;
