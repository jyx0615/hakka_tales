import { Megaphone } from 'react-bootstrap-icons';
import { useEffect } from 'react';

import './Marquee.css';
import useStories from '../hooks/useStories';

function Marquee() {
  const { activities, fetchActivities } = useStories();

  // const messages = [
  //   '第三期 新星專區 <桃園你和我>',
  //   '第二期 新星專區 <我的台灣記憶>',
  //   '第一期 封面故事投稿獲獎名單',
  // ];

  useEffect(() => {
    fetchActivities();
  }, []);

  if (!activities || activities.length < 1) return null;
  const messages = activities.map((activity) => activity.title);

  return (
    <div className="marquee rounded-3">
      <div className="megaphone-icon d-flex align-items-center px-3 h-100">
        <Megaphone className="fs-3" id="phone-icon" />
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
