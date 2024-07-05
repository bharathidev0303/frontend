import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import Buttons from '../controls/Buttons';
import InputFields from '../controls/InputFields';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaRegSave } from "react-icons/fa";

const Profile = () => {
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        dateOfBirth: null,
        isFirstNameEmpty: false,
        isLastNameEmpty: false,
        isMobileNumberEmpty: false,
        isDateOfBirthEmpty: false,
    });

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let inputValue = value;

        if (name === "firstName" || name === "lastName") {
            inputValue = value.replace(/[^A-Za-z\s]/g, '');
        } else if (name === "mobileNumber") {
            inputValue = value.replace(/\D/g, '');
        }

        setState((prevState) => ({
            ...prevState,
            [name]: inputValue,
            [`is${name.charAt(0).toUpperCase() + name.slice(1)}Empty`]: !inputValue,
        }));
    };

    const handleDateChange = (date) => {
        setState((prevState) => ({
            ...prevState,
            dateOfBirth: date,
            isDateOfBirthEmpty: !date,
        }));
    };

    const handleSaveBtnClick = (e) => {
        e.preventDefault();

        const fields = ["firstName", "lastName", "mobileNumber", "dateOfBirth"];
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

        if (allFieldsValid) {
            const userData = {
                firstName: state.firstName,
                lastName: state.lastName,
                mobileNumber: state.mobileNumber,
                dateOfBirth: state.dateOfBirth,
            };

            // updateUserProfile(userData);
            console.log("updated user profile");
        }
    };

    const updateUserProfile = async (userData) => {
        try {
            const response = await axios.put('http://localhost:3000/api/user/updateUser', userData);
            console.log('Profile updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating profile:', error.response.data);
        }
    };

    const validateMobileNumber = (mobileNumber) => {
        const mobileRegex = /^[0-9]{10}$/;
        return mobileRegex.test(mobileNumber);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-body-color">
            <div className="bg-white shadow-lg px-9 py-9 text-center relative w-[500px]">
                <div className="flex flex-col items-center">
                    <FaUserCircle size={100} className="text-blue-600" />
                    <p className="pt-5 text-base">
                        <span className="block font-bold text-xl mb-1.25">Profile</span>
                        Update your profile information
                    </p>
                </div>
                <form>
                    <div className="mt-6 mb-4 relative">
                        <label className="block text-left mb-1">First Name</label>
                        <InputFields
                            type="text"
                            name="firstName"
                            value={state.firstName}
                            onChange={handleInputChange}
                            className="input-primary"
                            placeholder="First Name"
                        />
                        {state.isFirstNameEmpty && <p className="text-red-500 text-sm absolute">Please enter your first name</p>}
                    </div>
                    <div className="mt-6 mb-4 relative">
                        <label className="block text-left mb-1">Last Name</label>
                        <InputFields
                            type="text"
                            name="lastName"
                            value={state.lastName}
                            onChange={handleInputChange}
                            className="input-primary"
                            placeholder="Last Name"
                        />
                        {state.isLastNameEmpty && <p className="text-red-500 text-sm absolute">Please enter your last name</p>}
                    </div>
                    <div className="mt-6 mb-4 relative">
                        <label className="block text-left mb-1">Mobile Number</label>
                        <InputFields
                            type="text"
                            name="mobileNumber"
                            value={state.mobileNumber}
                            onChange={handleInputChange}
                            className="input-primary"
                            placeholder="Mobile Number"
                        />
                        {state.isMobileNumberEmpty && <p className="text-red-500 text-sm absolute">Please enter a valid 10-digit mobile number</p>}
                    </div>
                    <div className="mt-6 mb-4 relative">
                        <label className="block text-left mb-1">Date of Birth</label>
                        <DatePicker
                            selected={state.dateOfBirth}
                            onChange={handleDateChange}
                            dateFormat="dd-MM-yyyy"
                            className="input-primary"
                            placeholderText="Date of Birth (dd-mm-yyyy)"
                        />
                        {state.isDateOfBirthEmpty && <p className="text-red-500 text-sm absolute">Please enter your date of birth</p>}
                    </div>
                    <div className="mt-10">
                        <Buttons
                            onClick={handleSaveBtnClick}
                            type="submit"
                            className="w-full flex gap-3 justify-center items-center text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            Save
                            <FaRegSave />
                        </Buttons>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
