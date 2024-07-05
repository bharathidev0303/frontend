import React, { useState } from 'react';
import logo from '../../public/pharmarack.png';
import axios from 'axios';
import Buttons from '../controls/Buttons';
import InputFields from '../controls/InputFields';
import { IoIosPlay } from "react-icons/io";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const moment = require('moment');

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
        dateOfBirth: null,
        termsAccepted: false,
        isFirstNameEmpty: false,
        isLastNameEmpty: false,
        isEmailEmpty: false,
        isMobileNumberEmpty: false,
        isPassEmpty: false,
        isConfirmPassEmpty: false,
        isRoleEmpty: false,
        isGenderEmpty: false,
        isDateOfBirthEmpty: false,
        isPassMatch: true,
    });

    const [showTermsError, setShowTermsError] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        let inputValue = value;
    
        if (name === "firstName" || name === "lastName") {
            inputValue = value.replace(/[^A-Za-z\s]/g, '');
        } else if (name === "mobileNumber") {
            inputValue = value.replace(/\D/g, '');
        } else {
            inputValue = type === "checkbox" ? checked : value;
        }
        
        setState((prevState) => ({
            ...prevState,
            [name]: inputValue,
            [`is${name.charAt(0).toUpperCase() + name.slice(1)}Empty`]: !inputValue,
            isPassMatch: name === "confirmPass" ? value === state.pass : state.isPassMatch,
            isEmailEmpty: name === "email" ? !validateEmail(inputValue) : prevState.isEmailEmpty,
            isMobileNumberEmpty: name === "mobileNumber" ? !validateMobileNumber(inputValue) : prevState.isMobileNumberEmpty,
            isPassEmpty: name === "pass" ? !validatePassword(inputValue) : prevState.isPassEmpty,
            isConfirmPassEmpty: name === "confirmPass" ? !validatePassword(inputValue) : prevState.isConfirmPassEmpty,
        }));
    };
    

    const handleDateChange = (date) => {
        setState((prevState) => ({
            ...prevState,
            dateOfBirth: date,
            isDateOfBirthEmpty: !date,
        }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateMobileNumber = (mobileNumber) => {
        const mobileRegex = /^[0-9]{10}$/;
        return mobileRegex.test(mobileNumber);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleRegisterBtnClick = (e) => {
        e.preventDefault();

        const fields = ["firstName", "lastName", "email", "mobileNumber", "pass", "confirmPass", "role", "gender", "dateOfBirth"];
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

        if (!validateEmail(state.email)) {
            setState((prevState) => ({
                ...prevState,
                isEmailEmpty: true
            }));
            allFieldsValid = false;
        }

        if (!validateMobileNumber(state.mobileNumber)) {
            setState((prevState) => ({
                ...prevState,
                isMobileNumberEmpty: true
            }));
            allFieldsValid = false;
        }

        if (!validatePassword(state.pass)) {
            setState((prevState) => ({
                ...prevState,
                isPassEmpty: true
            }));
            allFieldsValid = false;
        }

        if (state.pass !== state.confirmPass) {
            setState((prevState) => ({
                ...prevState,
                isConfirmPassEmpty: true,
                isPassMatch: false
            }));
            allFieldsValid = false;
        }

        if (allFieldsValid && state.termsAccepted) {
            const date = state.dateOfBirth;
            const formattedDate = moment(date).format('YYYY-MM-DD');

            const userData = {
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                password: state.pass,
                mobileNumber: state.mobileNumber,
                role: state.role,
                gender: state.gender,
                dateOfBirth: formattedDate,
                termsAndCondition: state.termsAccepted
            };
            console.log(userData);
            registerUser(userData);
        }
    };

    const registerUser = async (userData) => {
        try {
            const response = await axios.post('http://localhost:3000/api/user/register', userData);
            console.log('Registration successful:', response.data);
        } catch (error) {
            console.error('Error during registration:', error.response.data);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-body-color">
            <div className="bg-white shadow-lg p-10 text-center relative w-full sm:w-[90%] md:w-[80%] lg:w-[700px]">
                <div className="flex flex-col items-center">
                    <img src={logo.src} alt="Pharmarack Logo" className="w-[75px]" />
                    <p className="pt-5 text-base">
                        <span className="block font-bold text-xl mb-1.25">Welcome to Pharmarack</span>
                        Register to create your account
                    </p>
                </div>
                <form>
                    <div className="flex-row sm:flex mt-8 mb-4">
                        <div className="w-full mx-0 mt-8 mb-8 sm:my-0 sm:w-1/2 sm:mr-2">
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
                        <div className="w-full mx-0 sm:w-1/2 sm:ml-2">
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
                    <div className="flex-row sm:flex mt-8 mb-4">
                        <div className="w-full mx-0 mt-8 mb-8 sm:my-0 sm:w-1/2 sm:mr-2">
                            <InputFields
                                type="email" 
                                name="email" 
                                value={state.email} 
                                onChange={handleInputChange} 
                                className="input-primary"
                                placeholder="Email" 
                            />
                            {state.isEmailEmpty && <p className="absolute text-red-500 text-sm">Please enter a valid email</p>}
                        </div>
                        <div className="w-full mx-0 sm:w-1/2 sm:ml-2">
                            <InputFields
                                type="text" 
                                name="mobileNumber" 
                                value={state.mobileNumber} 
                                onChange={handleInputChange} 
                                className="input-primary"
                                placeholder="Mobile Number" 
                            />
                            {state.isMobileNumberEmpty && <p className="absolute text-red-500 text-sm">Please enter a valid mobile number</p>}
                        </div>
                    </div>
                    <div className="flex-row sm:flex mt-8 mb-4">
                        <div className="w-full mx-0 mt-8 mb-8 sm:my-0 sm:w-1/2 sm:mr-2">
                            <InputFields
                                type="password" 
                                name="pass" 
                                value={state.pass} 
                                onChange={handleInputChange} 
                                className="input-primary"
                                placeholder="Password" 
                            />
                            {state.isPassEmpty && <p className="absolute text-red-500 text-sm">Password must be at least 6 characters long</p>}
                        </div>
                        <div className="w-full mx-0 sm:w-1/2 sm:ml-2">
                            <InputFields
                                type="password" 
                                name="confirmPass" 
                                value={state.confirmPass} 
                                onChange={handleInputChange} 
                                className="input-primary"
                                placeholder="Confirm Password" 
                            />
                            {!state.isPassMatch && <p className="absolute text-red-500 text-sm">Passwords do not match</p>}
                        </div>
                    </div>
                    <div className="flex-row sm:flex mt-8 mb-4">
                        <div className="w-full mx-0 mt-8 mb-8 sm:my-0 sm:w-1/2 sm:mr-2">
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
                        <div className="w-full mx-0 sm:w-1/2 sm:ml-2">
                            <DatePicker
                                selected={state.dateOfBirth}
                                onChange={handleDateChange}
                                dateFormat="dd-MM-yyyy"
                                className="input-primary"
                                placeholderText="Date of Birth (dd-mm-yyyy)"
                            />
                            {state.isDateOfBirthEmpty && <p className="absolute text-red-500 text-sm">Please enter your date of birth</p>}
                        </div>
                    </div>
                    <div className="mt-8 sm:flex relative">
                        <label className="mb-5 flex items-center sm:my-0 sm:mr-4">
                            Gender:
                        </label>
                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    value="Male" 
                                    onChange={handleInputChange} 
                                    checked={state.gender === "Male"}
                                    className="mr-2"
                                />
                                Male
                            </label>
                            <label className="flex items-center">
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    value="Female" 
                                    onChange={handleInputChange} 
                                    checked={state.gender === "Female"}
                                    className="mr-2"
                                />
                                Female
                            </label>
                            <label className="flex items-center">
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    value="Other" 
                                    onChange={handleInputChange} 
                                    checked={state.gender === "Other"}
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
                        <Buttons
                            onClick={handleRegisterBtnClick}
                            type="submit"
                            className="w-full flex gap-3 justify-center items-center text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            Register
                            <IoIosPlay />
                        </Buttons>                
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
