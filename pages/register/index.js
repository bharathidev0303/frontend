import React, { useState } from 'react';
import logo from '../../public/pharmarack.png';
import buttons from '../controls/Buttons';
import InputFields from '../controls/InputFields';
import { IoIosPlay } from "react-icons/io";

console.log(buttons);
const Register = () => {
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        pass: "",
        confirmPass: "",
        role: "",
        gender: "",
        termsAccepted: false,
        isFirstNameEmpty: false,
        isLastNameEmpty: false,
        isEmailEmpty: false,
        isMobileNumberEmpty: false,
        isPassEmpty: false,
        isConfirmPassEmpty: false,
        isRoleEmpty: false,
        isGenderEmpty: false,
        isPassMatch: true,
    });

    const [showTermsError, setShowTermsError] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === "checkbox" ? checked : value;
        console.log(inputValue);
        
        setState((prevState) => ({
            ...prevState,
            [name]: inputValue,
            [`is${name.charAt(0).toUpperCase() + name.slice(1)}Empty`]: !inputValue,
            isPassMatch: name === "confirmPass" ? value === state.pass : state.isPassMatch,
        }));
    };

    const handleRegisterBtnClick = (e) => {
        e.preventDefault();

        const fields = ["firstName", "lastName", "email", "mobileNumber", "pass", "confirmPass", "role", "gender"];
        let allFieldsValid = true;

        fields.forEach(field => {
            if (!state[field]) {
                setState((prevState) => ({
                    ...prevState,
                    [`is${field.charAt(0).toUpperCase() + field.slice(1)}Empty`]: true
                }));
                allFieldsValid = false;
            }
        });

        setShowTermsError(!state.termsAccepted);

        console.log("register");
    };

    return (
            <div className="flex items-center justify-center min-h-screen bg-body-color">
            <div className="bg-white shadow-lg p-9 text-center relative w-[700px]">
                <div className="flex flex-col items-center">
                <img src={logo.src} alt="Pharmarack Logo" className="w-[75px]" />
                <p className="pt-5 text-base">
                    <span className="block font-bold text-xl mb-1.25">Welcome to Pharmarack</span>
                    Register to create your account
                </p>
                </div>
                <form >
                <div className="flex mt-8 mb-4">
                    <div className="w-1/2 mr-2">
                        <InputFields
                            type="text"
                            name="firstName" 
                            value={state.firstName} 
                            onChange={handleInputChange} 
                            className="input-primary"
                            placeholder="First Name" 
                        />
                        {state.isFirstNameEmpty && <p className="absolute text-red-500 text-sm">Please enter your first name</p>}
                    </div>
                    <div className="w-1/2 ml-2">
                        <InputFields
                            type="text"
                            name="lastName" 
                            value={state.lastName} 
                            onChange={handleInputChange} 
                            className="input-primary"
                            placeholder="Last Name" 
                        />
                        {state.isLastNameEmpty && <p className="absolute text-red-500 text-sm">Please enter your last name</p>}
                    </div>
                </div>
                <div className="flex mt-8 mb-4">
                    <div className="w-1/2 mr-2">
                        <InputFields
                            type="email" 
                            name="email" 
                            value={state.email} 
                            onChange={handleInputChange} 
                            className="input-primary"
                            placeholder="Email" 
                        />
                        {state.isEmailEmpty && <p className="absolute text-red-500 text-sm">Please enter your email</p>}
                    </div>
                    <div className="w-1/2 ml-2">
                        <InputFields
                            type="text" 
                            name="mobileNumber" 
                            value={state.mobileNumber} 
                            onChange={handleInputChange} 
                            className="input-primary"
                            placeholder="Mobile Number" 
                        />
                        {state.isMobileNumberEmpty && <p className="absolute text-red-500 text-sm">Please enter your mobile number</p>}
                    </div>
                </div>
                <div className="flex mt-8 mb-4">
                    <div className="w-1/2 mr-2">
                        <InputFields
                            type="password" 
                            name="pass" 
                            value={state.password} 
                            onChange={handleInputChange} 
                            className="input-primary"
                            placeholder="Password" 
                        />
                        {state.isPassEmpty && <p className="absolute text-red-500 text-sm">Please enter your password</p>}
                    </div>
                    <div className="w-1/2 ml-2">
                        <InputFields
                            type="password" 
                            name="confirmPass" 
                            value={state.confirmPassword} 
                            onChange={handleInputChange} 
                            className="input-primary"
                            placeholder="Confirm Password" 
                        />
                        {state.isConfirmPassEmpty && <p className="absolute text-red-500 text-sm">Please confirm your password</p>}
                        {!state.isPassMatch && <p className="absolute text-red-500 text-sm">Passwords do not match</p>}
                    </div>
                </div>
                <div className="mt-8 relative">
                    <select 
                    name="role" 
                    onChange={handleInputChange} 
                    value={state.role}
                    className="select-primary"
                    >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                    </select>
                    {state.isRoleEmpty && <p className="text-red-500 absolute">Please select a role</p>}
                </div>
                <div className="mt-8 flex relative">
                    <label className="flex items-center mr-4">
                    Gender:
                    </label>
                    <div className="flex space-x-4">
                    <label className="flex items-center">
                        <input 
                        type="radio" 
                        name="gender" 
                        value="male" 
                        onChange={handleInputChange} 
                        checked={state.gender === "male"}
                        className="mr-2"
                        />
                        Male
                    </label>
                    <label className="flex items-center">
                        <input 
                        type="radio" 
                        name="gender" 
                        value="female" 
                        onChange={handleInputChange} 
                        checked={state.gender === "female"}
                        className="mr-2"
                        />
                        Female
                    </label>
                    <label className="flex items-center">
                        <input 
                        type="radio" 
                        name="gender" 
                        value="other" 
                        onChange={handleInputChange} 
                        checked={state.gender === "other"}
                        className="mr-2"
                        />
                        Other
                    </label>
                    </div>
                    {state.isGenderEmpty && <p className="text-red-500 py-5 absolute">Please select a gender</p>}
                </div>
                <div className="mt-8 flex items-center">
                    <input 
                    type="checkbox" 
                    name="termsAccepted" 
                    onChange={handleInputChange} 
                    checked={state.termsAccepted} 
                    className="mr-2"
                    />
                    <label>I accept the terms and conditions</label>
                </div>
                {showTermsError && !state.termsAccepted && <p className="text-red-500 absolute">You must accept the terms and conditions</p>}
                <div className="mt-10">
                    <buttons
                      onClick={handleRegisterBtnClick}
                      type="submit"
                      className="w-full flex gap-3 justify-center items-center text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        Register
                        <IoIosPlay />
                    </buttons>                
                </div>
                </form>
            </div>
            </div>

    );
};

export default Register;
