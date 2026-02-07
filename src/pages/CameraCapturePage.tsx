import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import './CameraCapturePage.css';

interface LocationState {
  mode: 'register' | 'login';
  formData?: {
    name: string;
    email: string;
    phone: string;
    password: string;
  };
  email?: string;
  loginData?: {
    email: string;
    password: string;
  };
  countryCode?: string;
}

const CameraCapturePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  // Mapping of dial codes to ISO country codes
  // Note: For shared dial codes like +1 (US/Canada), the first match (US) will be used
  const dialCodeToCountryCode: { [key: string]: string } = {
    '+1': 'US',      // Also used by Canada
    '+7': 'RU',
    '+20': 'EG',
    '+27': 'ZA',
    '+30': 'GR',
    '+31': 'NL',
    '+32': 'BE',
    '+33': 'FR',
    '+34': 'ES',
    '+39': 'IT',
    '+41': 'CH',
    '+43': 'AT',
    '+44': 'GB',
    '+45': 'DK',
    '+46': 'SE',
    '+47': 'NO',
    '+48': 'PL',
    '+49': 'DE',
    '+51': 'PE',
    '+52': 'MX',
    '+54': 'AR',
    '+55': 'BR',
    '+56': 'CL',
    '+57': 'CO',
    '+60': 'MY',
    '+61': 'AU',
    '+62': 'ID',
    '+63': 'PH',
    '+64': 'NZ',
    '+65': 'SG',
    '+66': 'TH',
    '+81': 'JP',
    '+82': 'KR',
    '+84': 'VN',
    '+86': 'CN',
    '+90': 'TR',
    '+91': 'IN',
    '+92': 'PK',
    '+94': 'LK',
    '+234': 'NG',
    '+351': 'PT',
    '+353': 'IE',
    '+358': 'FI',
    '+880': 'BD',
    '+966': 'SA',
    '+971': 'AE',
    '+972': 'IL',
    '+977': 'NP',
  };

  // Get country code from phone number
  const getCountryCodeFromPhone = (phone: string): string | null => {
    if (!phone) return null;
    
    // Sort dial codes by length (longest first) to match correctly
    // This ensures +234 is checked before +23, +971 before +97, etc.
    const sortedDialCodes = Object.entries(dialCodeToCountryCode).sort(
      ([a], [b]) => b.length - a.length
    );
    
    // Check all dial codes to find a match
    for (const [dialCode, countryCode] of sortedDialCodes) {
      if (phone.startsWith(dialCode)) {
        return countryCode;
      }
    }
    
    return null;
  };

  // Format phone number to add space after country code
  const formatPhoneNumber = (phone: string): string => {
    if (!phone) return '';
    
    // Sort dial codes by length (longest first) to match correctly
    const sortedDialCodes = Object.keys(dialCodeToCountryCode).sort(
      (a, b) => b.length - a.length
    );
    
    // Check if phone starts with any country code
    for (const dialCode of sortedDialCodes) {
      if (phone.startsWith(dialCode)) {
        const number = phone.substring(dialCode.length);
        return `${dialCode} ${number}`;
      }
    }
    
    // If no match found, return original
    return phone;
  };

  useEffect(() => {
    // Only start camera if we're on the correct route
    if (location.pathname === '/camera-capture') {
      startCamera();
    } else {
      // If not on camera route, ensure camera is stopped
      stopCamera();
    }
    
    // Cleanup: Stop camera when component unmounts or route changes
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Monitor route changes and stop camera if route changes
  useEffect(() => {
    // If route changes away from camera-capture, stop camera immediately
    if (location.pathname !== '/camera-capture') {
      stopCamera();
      setCameraReady(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const startCamera = async () => {
    // Double check we're on the correct route before accessing camera
    if (location.pathname !== '/camera-capture') {
      console.warn('Camera access attempted outside of /camera-capture route');
      return;
    }

    // Ensure any existing camera stream is stopped first
    stopCamera();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 }
      });
      
      // Verify we're still on the correct route before setting up the stream
      if (location.pathname !== '/camera-capture') {
        // Route changed while getting camera access, stop immediately
        stream.getTracks().forEach(track => {
          track.stop();
          track.enabled = false;
        });
        return;
      }
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraReady(true);
      }
    } catch (err) {
      setError('Unable to access camera. Please allow camera permissions.');
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
        track.enabled = false;
      });
      streamRef.current = null;
    }
    
    // Also clear video element
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      // Pause the video element
      videoRef.current.pause();
    }
    
    // Reset camera ready state
    setCameraReady(false);
  };

  const startCountdown = () => {
    setCountdown(3);
    setIsCapturing(true);
    
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(countdownInterval);
          capturePhoto();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    const base64Image = imageData.split(',')[1];

    // Stop camera immediately after capturing
    stopCamera();
    setCameraReady(false);

    handleImageCapture(base64Image);
  };

  const handleImageCapture = async (base64Image: string) => {
    setIsProcessing(true);
    setError('');

    try {
      if (state?.mode === 'register' && state.formData) {
        // Register flow: Call consent API after capturing
        const response = await fetch('https://ljuyvviqx0.execute-api.us-east-1.amazonaws.com/dev/consent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: `temp_${Date.now()}`, // Temporary ID, API will return actual user_id
            consent: true,
            profile: {
              name: state.formData.name,
              email: state.formData.email,
              phone: state.formData.phone,
            },
            image: base64Image, // Include base64 image
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to register user');
        }

        const data = await response.json();
        console.log('Registration successful:', data);
        
        // Ensure camera is stopped before navigation
        stopCamera();
        
        // Navigate to home page on success
        navigate('/home', { state: { user_id: data.user_id } });
      } else if (state?.mode === 'login') {
        // Login flow: Verify API will be called
        // Ensure camera is stopped before navigation
        stopCamera();
        
        // For now, navigate to home (verify API endpoint to be implemented)
        navigate('/home', { state: { email: state.email } });
      } else {
        // One-time user flow
        // Ensure camera is stopped before navigation
        stopCamera();
        
        navigate('/home');
      }
    } catch (err) {
      console.error('API error:', err);
      setError('Failed to process. Please try again.');
      setIsCapturing(false);
      // Restart camera on error so user can try again
      startCamera();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    // Stop camera before navigating away
    stopCamera();
    setCameraReady(false);
    
    // Navigate back with form data based on mode
    if (state?.mode === 'register' && state?.formData) {
      // Return registration data
      navigate('/auth', { 
        state: { 
          returnedFormData: state.formData,
          mode: 'register',
          countryCode: state?.countryCode
        } 
      });
    } else if (state?.mode === 'login' && state?.loginData) {
      // Return login data
      navigate('/auth', { 
        state: { 
          returnedLoginData: state.loginData,
          mode: 'login'
        } 
      });
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="camera-capture-page">
      {/* TrustFace Logo at Top Right */}
      <div className="camera-top-logo">
        <div className="camera-logo-icon">
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
        <span className="camera-logo-text">TrustFace</span>
      </div>

      <div className="camera-split-container">
        {/* Left Side - User Details */}
        <div className="user-details-side">
          {/* Back Button */}
          <button className="back-button-camera" onClick={handleCancel} aria-label="Go back">
            <div className="back-button-box">
              <span className="back-button-elem">
                <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z" />
                </svg>
              </span>
              <span className="back-button-elem">
                <svg viewBox="0 0 46 40">
                  <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z" />
                </svg>
              </span>
            </div>
          </button>
          
          <div className="user-details-wrapper">
            <div className="user-details-header">
              <div className="user-icon-large">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h2 className="user-details-title">Your Information</h2>
              <p className="user-details-subtitle">
                {state?.mode === 'register' ? 'Please verify your details before face registration' : 
                 state?.mode === 'login' ? 'Verify your identity with face recognition' : 
                 'Your account details'}
              </p>
            </div>

            {(state?.formData || state?.loginData || state?.email) && (
              <div className="user-details-content">
                {state?.formData?.name && (
                  <div className="detail-item">
                    <div className="detail-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div className="detail-content">
                      <span className="detail-label">Full Name</span>
                      <span className="detail-value">{state.formData.name}</span>
                    </div>
                  </div>
                )}
                {(state?.formData?.email || state?.loginData?.email || state?.email) && (
                  <div className="detail-item">
                    <div className="detail-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div className="detail-content">
                      <span className="detail-label">Email Address</span>
                      <span className="detail-value">{state?.formData?.email || state?.loginData?.email || state?.email}</span>
                    </div>
                  </div>
                )}
                {state?.formData?.phone && (
                  <div className="detail-item phone-detail-item">
                    <div className="detail-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div className="detail-content">
                      <span className="detail-label">Phone Number</span>
                      <span className="detail-value">{formatPhoneNumber(state.formData.phone)}</span>
                    </div>
                    {(state?.countryCode || getCountryCodeFromPhone(state.formData.phone)) && (
                      <div className="detail-country-flag">
                        <ReactCountryFlag
                          countryCode={state?.countryCode || getCountryCodeFromPhone(state.formData.phone)!}
                          svg
                          style={{
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '4px',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="user-details-footer">
              <div className="info-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <div>
                  <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600', fontSize: '0.95rem' }}>
                    Face Capture Tips
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
                    <li>Ensure your face is clearly visible and centered in the frame</li>
                    <li>Remove Sun glasses, masks, or any face coverings</li>
                    {/* <li>Look directly at the camera with a neutral expression</li> */}
                    {/* <li>Keep your face centered in the frame</li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Camera */}
        <div className="camera-side">
          <div className="camera-wrapper">
            <div className="camera-header">
              <div className="camera-header-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <h2 className="camera-title">
                {state?.mode === 'register' ? 'Register Your Face' : 
                 state?.mode === 'login' ? 'Verify Your Face' : 
                 'Capture Your Face'}
              </h2>
              <p className="camera-subtitle">
                Position your face in the frame and click capture
              </p>
            </div>

            <div className="camera-preview-container">
              {!cameraReady && !error && (
                <div className="camera-loading">
                  <div className="loading-spinner"></div>
                  <p>Initializing camera...</p>
                </div>
              )}

              {error && (
                <div className="camera-error">
                  <p>{error}</p>
                  <button onClick={handleCancel} className="error-button">
                    Go Back
                  </button>
                </div>
              )}

              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`camera-video ${isCapturing ? 'capturing' : ''}`}
                style={{ display: cameraReady && !error ? 'block' : 'none' }}
              />

              {countdown !== null && countdown > 0 && (
                <div className="countdown-overlay">
                  <div className="countdown-number">{countdown}</div>
                </div>
              )}

              {isProcessing && (
                <div className="processing-overlay">
                  <div className="processing-spinner"></div>
                  <p>Processing your image...</p>
                </div>
              )}

              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>

            <div className="camera-controls">
              {!isCapturing && !isProcessing && cameraReady && (
                <>
                  <button
                    onClick={startCountdown}
                    className="capture-button"
                    disabled={isProcessing}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Capture
                  </button>
                  <button onClick={handleCancel} className="cancel-button">
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraCapturePage;
