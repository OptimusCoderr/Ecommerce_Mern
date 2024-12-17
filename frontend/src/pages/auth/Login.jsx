import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Form from '../../components/common/Form';
import { loginFormControls } from '../../config';
import { useDispatch } from 'react-redux';
import { loginUserThunk } from '../../redux/authslice/authSlice';
import { useToast } from "@/hooks/use-toast"

const initialState = {
  email: '',
  password: '',
}

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      setErrorMessage("Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return; // Stop the submission
    }

    setErrorMessage(''); // Clear error message if validation passes
    dispatch(loginUserThunk(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message
        });
      } else {
        setErrorMessage(data?.payload?.message || "Login failed. Please try again."); // Set error message from response
        toast({
          title: data?.payload?.message,
          variant: "destructive"
        });
      }
    });
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'> 
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>
          Login
        </h1>
        <p>
          Do not have an account?
          <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/register">
            Register
          </Link>
        </p>
      </div>
      {errorMessage && (
        <div className="text-red-500 text-center bg-red-100 border border-red-400 rounded-md p-4">
          {errorMessage}
        </div>
      )}
      <Form
        formControls={loginFormControls}
        buttonText={"Login"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default Login;