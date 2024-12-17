import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/common/Form';
import { registerFormControls } from '../../config/index';
import { useDispatch } from "react-redux";
import { registerUserThunk } from '../../redux/authslice/authSlice';
import { useToast } from "@/hooks/use-toast"

const initialState = {
  email: '',
  password: '',
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast();

  function onSubmit(event) {
    event.preventDefault();
    
    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      setErrorMessage("Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return; // Stop the submission
    }

    setErrorMessage(''); // Clear error message if validation passes
    dispatch(registerUserThunk(formData)).then((data) => {
        if (data?.payload?.success) {
            toast({
              title: data?.payload?.message,
            })
            navigate('/auth/login');
        } else {
            // If registration fails, set the error message from the response
            setErrorMessage(data?.payload?.message || "An error occurred during registration.");
        }
    });
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'> 
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>
          Create new Account
        </h1>
        <p>
          Already have an account?
          <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/login">
            Login
          </Link>
        </p>
      </div>
      {errorMessage && (<div className="text-red-500 text-center bg-red-100 border border-red-400 rounded-md p-4">
                         {errorMessage}
                        </div>
        )}
      <Form
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={"Sign Up"} // Ensure this is set
      />
    </div>
  );
};

export default Register;