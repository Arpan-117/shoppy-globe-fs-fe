import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../components/AuthContext'

function Login() {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (!validate()) {
            alert('Please correct the errors in the form.');
        } else {
            let response = fetch('http://localhost:5000/api/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: emailId,
                    password: password
                })
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Login failed");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    console.log(data.accesstoken);
                    localStorage.setItem("token", data.accesstoken);
                    localStorage.setItem("user", data.user.name);
                    localStorage.setItem("id", data.user.userId);
                    setEmailId("");
                    setPassword("");
                    setAuth({ isAuthenticated: true, user: data.user.name });
                    navigate('/');
                })
                .catch((err) => {
                    console.error(`Login Error: ${err}`);
                })
        }
    }

    const validate = () => {
        const newErrors = {};

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
        <div className='px-8 lg:px-16 py-16 lg:py-8'>

            {/* <div className='bg-black'> */}
                <div className='py-2 md:py-4 px-4 flex flex-row fixed top-0 w-full z-10'>
                    <div className='py-2 basis-1/3 md:basis-1/4'>
                        <Link to='/'>
                            <h1 className='font-semibold font-[Kaushan_Script] text-xl md:text-3xl text-[#129990]'>Shoppy Globe</h1>
                        </Link>
                    </div>
                </div>
            {/* </div> */}

            {/* <h3 className='text-center text-2xl md:text-3xl text-[#096B68] font-semibold py-4'>Welcome Back</h3>
            <p className='text-center text-[#129990] font-semibold py-4'>Glad to have you back. Please enter your details.</p> */}

            <div className='md:w-1/2 lg:w-1/3 mx-auto py-16'>

                <h3 className='text-center md:text-left text-2xl md:text-3xl text-[#096B68] font-semibold py-4'>Welcome Back</h3>
                <p className='text-center md:text-left text-[#129990] font-semibold pb-4'>Glad to have you back! Please enter your details.</p>

                <form className='flex flex-col space-y-4 py-4'>
                    <label className='block text-[#096B68] font-semibold mb-1'>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={emailId}
                            placeholder='Enter your email'
                            onChange={(e) => setEmailId(e.target.value)}
                            className='w-full border border-[#129990] rounded px-3 py-2 focus:outline-none'
                        />
                        {errors.email && <span className='text-red-500 text-sm'>{errors.email}</span>}
                    </label>

                    <label className='block text-[#096B68] font-semibold mb-1'>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full border border-[#129990] rounded px-3 py-2 focus:outline-none'
                        />
                        {errors.pass && <span className='text-red-500 text-sm'>{errors.pass}</span>}
                    </label>
                </form>

                <div className='text-center py-2'>
                    <button className='px-4 py-2 rounded-md bg-[#129990] font-semibold text-[#FFFBDE] shadow-xl/30 hover:scale-105' onClick={handleSubmit}>
                        Login
                    </button>
                </div>

                <div className='py-4 text-center'>
                    <p>Don't have an account? <span className='font-semibold text-[#129990]'><Link to='/register'>Sign Up</Link></span></p>
                </div>

            </div>

            {/* <div>
                <p>Don't have an account? <span><Link to='/register'>Sign Up</Link></span></p>
            </div> */}

        </div>
    )
}

export default Login