import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import './BankTransferAmountPage.css';

type PartyInfo = {
  account?: string;
  ifsc?: string;
  name?: string;
};

type TransferState = {
  sender?: PartyInfo;
  receiver?: PartyInfo;
};

const BankTransferAmountPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as TransferState | null) ?? {};
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const sender = state.sender ?? {};
  const receiver = state.receiver ?? {};

  const senderLabel = sender.name || sender.account || 'Sender Bank';
  const receiverLabel = receiver.name || receiver.account || 'Receiver Bank';
  const summaryLine = useMemo(() => {
    return `${senderLabel} → ${receiverLabel}`;
  }, [receiverLabel, senderLabel]);

  const receiverInitial = receiverLabel?.trim().charAt(0).toUpperCase() || 'R';

  const isAmountValid = useMemo(() => {
    const normalized = amount.replace(/,/g, '').trim();
    const value = Number(normalized);
    return Number.isFinite(value) && value > 0;
  }, [amount]);

  const handleContinue = () => {
    if (!isAmountValid) {
      return;
    }
    navigate('/camera-capture', {
      state: {
        amount,
        sender,
        receiver,
      },
    });
  };

  return (
    <div className="bank-amount-page">
      <Sidebar />
      <div className="bank-amount-main">
        <div className="bank-amount-content">
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

          <section className="bank-amount-card">
            <div className="bank-amount-avatar">{receiverInitial}</div>
            <p className="bank-amount-paying">Paying {receiverLabel}</p>
            <p className="bank-amount-route">{summaryLine}</p>
            <p className="bank-amount-accounts">
              {sender.ifsc || 'Sender IFSC'} • {receiver.ifsc || 'Receiver IFSC'}
            </p>

            <div className="bank-amount-input">
              <p className="bank-amount-label">Amount</p>
              <div className="bank-amount-field">
                <span>₹</span>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                />
              </div>
              <p className="bank-amount-hint">This amount will be verified with face recognition.</p>
            </div>

            <div className="bank-amount-note">
              <p className="bank-amount-label">Note</p>
              <input
                type="text"
                placeholder="Add note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </div>
          </section>

          <div className="bank-amount-actions">
            <button
              className="bank-amount-continue"
              type="button"
              onClick={handleContinue}
              disabled={!isAmountValid}
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankTransferAmountPage;
