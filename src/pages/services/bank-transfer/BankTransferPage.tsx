import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import './BankTransferPage.css';

type TransferStep = 'details' | 'verify';

const BankTransferPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<TransferStep>('details');
  const [senderAccount, setSenderAccount] = useState('');
  const [senderIfsc, setSenderIfsc] = useState('');
  const [receiverAccount, setReceiverAccount] = useState('');
  const [receiverIfsc, setReceiverIfsc] = useState('');
  const [senderAccountConfirm, setSenderAccountConfirm] = useState('');
  const [senderName, setSenderName] = useState('');
  const [receiverAccountConfirm, setReceiverAccountConfirm] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const isInitialComplete = useMemo(() => {
    return (
      senderAccount.trim().length > 0 &&
      senderIfsc.trim().length > 0 &&
      receiverAccount.trim().length > 0 &&
      receiverIfsc.trim().length > 0
    );
  }, [receiverAccount, receiverIfsc, senderAccount, senderIfsc]);

  const isSenderMatch = useMemo(() => {
    return senderAccount.trim() === senderAccountConfirm.trim();
  }, [senderAccount, senderAccountConfirm]);

  const isReceiverMatch = useMemo(() => {
    return receiverAccount.trim() === receiverAccountConfirm.trim();
  }, [receiverAccount, receiverAccountConfirm]);

  const isExtraComplete = useMemo(() => {
    return (
      senderAccountConfirm.trim().length > 0 &&
      senderName.trim().length > 0 &&
      receiverAccountConfirm.trim().length > 0 &&
      receiverName.trim().length > 0
    );
  }, [receiverAccountConfirm, receiverName, senderAccountConfirm, senderName]);

  const canContinue = isInitialComplete;
  const canConfirm = isExtraComplete && isSenderMatch && isReceiverMatch;
  const showExtraFields = step !== 'details';
  const inputsDisabled = false;

  const resetVerification = () => {
    setStep('details');
    setSenderAccountConfirm('');
    setSenderName('');
    setReceiverAccountConfirm('');
    setReceiverName('');
  };

  const handlePrimaryAction = () => {
    if (step === 'details' && canContinue) {
      setStep('verify');
      return;
    }
    if (step === 'verify' && canConfirm) {
      navigate('/services/bank-transfer/amount', {
        state: {
          sender: {
            account: senderAccount.trim(),
            ifsc: senderIfsc.trim(),
            name: senderName.trim(),
          },
          receiver: {
            account: receiverAccount.trim(),
            ifsc: receiverIfsc.trim(),
            name: receiverName.trim(),
          },
        },
      });
    }
  };

  const actionLabel = step === 'details' ? 'Continue' : 'Confirm';
  const actionDisabled = step === 'details' ? !canContinue : !canConfirm;

  const showSenderMismatch =
    showExtraFields &&
    senderAccountConfirm.trim().length > 0 &&
    senderAccount.trim().length > 0 &&
    !isSenderMatch;

  const showReceiverMismatch =
    showExtraFields &&
    receiverAccountConfirm.trim().length > 0 &&
    receiverAccount.trim().length > 0 &&
    !isReceiverMatch;

  return (
    <div className="bank-transfer-page">
      <Sidebar />
      <div className="bank-transfer-main">
        <div className="bank-transfer-content">
          <header className="bank-transfer-hero">
            <div>
              <p className="bank-transfer-eyebrow">Services</p>
              <h1 className="bank-transfer-title">Bank Transfer</h1>
              <p className="bank-transfer-subtitle">
                Enter the sender and receiver banking information to continue the secure transfer flow.
              </p>
            </div>
            <button className="bank-transfer-back" type="button" onClick={() => navigate('/services')}>
              Back to Services
            </button>
          </header>

          <section className="bank-transfer-form">
            <div className="bank-transfer-grid">
              <div className="bank-details-card">
                <div className="bank-details-header">Sender&apos;s Bank Details</div>
                <label className="bank-field">
                  <span>Bank Account Number</span>
                  <input
                    type="text"
                    placeholder="Enter sender account number"
                    value={senderAccount}
                    onChange={(event) => {
                      setSenderAccount(event.target.value);
                      if (step === 'verify') {
                        resetVerification();
                      }
                    }}
                    disabled={inputsDisabled}
                  />
                </label>
                <label className="bank-field">
                  <span>IFSC Code</span>
                  <input
                    type="text"
                    placeholder="Enter sender IFSC code"
                    value={senderIfsc}
                    onChange={(event) => {
                      setSenderIfsc(event.target.value);
                      if (step === 'verify') {
                        resetVerification();
                      }
                    }}
                    disabled={inputsDisabled}
                  />
                </label>
              </div>

              <div className="bank-details-card">
                <div className="bank-details-header">Receiver&apos;s Bank Details</div>
                <label className="bank-field">
                  <span>Bank Account Number</span>
                  <input
                    type="text"
                    placeholder="Enter receiver account number"
                    value={receiverAccount}
                    onChange={(event) => {
                      setReceiverAccount(event.target.value);
                      if (step === 'verify') {
                        resetVerification();
                      }
                    }}
                    disabled={inputsDisabled}
                  />
                </label>
                <label className="bank-field">
                  <span>IFSC Code</span>
                  <input
                    type="text"
                    placeholder="Enter receiver IFSC code"
                    value={receiverIfsc}
                    onChange={(event) => {
                      setReceiverIfsc(event.target.value);
                      if (step === 'verify') {
                        resetVerification();
                      }
                    }}
                    disabled={inputsDisabled}
                  />
                </label>
              </div>
            </div>

            <div className={`bank-transfer-extra ${showExtraFields ? 'is-visible' : ''}`}>
              <div className="bank-transfer-grid">
                <div className="bank-details-card">
                  <div className="bank-details-header">Sender Verification</div>
                  <label className="bank-field">
                    <span>Re-enter Bank Account Number</span>
                    <input
                      type="text"
                      placeholder="Re-enter sender account number"
                      value={senderAccountConfirm}
                      onChange={(event) => setSenderAccountConfirm(event.target.value)}
                      disabled={inputsDisabled}
                    />
                  </label>
                  {showSenderMismatch && (
                    <p className="bank-field-error">Account numbers do not match.</p>
                  )}
                  <label className="bank-field">
                    <span>Sender&apos;s Name</span>
                    <input
                      type="text"
                      placeholder="Enter sender name"
                      value={senderName}
                      onChange={(event) => setSenderName(event.target.value)}
                      disabled={inputsDisabled}
                    />
                  </label>
                </div>

                <div className="bank-details-card">
                  <div className="bank-details-header">Receiver Verification</div>
                  <label className="bank-field">
                    <span>Re-enter Bank Account Number</span>
                    <input
                      type="text"
                      placeholder="Re-enter receiver account number"
                      value={receiverAccountConfirm}
                      onChange={(event) => setReceiverAccountConfirm(event.target.value)}
                      disabled={inputsDisabled}
                    />
                  </label>
                  {showReceiverMismatch && (
                    <p className="bank-field-error">Account numbers do not match.</p>
                  )}
                  <label className="bank-field">
                    <span>Receiver&apos;s Name</span>
                    <input
                      type="text"
                      placeholder="Enter receiver name"
                      value={receiverName}
                      onChange={(event) => setReceiverName(event.target.value)}
                      disabled={inputsDisabled}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="bank-transfer-actions">
              <div>
                <p className="bank-transfer-helper">
                  {step === 'details'
                    ? 'Complete sender and receiver details to continue.'
                    : 'Re-enter account numbers and names for confirmation.'}
                </p>
              </div>
              <button
                className="bank-transfer-action"
                type="button"
                onClick={handlePrimaryAction}
                disabled={actionDisabled}
              >
                {actionLabel}
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default BankTransferPage;
