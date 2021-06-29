const Users = require("../models/User");
const Contact = require('../models/contact');
const bcrypt = require('bcrypt');



function validateEmail(email) { 
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
return re.test(String(email).toLowerCase());
 }
function validatePhone(phone){
      var phone = String(phone);
      var number = /^[0-9]*$/ ;
    return (phone.length == 11 && number.test(phone) && phone.charAt(0) == 0 && (phone.charAt(2) == 0 || phone.charAt(2) == 1)
   && ( (phone.charAt(1) == 7 && phone.charAt(2) == 0) || phone.charAt(1) == 8 || phone.charAt(1) == 9) )
}

module.exports = {
    register: (req,res) =>{
        const {fname, lname, email, phone, password, password2,address} = req.body;
        let errors = [];
        if(!fname || !lname || !email || !phone || !password || !password2 || !address){
            errors.push({msg:'all fields are required'});
        }
        if(password != password2){
            errors.push({msg:'passwords do not match'});
        }
        if(password.length <6){
            errors.push({msg:'password must be of length or above'});
        }
        if(!validateEmail(req.body.email)){
            errors.push({msg:'invalide email '});
        }
        if(!validatePhone(req.body.phone)){
            errors.push({msg:'invalide phone number '});
        }
        if(errors.length > 0){
            res.render('register',{
                errors,
                fname,
                lname,
                email,
                phone,
                password,
                password2,
                address
            });
        }else{
            Users.findOne({phone:phone} || {email:email} , (err, result) =>{
                if(result){
                    errors.push({msg:`user with this emaill do exist`});
                    res.render('register',{
                        errors,
                        fname,
                        lname,
                        email,
                        phone,
                        password,
                        password2,
                        address
                    })
                }else{
                    const newUsers  = new Users({
                        fname,
                        email,
                        lname,
                        password,
                        phone,
                        address
                    });

                    bcrypt.hash(password, 10, (err, hash) =>{
                        newUsers.password = hash;
                        newUsers.save((err, One) =>{
                            if(err) throw err;
                            req.flash('success_msg', 'you have successifully created an acount');
                            console.log(One);
                            res.redirect('/login');
                            
                        })
                    })

                }
            })
        }
    },
         
            contact: (req,res) =>{
                const contact = new Contact({
                    name:req.body.name,
                    email:req.body.email,
                    message:req.body.message
                });

                contact.save((err,result) =>{
                    if(err) throw err;
                    res.status(201).json({
                        msg:'your message have being delivered succesifully',
                        result
                })
                })
            }

    }
