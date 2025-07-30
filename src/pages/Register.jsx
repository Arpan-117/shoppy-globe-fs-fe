import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

function Register() {
    const [fullName, setFullName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleRegister = () => {
        if (!validate()) {
            alert('Please correct the errors in the form.');
        } else {
            let response = fetch('http://localhost:5000/api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: fullName,
                    email: emailId,
                    password: password
                })
            });
            let result = response.then((data) => {
                setFullName("");
                setEmailId("");
                setPassword("");
                alert(`User ${data.name} registered successfully!`);
                navigate('/login');
            })
                .catch((err) => {
                    console.error(`Login Error: ${err}`);
                })
        }
    }

    const validate = () => {
        const newErrors = {};

        if (!fullName.trim()) {
            newErrors.fName = 'Name is required';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailId)) {
            newErrors.email = 'Invalid email format';
        }
        if (!password.trim()) {
            newErrors.pass = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    return (
        <div>
            <div className='md:basis-2/3'>
                <form className='flex flex-col space-y-4'>
                    <label className='block text-[#129990] font-semibold mb-1'>
                        Name:
                        <input
                            type="name"
                            name="name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className='w-full border border-[#129990] rounded px-3 py-2 focus:outline-none'
                        />
                        {errors.fName && <span className='text-red-500 text-sm'>{errors.fName}</span>}
                    </label>

                    <label className='block text-[#129990] font-semibold mb-1'>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            className='w-full border border-[#129990] rounded px-3 py-2 focus:outline-none'
                        />
                        {errors.email && <span className='text-red-500 text-sm'>{errors.email}</span>}
                    </label>

                    <label className='block text-[#129990] font-semibold mb-1'>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full border border-[#129990] rounded px-3 py-2 focus:outline-none'
                        />
                        {errors.pass && <span className='text-red-500 text-sm'>{errors.pass}</span>}
                    </label>
                </form>
                <div className='text-center py-2'>
                    <button className='px-4 py-2 rounded-md bg-[#129990] font-semibold text-[#FFFBDE] shadow-xl/30 hover:scale-105' onClick={handleRegister}>
                        Register
                    </button>
                </div>
            </div>

            <div>
                <p>Already have an account? <span><Link to='/login'>Sign In</Link></span></p>
            </div>

        </div>
    )
}

export default Register