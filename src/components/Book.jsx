import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import MyButton from './MyButton';

function Book() {
  // get the book info from backend
  // bookInfo = getBookInfo(index);
  const { index } = useParams();
  console.log(index);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${index}/content`); // Navigate to the book page with the index
  };

  const bookInfo = {
    title: '虎姑婆',
    author: '王文華',
    content:
      '是早期流傳在臺灣等地的民間故事，在臺灣和白賊七、李田螺、賣香屁、好鼻師及水鬼城隍等一樣，家喻戶曉。[1]故事敘述山上的老虎精化身為老太婆，在夜裡拐騙小孩並吞食裹腹，常被用來哄騙小孩趕快入睡目前所知最早有紀錄的同類故事，是清代黃之雋所著〈虎媼傳〉[3] ，講述安徽一帶老母虎扮成外婆害人的故事。這類故事傳至台灣後，版本曾多達百餘種，但內容大同小異[4]，最為人知悉的版本是由臺灣作家王詩琅所編撰[5]，故事背景為臺灣客家聚落',
  };

  return (
    <div className="d-flex align-items-center w-100 px-2 h-100">
      {/* left side */}
      <div className="w-50 d-flex align-items-center justify-content-center border-end me-4">
        <h1>{bookInfo.title}</h1>
      </div>

      {/* right side */}
      <div className="w-50 h-100 d-flex flex-column justify-content-between py-3">
        <div>
          <h2 className="my-5">故事簡介</h2>
          <h4 className="mb-4">作者: {bookInfo.author}</h4>
          <p className="mt-3 text-break lh-lg fs-5">{bookInfo.content}</p>
        </div>

        <div className="d-flex align-items-center justify-content-end gap-4 mb-3">
          <MyButton text="四縣腔" handleClick={handleClick} />
          <MyButton text="海陸腔" handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
}

export default Book;
