import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Riple } from 'react-loading-indicators';

import MyButton from './MyButton';
import { DataContext } from '../hooks/DataContext';

function Book() {
  // get the book info from backend
  const { findBookById } = useContext(DataContext);

  const { index } = useParams();
  const story = findBookById(index);

  const navigate = useNavigate();

  // display the loading icon when data is not loaded
  if (!story) {
    return (
      <div className="d-flex flex-color align-items-center justify-content-center w-100 h-100">
        <Riple color="#32cd32" size="medium" text="" textColor="" />
      </div>
    );
  }

  const handleClick = () => {
    navigate(`/book/${index}/content`); // Navigate to the book page with the index
  };

  return (
    <div className="d-flex align-items-center w-100 px-2 h-100">
      {/* left side */}
      <div className="w-50 d-flex flex-column align-items-center justify-content-center border-end me-4 p-5">
        <div className="d-flex justify-content-center mb-3">
          <img
            src={story.cover_image_url}
            alt="placeholder"
            className="w-100"
          />
        </div>
        <h1>{story.title}</h1>
      </div>

      {/* right side */}
      <div className="w-50 h-100 d-flex flex-column justify-content-between py-3">
        <div>
          <h2 className="my-5">故事簡介</h2>
          {/* <h4 className="mb-4">作者: {bookInfo.author}</h4> */}
          <p className="mt-3 text-break lh-lg fs-5">{story.description}</p>
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
