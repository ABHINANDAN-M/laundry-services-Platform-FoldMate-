// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Mail, Lock, Eye, EyeOff, User, Phone, WashingMachine } from 'lucide-react';
// import Swal from 'sweetalert2';

// const SignUp: React.FC = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const validateForm = () => {
//     if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing Information',
//         text: 'Please fill in all fields',
//         confirmButtonColor: '#3B82F6',
//       });
//       return false;
//     }

//     if (!formData.email.includes('@')) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Invalid Email',
//         text: 'Please enter a valid email address',
//         confirmButtonColor: '#3B82F6',
//       });
//       return false;
//     }

//     if (formData.password.length < 6) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Password Too Short',
//         text: 'Password must be at least 6 characters long',
//         confirmButtonColor: '#3B82F6',
//       });
//       return false;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Passwords Don\'t Match',
//         text: 'Please make sure both passwords match',
//         confirmButtonColor: '#3B82F6',
//       });
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;

//     setIsLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       Swal.fire({
//         icon: 'success',
//         title: 'Account Created!',
//         text: 'Welcome to FoldMate! Your account has been successfully created.',
//         confirmButtonColor: '#3B82F6',
//         timer: 2500,
//         timerProgressBar: true,
//       });
//     }, 2000);
//   };

//   const handleSocialSignUp = (provider: string) => {
//     Swal.fire({
//       icon: 'info',
//       title: `${provider} Sign Up`,
//       text: `${provider} authentication would be implemented here`,
//       confirmButtonColor: '#3B82F6',
//     });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-blue-400/20"></div>
      
//       {/* Floating elements for visual appeal */}
//       <div className="absolute top-32 right-20 w-28 h-28 bg-purple-200/30 rounded-full blur-xl animate-pulse"></div>
//       <div className="absolute bottom-32 left-16 w-36 h-36 bg-pink-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
//       <div className="absolute top-1/3 right-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl animate-pulse delay-700"></div>

//       <div className="relative w-full max-w-md">
//         <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
//           {/* Logo and Title */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
//               <WashingMachine className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
//               Join FoldMate
//             </h1>
//             <p className="text-gray-600">Create your account and get started!</p>
//           </div>

//           {/* Social Sign Up Buttons */}
//           <div className="space-y-3 mb-6">
//             <button
//               onClick={() => handleSocialSignUp('Google')}
//               className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
//             >
//               <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
//                 <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                 <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                 <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                 <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//               </svg>
//               <span className="text-gray-700 font-medium">Sign up with Google</span>
//             </button>

//             <button
//               onClick={() => handleSocialSignUp('Facebook')}
//               className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
//             >
//               <svg className="w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
//                 <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//               </svg>
//               <span className="text-gray-700 font-medium">Sign up with Facebook</span>
//             </button>
//           </div>

//           {/* Divider */}
//           <div className="relative mb-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-200"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-4 bg-white text-gray-500">Or sign up with email</span>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Full Name Field */}
//             <div className="space-y-2">
//               <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
//                 Full Name
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   id="fullName"
//                   name="fullName"
//                   type="text"
//                   value={formData.fullName}
//                   onChange={handleInputChange}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
//                   placeholder="Enter your full name"
//                 />
//               </div>
//             </div>

//             {/* Email Field */}
//             <div className="space-y-2">
//               <label htmlFor="email" className="text-sm font-medium text-gray-700">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>

//             {/* Phone Field */}
//             <div className="space-y-2">
//               <label htmlFor="phone" className="text-sm font-medium text-gray-700">
//                 Phone Number
//               </label>
//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   id="phone"
//                   name="phone"
//                   type="tel"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
//                   placeholder="Enter your phone number"
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div className="space-y-2">
//               <label htmlFor="password" className="text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
//                   placeholder="Create a password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//             </div>

//             {/* Confirm Password Field */}
//             <div className="space-y-2">
//               <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
//                   placeholder="Confirm your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//             </div>

//             {/* Sign Up Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg mt-6"
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center">
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                   Creating Account...
//                 </div>
//               ) : (
//                 'Create Account'
//               )}
//             </button>
//           </form>

//           {/* Sign In Link */}
//           <div className="mt-6 text-center">
//             <p className="text-gray-600">
//               Already have an account?{' '}
//               <Link
//                 to="/signin"
//                 className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
//               >
//                 Sign in here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Mail, Lock, Eye, EyeOff, User, WashingMachine } from 'lucide-react';
// import Swal from 'sweetalert2';

// const SignUp: React.FC = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: 'customer', // default
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const validateForm = () => {
//     if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing Information',
//         text: 'Please fill in all fields',
//         confirmButtonColor: '#3B82F6',
//       });
//       return false;
//     }

//     if (!formData.email.includes('@')) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Invalid Email',
//         text: 'Please enter a valid email address',
//         confirmButtonColor: '#3B82F6',
//       });
//       return false;
//     }

//     if (formData.password.length < 6) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Password Too Short',
//         text: 'Password must be at least 6 characters long',
//         confirmButtonColor: '#3B82F6',
//       });
//       return false;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       Swal.fire({
//         icon: 'error',
//         title: "Passwords Don't Match",
//         text: 'Please make sure both passwords match',
//         confirmButtonColor: '#3B82F6',
//       });
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsLoading(true);

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name: formData.fullName,
//           email: formData.email,
//           password: formData.password,
//           role: formData.role,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Sign up failed');
//       }

//       Swal.fire({
//         icon: 'success',
//         title: 'Account Created!',
//         text: data.message || 'Signup successful.',
//         confirmButtonColor: '#3B82F6',
//         timer: 1000,
//         timerProgressBar: true,
//       });

//       navigate('/signin');
//     } catch (error: any) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Signup Error',
//         text: error.message || 'Unexpected error. Please try again.',
//         confirmButtonColor: '#3B82F6',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-blue-400/20"></div>
//       <div className="absolute top-32 right-20 w-28 h-28 bg-purple-200/30 rounded-full blur-xl animate-pulse"></div>
//       <div className="absolute bottom-32 left-16 w-36 h-36 bg-pink-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
//       <div className="absolute top-1/3 right-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl animate-pulse delay-700"></div>

//       <div className="relative w-full max-w-md">
//         <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
//               <WashingMachine className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
//               Join FoldMate
//             </h1>
//             <p className="text-gray-600">Create your account and get started!</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Full Name */}
//             <InputField id="fullName" icon={<User />} placeholder="Enter your full name" value={formData.fullName} onChange={handleInputChange} />
//             {/* Email */}
//             <InputField id="email" icon={<Mail />} placeholder="Enter your email" value={formData.email} onChange={handleInputChange} type="email" />
//             {/* Role Dropdown */}
//             <div className="space-y-2">
//               <label htmlFor="role" className="text-sm font-medium text-gray-700">Role</label>
//               <select
//                 id="role"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleInputChange}
//                 className="w-full pl-3 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50 transition-all"
//               >
//                 <option value="customer">Customer</option>
//                 <option value="washerman">Washerman</option>
//               </select>
//             </div>
//             {/* Password */}
//             <InputField id="password" icon={<Lock />} placeholder="Create a password" value={formData.password} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} toggleVisibility={() => setShowPassword(!showPassword)} visible={showPassword} />
//             {/* Confirm Password */}
//             <InputField id="confirmPassword" icon={<Lock />} placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleInputChange} type={showConfirmPassword ? 'text' : 'password'} toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)} visible={showConfirmPassword} />

//             <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg mt-4">
//               {isLoading ? (
//                 <div className="flex items-center justify-center">
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                   Creating Account...
//                 </div>
//               ) : 'Create Account'}
//             </button>
//           </form>

//           {/* Social Icons at bottom */}
//           <div className="flex items-center justify-center mt-6 space-x-6">
//             {/* Google */}
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
//               alt="Google"
//               className="w-6 h-6 cursor-pointer"
//               onClick={() => Swal.fire('Info', 'Google signup coming soon', 'info')}
//             />
//             {/* Facebook */}
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/1/16/Facebook-icon-1.png"
//               alt="Facebook"
//               className="w-6 h-6 cursor-pointer"
//               onClick={() => Swal.fire('Info', 'Facebook signup coming soon', 'info')}
//             />
//           </div>

//           <div className="mt-6 text-center">
//             <p className="text-gray-600">
//               Already have an account?{' '}
//               <Link to="/signin" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
//                 Sign in here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Reusable Input Field
// const InputField = ({ id, icon, placeholder, value, onChange, type = 'text', toggleVisibility, visible }: any) => (
//   <div className="space-y-2">
//     <label htmlFor={id} className="text-sm font-medium text-gray-700">
//       {id.charAt(0).toUpperCase() + id.slice(1).replace(/([A-Z])/g, ' $1')}
//     </label>
//     <div className="relative">
//       <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>
//       <input
//         id={id}
//         name={id}
//         type={type}
//         value={value}
//         onChange={onChange}
//         className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50"
//         placeholder={placeholder}
//       />
//       {toggleVisibility && (
//         <button type="button" onClick={toggleVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
//           {visible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//         </button>
//       )}
//     </div>
//   </div>
// );

// export default SignUp;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, WashingMachine, Phone } from 'lucide-react';
import Swal from 'sweetalert2';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    contact: '',
    confirmPassword: '',
    role: 'customer',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { fullName, email, password, confirmPassword, contact } = formData;
    if (!fullName || !email || !password || !confirmPassword || !contact) {
      Swal.fire({ icon: 'warning', title: 'Missing Information', text: 'Please fill in all fields', confirmButtonColor: '#3B82F6' });
      return false;
    }
    if (!email.includes('@')) {
      Swal.fire({ icon: 'error', title: 'Invalid Email', text: 'Please enter a valid email address', confirmButtonColor: '#3B82F6' });
      return false;
    }
    if (password.length < 6) {
      Swal.fire({ icon: 'error', title: 'Password Too Short', text: 'Password must be at least 6 characters long', confirmButtonColor: '#3B82F6' });
      return false;
    }
    if (password !== confirmPassword) {
      Swal.fire({ icon: 'error', title: "Passwords Don't Match", text: 'Please make sure both passwords match', confirmButtonColor: '#3B82F6' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          contact: formData.contact,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Signup failed');

      Swal.fire({
        icon: 'success',
        title: 'Account Created!',
        text: json.message || 'Signup successful.',
        confirmButtonColor: '#3B82F6',
        timer: 1500,
        timerProgressBar: true,
      });

      navigate('/signin');
    } catch (err: any) {
      Swal.fire({ icon: 'error', title: 'Signup Error', text: err.message || 'Unexpected error. Please try again.', confirmButtonColor: '#3B82F6' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-white px-4 py-10 overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-blue-400/20"></div>
        <div className="absolute top-32 right-20 w-28 h-28 bg-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-36 h-36 bg-pink-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-10 w-20 h-20 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
              <WashingMachine className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
              Join FoldMate
            </h1>
            <p className="text-gray-600">Create your account and get started!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField id="fullName" label="Full Name" icon={<User />} placeholder="Enter your full name" name="fullName" value={formData.fullName} onChange={handleInputChange} />
            <InputField id="email" label="Email Address" icon={<Mail />} placeholder="Enter your email" type="email" name="email" value={formData.email} onChange={handleInputChange} />
            <InputField id="contact" label="Contact Number" icon={<Phone />} placeholder="Enter your contact number" type="tel" name="contact" value={formData.contact} onChange={handleInputChange} />

            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium text-gray-700">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="customer">Customer</option>
                <option value="washerman">Washerman</option>
              </select>
            </div>

            <InputField
              id="password"
              label="Password"
              icon={<Lock />}
              placeholder="Create a password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              toggleVisibility={() => setShowPassword(!showPassword)}
              visible={showPassword}
            />
            <InputField
              id="confirmPassword"
              label="Confirm Password"
              icon={<Lock />}
              placeholder="Confirm your password"
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
              visible={showConfirmPassword}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading
                ? <div className="flex items-center justify-center"><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>Creating Account...</div>
                : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/signin" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Field Component
interface InputProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  name?: string;
  value: string;
  onChange: (e: any) => void;
  toggleVisibility?: () => void;
  visible?: boolean;
}

const InputField: React.FC<InputProps> = ({
  id, label, icon, placeholder,
  type = 'text', name, value, onChange,
  toggleVisibility, visible
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50 transition-all"
      />
      {toggleVisibility && (
        <button type="button" onClick={toggleVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
          {visible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      )}
    </div>
  </div>
);

export default SignUp;

