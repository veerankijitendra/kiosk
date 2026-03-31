import './IdleModal.css';

type Props = {
  seconds: number;
  onStay: () => void;
};

export default function IdleModal({ seconds, onStay }: Props) {
  return (
    <div className='idle-modal'>
      <div className='idle-modal__content'>
        <h2>Session Timeout</h2>

        <p>
          Returning to home in <strong>{seconds}</strong> seconds
        </p>

        <button onClick={onStay}>Continue Session</button>
      </div>
    </div>
  );
}
