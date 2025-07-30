import { useState } from 'react'
import CartCalculation from '../components/CartCalculation';
import { Link, useNavigate } from 'react-router';

function Checkout() {
    // state variables to keep track of entered data and errors if found
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: '',
    });
    const [errors, setErrors] = useState({});

    // function for controlled input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const navigate = useNavigate();

    // function for checking form validation
    const validate = () => {
        // clearing previous errors if any
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must be 10 digits';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        setErrors(newErrors);

        // returns true if no errors exist
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        // calling function to validate form input and proceed to payment page if the return value is true
        if (validate()) {
            navigate('/payment');
        } else {
            alert('Please correct the errors in the form.');
        }
    };

    return (
        <div className='px-8 lg:px-16 py-16 lg:py-8'>
            <div className='md:px-4 lg:py-4'>
                <h3 className='text-center text-2xl md:text-3xl text-[#096B68] font-semibold py-8'>Checkout Details</h3>

                <div className='md:flex md:pt-16 md:pb-8 gap-4'>

                    <div className='md:basis-2/3'>
                        <form className='flex flex-col space-y-4'>
                            <label className='block text-[#129990] font-semibold mb-1'>
                                First Name:
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className='w-full border border-[#129990] rounded px-3 py-2 focus:outline-none'
                                />
                                {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
                            </label>

                            <label className='block text-[#129990] font-semibold mb-1'>
                                Last Name:
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className='w-full border border-[#129990] rounded px-3 py-2 focus:outline-none'
                                />
                                {errors.lastName && <span className='text-red-500 text-sm'>{errors.lastName}</span>}
                            </label>

                            <label className='block text-[#129990] font-semibold mb-1'>
                                Phone Number:
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className='w-full border border-[#129990] rounded px-3 py-2 focus:outline-none'
                                />
                                {errors.phoneNumber && <span className='text-red-500 text-sm'>{errors.phoneNumber}</span>}
                            </label>

                            <label className='block text-[#129990] font-semibold mb-1'>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className='w-full border border-[#129990] rounded px-3 py-2 focus:outline-none'
                                />
                                {errors.email && <span className='text-red-500 text-sm'>{errors.email}</span>}
                            </label>

                            <label className='block text-[#129990] font-semibold mb-1'>
                                Address:
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className='w-full border border-[#129990] rounded px-3 py-2 focus:outline-none'
                                />
                                {errors.address && <span className='text-red-500 text-sm'>{errors.address}</span>}
                            </label>
                        </form>
                    </div>

                    <div className='py-4 md:py-0 md:basis-1/3'>
                        <CartCalculation />
                        <div className='text-center py-2'>
                        
                        <button className='px-4 py-2 rounded-md bg-[#129990] font-semibold text-[#FFFBDE] shadow-xl/30 hover:scale-105' onClick={handleSubmit}>
                            Proceed to Payment
                        </button>
                        
                        </div>
                        
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Checkout