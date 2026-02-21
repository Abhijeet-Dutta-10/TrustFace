import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import paths from '../../../routes/paths';
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
  const quickAmounts = [500, 1000, 2000, 5000];

  const sender = state.sender ?? {};
  const receiver = state.receiver ?? {};
  const formatAccount = (account?: string) => {
    if (!account) {
      return 'XXXX XXXX XXXX';
    }
    const digits = account.replace(/\D/g, '');
    const lastFour = digits.slice(-4);
    return lastFour ? `XXXX XXXX ${lastFour}` : 'XXXX XXXX XXXX';
  };
  const senderAccount = formatAccount(sender.account);
  const receiverAccount = formatAccount(receiver.account);

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
    navigate(paths.bankTransferConfirm, {
      state: {
        amount,
        note,
        sender,
        receiver,
      },
    });
  };

  const handleCancel = () => {
    navigate(paths.bankTransfer);
  };

  return (
    <div className="bank-amount-page">
      <Sidebar />
      <div className="bank-amount-main">
        <div className="bank-amount-content">
          <section className="bank-amount-card">
            <div className="bank-amount-header">
              <div className="bank-amount-avatar">{receiverInitial}</div>
              <div className="bank-amount-title">
                <p className="bank-amount-paying">Paying {receiverLabel}</p>
                <p className="bank-amount-route">{summaryLine}</p>
              </div>
              <div className="bank-amount-badge">Face Verification Enabled</div>
            </div>

            <div className="bank-amount-accounts-grid">
              <div className="bank-amount-account-card">
                <p className="bank-amount-label">From</p>
                <p className="bank-amount-account-value">{senderAccount}</p>
                <p className="bank-amount-account-meta">{sender.ifsc || 'Sender IFSC'}</p>
              </div>
              <div className="bank-amount-account-card">
                <p className="bank-amount-label">To</p>
                <p className="bank-amount-account-value">{receiverAccount}</p>
                <p className="bank-amount-account-meta">{receiver.ifsc || 'Receiver IFSC'}</p>
              </div>
            </div>
            
            <div className="bank-amount-divider" />

            <div className="bank-amount-input">
              <div className="bank-amount-label-row">
                <p className="bank-amount-label">Amount</p>
                <p className="bank-amount-caption">Instant transfer</p>
              </div>
              <div className="bank-amount-field-row">
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
                <div className="bank-amount-info">
                  <div className="bank-amount-info-card">
                    <p className="bank-amount-info-label">Transaction Fee</p>
                    <p className="bank-amount-info-value">Free</p>
                  </div>
                  <div className="bank-amount-info-card">
                    <p className="bank-amount-info-label">Transaction Limit</p>
                    <p className="bank-amount-info-value">₹1,00,000</p>
                  </div>
                </div>
              </div>
              <div className="bank-amount-quick">
                {quickAmounts.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className="bank-amount-chip"
                    onClick={() => setAmount(value.toString())}
                  >
                    ₹{value.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
              <p className="bank-amount-hint">This amount will be verified with face recognition.</p>
            </div>

            <div className="bank-amount-note">
              <div className="bank-amount-label-row">
                <p className="bank-amount-label">Note</p>
                <p className="bank-amount-caption">Optional</p>
              </div>
              <input
                type="text"
                placeholder="Add a short note (e.g., Rent for Feb)"
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </div>
          </section>

          <div className="bank-amount-actions">
            <button className="bank-amount-cancel" type="button" onClick={handleCancel}>
              Cancel
            </button>
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
