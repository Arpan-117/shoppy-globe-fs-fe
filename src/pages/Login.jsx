import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../components/AuthContext'

function Login() {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const {setAuth} = useAuth();
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
                setAuth({isAuthenticated: true, user: data.user.name});
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
        <div>

            <div className='md:basis-2/3'>
                <form className='flex flex-col space-y-4'>
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
                    <button className='px-4 py-2 rounded-md bg-[#129990] font-semibold text-[#FFFBDE] shadow-xl/30 hover:scale-105' onClick={handleSubmit}>
                        Login
                    </button>
                </div>
            </div>

            <div>
                <p>Don't have an account? <span><Link to='/register'>Sign Up</Link></span></p>
            </div>

        </div>
    )
}

export default Login