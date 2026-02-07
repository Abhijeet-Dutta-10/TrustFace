import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import './AuthPage.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  phoneCode: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

type PasswordStrength = 'low' | 'weak' | 'strong' | '';

interface Country {
  code: string;
  dialCode: string;
  name: string;
}

const countries: Country[] = [
  { code: 'IN', dialCode: '+91', name: 'India' },
  { code: 'US', dialCode: '+1', name: 'United States' },
  { code: 'CA', dialCode: '+1', name: 'Canada' },
  { code: 'GB', dialCode: '+44', name: 'United Kingdom' },
  { code: 'AU', dialCode: '+61', name: 'Australia' },
  { code: 'DE', dialCode: '+49', name: 'Germany' },
  { code: 'FR', dialCode: '+33', name: 'France' },
  { code: 'IT', dialCode: '+39', name: 'Italy' },
  { code: 'ES', dialCode: '+34', name: 'Spain' },
  { code: 'MX', dialCode: '+52', name: 'Mexico' },
  { code: 'JP', dialCode: '+81', name: 'Japan' },
  { code: 'CN', dialCode: '+86', name: 'China' },
  { code: 'KR', dialCode: '+82', name: 'South Korea' },
  { code: 'BR', dialCode: '+55', name: 'Brazil' },
  { code: 'RU', dialCode: '+7', name: 'Russia' },
  { code: 'ZA', dialCode: '+27', name: 'South Africa' },
  { code: 'NG', dialCode: '+234', name: 'Nigeria' },
  { code: 'EG', dialCode: '+20', name: 'Egypt' },
  { code: 'SA', dialCode: '+966', name: 'Saudi Arabia' },
  { code: 'AE', dialCode: '+971', name: 'United Arab Emirates' },
  { code: 'SG', dialCode: '+65', name: 'Singapore' },
  { code: 'MY', dialCode: '+60', name: 'Malaysia' },
  { code: 'TH', dialCode: '+66', name: 'Thailand' },
  { code: 'VN', dialCode: '+84', name: 'Vietnam' },
  { code: 'PH', dialCode: '+63', name: 'Philippines' },
  { code: 'ID', dialCode: '+62', name: 'Indonesia' },
  { code: 'PK', dialCode: '+92', name: 'Pakistan' },
  { code: 'BD', dialCode: '+880', name: 'Bangladesh' },
  { code: 'NZ', dialCode: '+64', name: 'New Zealand' },
  { code: 'AR', dialCode: '+54', name: 'Argentina' },
  { code: 'CL', dialCode: '+56', name: 'Chile' },
  { code: 'CO', dialCode: '+57', name: 'Colombia' },
  { code: 'PE', dialCode: '+51', name: 'Peru' },
  { code: 'NL', dialCode: '+31', name: 'Netherlands' },
  { code: 'BE', dialCode: '+32', name: 'Belgium' },
  { code: 'SE', dialCode: '+46', name: 'Sweden' },
  { code: 'NO', dialCode: '+47', name: 'Norway' },
  { code: 'DK', dialCode: '+45', name: 'Denmark' },
  { code: 'FI', dialCode: '+358', name: 'Finland' },
  { code: 'PL', dialCode: '+48', name: 'Poland' },
  { code: 'AT', dialCode: '+43', name: 'Austria' },
  { code: 'CH', dialCode: '+41', name: 'Switzerland' },
  { code: 'PT', dialCode: '+351', name: 'Portugal' },
  { code: 'GR', dialCode: '+30', name: 'Greece' },
  { code: 'TR', dialCode: '+90', name: 'Turkey' },
  { code: 'IL', dialCode: '+972', name: 'Israel' },
  { code: 'IE', dialCode: '+353', name: 'Ireland' },
  { code: 'NP', dialCode: '+977', name: 'Nepal' },
  { code: 'LK', dialCode: '+94', name: 'Sri Lanka' },
];

const AuthPage = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const [isEntering, setIsEntering] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    phoneCode: '+91',
    password: '',
  });
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false);
      }
    };

    if (showCountryDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCountryDropdown]);

  // Clear password strength indicator when switching to login mode
  useEffect(() => {
    if (isLogin) {
      setPasswordStrength('');
    }
  }, [isLogin]);

  // Handle returning from camera capture with form data
  useEffect(() => {
    const state = location.state as { 
      returnedFormData?: { name: string; email: string; phone: string; password: string }; 
      returnedLoginData?: { email: string; password: string };
      mode?: string;
      countryCode?: string;
    } | null;
    
    // Handle register mode return
    if (state?.returnedFormData && state?.mode === 'register') {
      const { returnedFormData, countryCode } = state;
      
      // Parse phone number to extract country code and number
      let phoneCode = '+91';
      let phoneNumber = returnedFormData.phone;
      
      // First, try to use the countryCode if provided (handles shared dial codes like +1 for US/CA)
      if (countryCode) {
        const matchedCountryByCode = countries.find(country => country.code === countryCode);
        if (matchedCountryByCode) {
          phoneCode = matchedCountryByCode.dialCode;
          phoneNumber = returnedFormData.phone.substring(matchedCountryByCode.dialCode.length);
          setSelectedCountry(matchedCountryByCode);
        }
      } else {
        // Fallback: Find matching country code from the full phone number
        const matchedCountry = countries.find(country => 
          returnedFormData.phone.startsWith(country.dialCode)
        );
        
        if (matchedCountry) {
          phoneCode = matchedCountry.dialCode;
          phoneNumber = returnedFormData.phone.substring(matchedCountry.dialCode.length);
          setSelectedCountry(matchedCountry);
        }
      }
      
      // Populate form data for register mode
      setFormData({
        name: returnedFormData.name || '',
        email: returnedFormData.email || '',
        phone: phoneNumber,
        phoneCode: phoneCode,
        password: returnedFormData.password || '',
      });
      
      setIsLogin(false);
      
      // Check password strength for signup mode
      if (returnedFormData.password) {
        setPasswordStrength(checkPasswordStrength(returnedFormData.password));
      }
      
      // Clear the state to prevent re-population on refresh
      window.history.replaceState({}, document.title);
    } 
    // Handle login mode return
    else if (state?.returnedLoginData && state?.mode === 'login') {
      const { returnedLoginData } = state;
      
      // Populate form data for login mode (only email and password)
      setFormData({
        name: '',
        email: returnedLoginData.email || '',
        phone: '',
        phoneCode: '+91',
        password: returnedLoginData.password || '',
      });
      
      setIsLogin(true);
      setPasswordStrength(''); // Clear password strength for login mode
      
      // Clear the state to prevent re-population on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Handle page enter animation
  useEffect(() => {
    // Prevent body scrolling during initial animation
    document.body.classList.add('page-transitioning');
    
    // Trigger enter animation when component mounts
    setIsEntering(true);
    const timer = setTimeout(() => {
      setIsEntering(false);
      // Re-enable scrolling after animation completes
      setTimeout(() => {
        document.body.classList.remove('page-transitioning');
      }, 600);
    }, 100);
    return () => {
      clearTimeout(timer);
      document.body.classList.remove('page-transitioning');
    };
  }, [location.pathname]);

  const validateName = (name: string): boolean => {
    // Minimum 2 characters, only letters and spaces, no numbers or special characters
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    return nameRegex.test(name.trim());
  };

  const validateEmail = (email: string): boolean => {
    // Comprehensive email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email.trim());
  };

  const validatePhone = (phone: string): boolean => {
    // Phone number should be 6-15 digits
    const phoneRegex = /^\d{6,15}$/;
    return phoneRegex.test(phone.replace(/[-\s]/g, ''));
  };

  const checkPasswordStrength = (password: string): PasswordStrength => {
    if (password.length === 0) return '';
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Character variety checks
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    if (strength <= 2) return 'low';
    if (strength <= 4) return 'weak';
    return 'strong';
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      } else if (!validateName(formData.name)) {
        newErrors.name = 'Name can only contain letters and spaces';
      }
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!isLogin) {
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = 'Phone number must be 6-15 digits';
      }
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (!isLogin) {
      // Only check password strength for sign up, not for sign in
      const strength = checkPasswordStrength(formData.password);
      if (strength === 'low' || strength === 'weak') {
        newErrors.password = `Password is too ${strength}. Please use a strong password.`;
      } else if (strength !== 'strong') {
        newErrors.password = 'Password must be strong';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Name validation - only allow letters and spaces
    if (name === 'name') {
      const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData((prev) => ({ ...prev, [name]: filteredValue }));
    } else if (name === 'phone') {
      // Phone validation - only allow digits
      const filteredValue = value.replace(/\D/g, '');
      setFormData((prev) => ({ ...prev, [name]: filteredValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    // Check password strength in real-time (only for sign up, not sign in)
    if (name === 'password' && !isLogin) {
      setPasswordStrength(checkPasswordStrength(value));
    } else if (name === 'password' && isLogin) {
      // Clear password strength indicator when in login mode
      setPasswordStrength('');
    }
    
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCountrySelect = (country: Country) => {
    setFormData((prev) => ({ ...prev, phoneCode: country.dialCode }));
    setSelectedCountry(country);
    setShowCountryDropdown(false);
  };

  const handleGoogleSignIn = () => {
    // Google sign in logic will be implemented
    console.log('Google sign in');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        // Login logic - verify API will be called
        // For now, navigate to camera capture for verification
        navigate('/camera-capture', { 
          state: { 
            mode: 'login',
            email: formData.email,
            loginData: {
              email: formData.email,
              password: formData.password
            }
          } 
        });
      } else {
        // Register - navigate to camera capture first
        navigate('/camera-capture', { 
          state: { 
            mode: 'register',
            formData: {
              ...formData,
              phone: `${formData.phoneCode}${formData.phone}`
            },
            countryCode: selectedCountry.code
          } 
        });
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`auth-page ${isEntering ? 'page-enter' : 'page-enter-active'}`}>
      {/* TrustFace Logo at Top Right */}
      <div className="auth-top-logo">
        <div className="auth-logo-icon">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path
              d="M6 21C6 17 9 14 12 14C15 14 18 17 18 21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M2 12L4 10L6 12L10 8L12 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="20" cy="4" r="2" fill="currentColor"/>
          </svg>
        </div>
        <span className="auth-logo-text">TrustFace</span>
      </div>

      <div className="auth-container">
        {/* Left Side - Form */}
        <div className="auth-left">
          <div className="auth-content">
            <div className="auth-header">
              <h1 className={`auth-title ${isLogin ? 'login-title' : 'signup-title'}`}>
                {isLogin ? 'Welcome Back' : 'Welcome'}
              </h1>
              <p className={`auth-subtitle ${isLogin ? 'login-subtitle' : 'signup-subtitle'}`}>
                {isLogin 
                  ? 'Welcome back, please enter your details' 
                  : 'Create your account to get started'}
              </p>
            </div>

            <div className="auth-tabs">
              <button
                className={`auth-tab ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
              <button
                className={`auth-tab ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                Sign In
              </button>
            </div>

            <div className="auth-form-container">
              <form onSubmit={handleSubmit} className="auth-form">
                <div className={`auth-form-content ${isLogin ? 'login-mode' : 'signup-mode'}`}>
                  {!isLogin && (
                    <div className={`auth-form-group form-field-enter ${isLogin ? 'form-field-exit' : ''}`}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`auth-input ${errors.name ? 'error' : ''}`}
                      />
                      {errors.name && <span className="auth-error">{errors.name}</span>}
                    </div>
                  )}

                  <div className="auth-form-group">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`auth-input ${errors.email ? 'error' : ''}`}
                      autoComplete="email"
                    />
                    {errors.email && <span className="auth-error">{errors.email}</span>}
                  </div>

                  {!isLogin && (
                      <div className={`auth-form-group form-field-enter ${isLogin ? 'form-field-exit' : ''}`}>
                      <div className="phone-input-wrapper">
                        <div className="phone-code-selector" ref={countryDropdownRef}>
                          <button
                            type="button"
                            className="phone-code-button"
                            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                          >
                            <span className="phone-flag">
                              <ReactCountryFlag
                                countryCode={selectedCountry.code}
                                svg
                                style={{
                                  width: '1.5rem',
                                  height: '1.5rem',
                                }}
                                title={selectedCountry.name}
                              />
                            </span>
                            <span className="phone-code">{formData.phoneCode}</span>
                            <svg
                              className={`phone-dropdown-icon ${showCountryDropdown ? 'open' : ''}`}
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path
                                d="M3 4.5L6 7.5L9 4.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          {showCountryDropdown && (
                            <div className="country-dropdown">
                              {countries.map((country) => (
                                <button
                                  key={country.code}
                                  type="button"
                                  className="country-option"
                                  onClick={() => handleCountrySelect(country)}
                                >
                                  <span className="country-flag">
                                    <ReactCountryFlag
                                      countryCode={country.code}
                                      svg
                                      style={{
                                        width: '1.5rem',
                                        height: '1.5rem',
                                      }}
                                      title={country.name}
                                    />
                                  </span>
                                  <span className="country-name">{country.name}</span>
                                  <span className="country-code">{country.dialCode}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`auth-input phone-input ${errors.phone ? 'error' : ''}`}
                          maxLength={15}
                        />
                      </div>
                      {errors.phone && <span className="auth-error">{errors.phone}</span>}
                    </div>
                  )}

                  <div className="auth-form-group">
                    <div className="password-input-wrapper">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`auth-input password-input ${errors.password ? 'error' : ''}`}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        ) : (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {formData.password && !isLogin && (
                      <div className="password-strength">
                        <div className="password-strength-bars">
                          <div
                            className={`strength-bar ${passwordStrength === 'low' ? 'low' : ''} ${passwordStrength === 'weak' ? 'weak' : ''} ${passwordStrength === 'strong' ? 'strong' : ''}`}
                          ></div>
                          <div
                            className={`strength-bar ${passwordStrength === 'weak' ? 'weak' : ''} ${passwordStrength === 'strong' ? 'strong' : ''}`}
                          ></div>
                          <div
                            className={`strength-bar ${passwordStrength === 'strong' ? 'strong' : ''}`}
                          ></div>
                        </div>
                        <span className={`password-strength-text ${passwordStrength}`}>
                          {passwordStrength === 'low' && 'Low'}
                          {passwordStrength === 'weak' && 'Weak'}
                          {passwordStrength === 'strong' && 'Strong'}
                        </span>
                      </div>
                    )}
                    {errors.password && <span className="auth-error">{errors.password}</span>}
                  </div>
                </div>

                <div className="auth-divider">
                  <div className="auth-divider-line"></div>
                  <span className="auth-divider-text">Or {isLogin ? 'sign in' : 'sign up'} with email</span>
                  <div className="auth-divider-line"></div>
                </div>

                <div className="auth-social-buttons">
                  <button
                    type="button"
                    className="auth-social-button"
                    onClick={handleGoogleSignIn}
                  >
                    <div className="auth-social-icon">
                      <svg viewBox="0 0 533.5 544.3" className="w-4 h-4">
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4"
                        />
                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853"
                        />
                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                          fill="#fbbc04"
                        />
                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                          fill="#ea4335"
                        />
                      </svg>
                    </div>
                    <span>Continue with Google</span>
                  </button>
                </div>

                <button
                  type="submit"
                  className="auth-submit-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
                      <svg
                        className="auth-submit-icon"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side - TrustFace Logo */}
        <div className="auth-right">
          <div className="auth-illustration">
            <div className="trustface-logo-illustration">
              <div className="trustface-logo-large">
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path
                    d="M6 21C6 17 9 14 12 14C15 14 18 17 18 21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M2 12L4 10L6 12L10 8L12 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <circle cx="20" cy="4" r="2" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <div className="illustration-text">
              <h2>Secure & Trusted</h2>
              <p>Your face is your password. Experience secure payments with advanced face recognition technology.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
