import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import paths from '../../routes/paths';
import '../CameraCapturePage.css';
import './FriendsConfirmPage.css';

type PartyInfo = {
  name?: string;
  phone?: string;
  upiId?: string;
};

type TransferState = {
  sender?: PartyInfo;
  receiver?: PartyInfo;
  amount?: string;
  note?: string;
};

const FriendsConfirmPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as TransferState | null) ?? {};
  const sender = state.sender ?? {};
  const receiver = state.receiver ?? {};
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [cameraReady, setCameraReady] = useState(false);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const formatPhone = (phone?: string) => {
    const trimmed = phone?.trim();
    if (!trimmed) {
      return '+91 90000 00000';
    }
    const digits = trimmed.replace(/\D/g, '');
    const localNumber = digits.length > 10 ? digits.slice(-10) : digits.padStart(10, '0');
    const first = localNumber.slice(0, 5);
    const last = localNumber.slice(5);
    return `+91 ${first} ${last}`;
  };
  const senderName = sender.name?.trim() || 'You';
  const senderPhone = formatPhone(sender.phone);
  const senderUpi = sender.upiId?.trim() || 'you@upi';
  const receiverName = receiver.name?.trim() || 'Receiver Name';
  const receiverPhone = formatPhone(receiver.phone);
  const receiverUpi = receiver.upiId?.trim() || 'friend@upi';

  const amountValue = state.amount?.trim() || '0';
  const amountDisplay = amountValue ? `₹ ${amountValue}` : '₹ 0';
  const note = state.note?.trim();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: 640, height: 480 },
        });
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
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
          track.enabled = false;
        });
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current.pause();
      }
      setCameraReady(false);
    };

    startCamera();
    return () => stopCamera();
  }, []);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || isProcessing || !cameraReady) {
      return;
    }
    setIsProcessing(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, width, height);
    }
    setIsProcessing(false);
    setIsCapturing(false);
    setCountdown(null);
    navigate(paths.home);
  };

  const startCountdown = () => {
    if (isCapturing || isProcessing) {
      return;
    }
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

  return (
    <div className="camera-capture-page bank-transfer-confirm-page">
      <div className="camera-top-logo">
        <div className="camera-logo-icon">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
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
            <circle cx="20" cy="4" r="2" fill="currentColor" />
          </svg>
        </div>
        <span className="camera-logo-text">TrustFace</span>
      </div>

      <div className="camera-split-container">
        <div className="user-details-side">
          <button className="back-button-camera" onClick={() => navigate(-1)} aria-label="Go back">
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
            <div className="user-details-header compact-header">
              <h2 className="user-details-title">Payment Details</h2>
              <p className="user-details-subtitle">
                Review the sender, receiver, and amount before confirming the payment.
              </p>
            </div>

            <div className="transfer-details-cards">
              <div className="transfer-details-card">
                <div className="transfer-card-title">Sender&apos;s Information</div>
                <div className="transfer-details-row">
                  <span>Full Name</span>
                  <strong>{senderName}</strong>
                </div>
                <div className="transfer-details-row">
                  <span>Phone Number</span>
                  <strong>{senderPhone}</strong>
                </div>
                <div className="transfer-details-row">
                  <span>UPI ID</span>
                  <strong>{senderUpi}</strong>
                </div>
              </div>

              <div className="transfer-details-card">
                <div className="transfer-card-title">Receiver&apos;s Information</div>
                <div className="transfer-details-row">
                  <span>Full Name</span>
                  <strong>{receiverName}</strong>
                </div>
                <div className="transfer-details-row">
                  <span>Phone Number</span>
                  <strong>{receiverPhone}</strong>
                </div>
                <div className="transfer-details-row">
                  <span>UPI ID</span>
                  <strong>{receiverUpi}</strong>
                </div>
              </div>

              <div className="transfer-details-card">
                <div className="transfer-card-title">Payment</div>
                <div className="transfer-details-row">
                  <span>Amount</span>
                  <strong>{amountDisplay}</strong>
                </div>
                <div className="transfer-details-row">
                  <span>Note</span>
                  <strong>{note || 'No note added'}</strong>
                </div>
              </div>
            </div>

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
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="camera-side">
          <div className="camera-wrapper">
            <div className="camera-header">
              <div className="camera-header-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <h2 className="camera-title">Payment Verification</h2>
              <p className="camera-subtitle">Verify your face to authorize the payment.</p>
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
                  <button onClick={() => window.location.reload()} className="error-button">
                    Try Again
                  </button>
                </div>
              )}

              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`camera-video ${isProcessing ? 'capturing' : ''}`}
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
                  <p>Capturing your face...</p>
                </div>
              )}

              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>

            <div className="camera-controls">
              <button
                className="capture-button"
                type="button"
                onClick={startCountdown}
                disabled={!cameraReady || Boolean(error) || isProcessing || isCapturing}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Capture
              </button>
              <button className="cancel-button" type="button" onClick={() => navigate(-1)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsConfirmPage;
