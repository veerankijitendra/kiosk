import type { TokensResponseType } from '../../types';
import './Token.css';

type Token = TokensResponseType['data']['tokensById']['1'];

const STATUS_CLASS: Record<string, string> = {
  EMERGENCY: 'token--emergency',
  CALLED: 'token--current',
  WAITING: 'token--next',
  COMPLETED: 'token--completed',
};

export default function TokenQueue({ queueProgress }: { queueProgress: Token[] }) {
  const tokens = queueProgress.slice(0, 5);

  return (
    <div className='queue'>
      {tokens.map((item, index) => (
        <div
          key={index}
          className={`token ${STATUS_CLASS[item.status]} ${
            item.status === 'CURRENT'
              ? 'is-current'
              : item.status === 'EMERGENCY'
                ? 'is-emergency'
                : item.status === 'COMPLETED'
                  ? 'is-completed'
                  : ''
          }`}
        >
          <div className='token__label'>{item.status}</div>

          <div className='token__number'>{item.tokenNumber}</div>

          {/* {item.status === 'NEXT' && item.est && <div className='token__meta'>Est: {item.est}</div>} */}
        </div>
      ))}
    </div>
  );
}
