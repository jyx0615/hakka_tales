import { Megaphone } from 'react-bootstrap-icons';

import './Marquee.css';

function Marquee() {
  const messages = [
    'Hey, how are you doing today?',
    "Don't forget about the meeting at 3 PM!",
    'The report you requested is ready, check it out!',
    'Can you send me the files by noon?',
    'Got the files, thanks!',
    'Hey, are we still on for the call at 2?',
    'Reminder: Team meeting at 4 PM.',
    'Please review the document and provide feedback.',
    "Lunch at 1? Let me know if you're in.",
    'Check out the latest version of the project plan.',
    'Good work on the presentation!',
    'The meeting is postponed until next week.',
    "Don't forget to send the email to the client.",
  ];

  return (
    <div className="marquee">
      <div className="megaphone-icon d-flex align-items-center px-3 h-100">
        <Megaphone className="text-danger  fs-3" />
      </div>

      <div className="marquee-content">
        {messages.map((message, index) => (
          <div key={index}>
            <div className="marquee-tag text-nowrap">
              {message}
              <span className="empty-message"></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
