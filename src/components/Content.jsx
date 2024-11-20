import { useParams } from 'react-router-dom';
import { useRef, useState, useEffect, useContext } from 'react';
import { gsap } from 'gsap';
import { ArrowClockwise, Grid3x3GapFill, X, PlayFill, PauseFill } from 'react-bootstrap-icons';
import { Riple } from 'react-loading-indicators';

import { DataContext } from '../hooks/DataContext';

// import OverView from './Overview';
import './Content.css';

function Content() {
  const { fetchPagesById, pages, findBookById } = useContext(DataContext);
  const { bookIndex } = useParams();

  // get the page content and page image from backend
  const story = findBookById(bookIndex);

  if (!pages[bookIndex]) {
    fetchPagesById(bookIndex);
  }

  const pageWrapperRef = useRef();
  const pagesRefs = useRef([]);
  const audioRef = useRef(null); // Initialize audio reference
  const [pageLocation, setPageLocation] = useState({});
  const [pageIndex, setPageIndex] = useState(0);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false); // Modal visibility state
  const [isPlaying, setIsPlaying] = useState(false); // Playback state

  const leftZi = useRef(0);
  const rightZi = useRef(0);

  const flippingFromRightToLeft = (pageId, duration = 1.5) => {
    const newZi = Math.max(leftZi.current, rightZi.current) + 1;
    $(`#${pageId}`).css('z-index', newZi);
    leftZi.current = newZi;
    gsap.to(`#${pageId}`, {
      duration: duration,
      force3D: true,
      rotationY: -180,
      transformOrigin: '-1px top',
    });
    $(`#${pageId}`).addClass('left');
    setPageLocation((prev) => ({ ...prev, [pageId]: 'left' }));
    setPageIndex((pageIndex) => (pageIndex += 1));
  };

  const flippingFromLeftToRight = (pageId, duration = 1.5) => {
    const newZi = Math.max(leftZi.current, rightZi.current) + 1;
    $(`#${pageId}`).css('z-index', newZi);
    rightZi.current = newZi;
    gsap.to(`#${pageId}`, {
      duration: duration,
      force3D: true,
      rotationY: 0,
      transformOrigin: 'left top',
      // Change the z-index after the animation
      onComplete: () => {
        $(`#${pageId}`).css('z-index', newZi);
      },
    });
    $(`#${pageId}`).addClass('right');
    setPageLocation((prev) => ({ ...prev, [pageId]: 'right' }));
    setPageIndex((pageIndex) => (pageIndex -= 1));
  };

  const handlePageClick = (pageId) => {
    const currentLocation = pageLocation[pageId] || 'right';
    if (currentLocation === 'right') {
      flippingFromRightToLeft(pageId);
    } else {
      flippingFromLeftToRight(pageId);
    }
  };

  const handleAudioEnd = () => {
    // Automatically flip to the next page when audio finishes
    if (pageIndex < currentBook.length) {
      flippingFromRightToLeft(`page-${pageIndex}`);
    }
  };

  const togglePlay = () => {

    const audioSrc = getAudioOfPage(pageIndex);

    if (!audioSrc) {
      // If there's no audio for the current page, turn the page automatically
      if (pageIndex < currentBook.length) {
        flippingFromRightToLeft(`page-${pageIndex}`);
        
        // Ensure the audio for the next page starts playing
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.pause();  // Stop any previous audio
            audioRef.current.load();   // Reload the audio for the new page
            audioRef.current.play();   // Play the new audio
            setIsPlaying(true);        // Update the play state
          }
        }, 1500); // Match the page flip animation duration
      }
      return; // Exit the function
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleHoverEnter = (pageId, foldClass) => {
    gsap.to(`#${pageId} .${foldClass}`, {
      width: '50px',
      height: '50px',
      backgroundImage:
        'linear-gradient(45deg, #fefefe 0%,#f2f2f2 49%,#ffffff 50%,#ffffff 100%)',
    });
  };

  const handleHoverLeave = (pageId, foldClass) => {
    gsap.to(`#${pageId} .${foldClass}`, { width: '0px', height: '0px' });
  };

  {
    /* New function to handle image click in overview mode */
  }
  const handleImageClick = (index) => {
    setIsOverviewOpen(false); // Close the modal
    goToPage(index); // Navigate to the selected page
  };

  {
    /* goToPage allows user to drag the bar to a certain page. */
  }
  const goToPage = (targetPage) => {
    if (targetPage === pageIndex) return;

    const flippingDelay = 500; // ms
    // continues turn from left to right
    if (targetPage < pageIndex) {
      for (let i = pageIndex - 1; i >= targetPage; i--) {
        setTimeout(
          () => {
            flippingFromLeftToRight(`page-${i}`);
          },
          (pageIndex - i - 1) * flippingDelay
        );
      }
    }
    // continues turn from right to left
    else {
      for (let i = pageIndex + 1; i <= targetPage; i++) {
        flippingFromRightToLeft(`page-${i - 1}`);
        // setTimeout(() => {
        //     flippingFromRightToLeft(`page-${i - 1}`);
        // }, (i - (pageIndex + 1)) * flippingDelay);
      }
    }
  };

  useEffect(() => {
    if (pages[bookIndex]) {
      leftZi.current = pages[bookIndex].length - 1;
      gsap.set(pageWrapperRef.current, { left: '50%', perspective: 1000 });
      gsap.set('.page', { transformStyle: 'preserve-3d' });
      gsap.set('.back', { rotationY: -180 });
      gsap.set(['.back', '.front'], { backfaceVisibility: 'hidden' });
    }
  
    // Handle audio playback when pageIndex changes
    if (audioRef.current) {
      audioRef.current.pause();  // Pause the current audio
      audioRef.current.load();   // Reload the audio for the new page
      if (isPlaying) {
        audioRef.current.play(); // Play the new audio if the play state is active
      }
    }
  }, [pages, bookIndex, pageIndex, isPlaying]);
  
  if (!pages[bookIndex] || !story) {
    fetchPagesById(bookIndex);
    return (
      <div className="d-flex flex-color align-items-center justify-content-center w-100 h-100">
        <Riple
          color="#32cd32"
          size="medium"
          text="Loading..."
          textColor="#32cd32"
        />
      </div>
    );
  }

  const currentBook = pages[bookIndex];
  const bookCoverUrl = findBookById(bookIndex).cover_image_url;
  const totalPage = currentBook.length;
  // an array start fomr [totalPage, totalPage - 1, ... , 1, 0]
  const reversePageNum = Array.from(
    { length: totalPage + 1 },
    (_, index) => totalPage - index
  );

  // if the page index is 0, show the book cover, else return(pageNum-1).image_url
  const getImageOfPage = (pageNum) => {
    if (pageNum === 0) {
      return bookCoverUrl;
    } else {
      return currentBook[pageNum - 1].narration_url;
    }
  };

  const getAudioOfPage = (pageNum) => {
    if (pageNum === 0) return null; // No audio for the book cover
    // return currentBook[pageNum - 1]?.audio_url || null; // Return audio URL or null
    // Example URL with raw=1 to allow direct playback
    return 'https://www.dropbox.com/scl/fi/0o3lj1ezkbjgc933ckoct/.mp3?rlkey=ajlqt3ecq8agm86itjj889oi5&st=5jgq794z&raw=1';
  };  
  

  return (
    <div className="w-100 h-100 d-flex flex-column align-items-center jusitify-content-center position-relative">

      {/* Audio Player */}
      {getAudioOfPage(pageIndex) && (
        <audio ref={audioRef} src={getAudioOfPage(pageIndex)} onEnded={handleAudioEnd} />
      )}

      {/* BookWrapper */}
      <div className="w-100 h-100 position-relative my-5">
        <div
          className="pageWrapper p-1 w-50 h-100 position-absolute float-end"
          ref={pageWrapperRef}
        >
          {[...reversePageNum].map((pageNum, index) => (
            <div
              key={pageNum}
              id={`page-${pageNum}`}
              className="page position-absolute w-100 h-100"
              ref={(el) => (pagesRefs.current[pageNum] = el)}
              onClick={() => handlePageClick(`page-${pageNum}`)}
              style={{ zIndex: index }}
            >
              {/* front page */}
              <div
                className="front pageFace"
                onMouseEnter={() =>
                  handleHoverEnter(`page-${pageNum}`, 'pageFoldRight')
                }
                onMouseLeave={() =>
                  handleHoverLeave(`page-${pageNum}`, 'pageFoldRight')
                }
              >
                <div className="pageFoldRight"></div>

                {/* content for the front(right) side */}
                <div className="w-100 h-100 d-flex flex-column justify-content-center me-5 h-100">
                  <img
                    src={getImageOfPage(pageNum)}
                    alt="illustration"
                    className="user-select-none p-2 mh-100 mw-100"
                  />
                </div>
              </div>

              {/* back page */}
              <div
                className="back pageFace"
                onMouseEnter={() =>
                  handleHoverEnter(`page-${pageNum}`, 'pageFoldLeft')
                }
                onMouseLeave={() =>
                  handleHoverLeave(`page-${pageNum}`, 'pageFoldLeft')
                }
              >
                <div className="pageFoldLeft"></div>
                {/* content for the back(left) side */}
                <h4 className="mb-3">Page number = {pageNum}</h4>
                {pageNum === totalPage ? (
                  <p></p>
                ) : (
                  <p className="fs-2 lh-lg">{currentBook[pageNum].content}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* control bar */}
      <div className="row w-100 pb-2">
        {/* progress bar */}
        <div className="p-2 col-11 d-flex align-items-center">
          <input
            type="range"
            min="0"
            max={totalPage + 1}
            value={pageIndex}
            onChange={(e) => goToPage(Number(e.target.value))}
            className="w-100"
          />
        </div>
      </div>

      {/* control tools */}
      <div className="d-flex position-absolute bottom-0 end-100 p-0">
        <button onClick={togglePlay} className="btn btn-primary btn-lg rounded-circle">
          {isPlaying ? (
            <PauseFill color="white" />
          ) : (
            <PlayFill color="white" />
          )}
        </button>
      </div>
      
      <div className="d-flex flex-column position-absolute end-0 bottom-0 p-2">


        {/* Conditionally render the navigation button on the last page */}
        {pageIndex === totalPage + 1 && (
          <button
            onClick={() => goToPage(0)}
            className="btn btn-primary-outline"
          >
            <ArrowClockwise color="black" className="fs-3 bolder fw-bolder" />
          </button>
        )}

        {/* overview button */}
        <button
          className="btn btn-primary-outline"
          onClick={() => setIsOverviewOpen(true)}
        >
          <Grid3x3GapFill color="black" className="fs-3" />
        </button>
      </div>

      {/* Overview Modal */}
      {isOverviewOpen && (
        <div className="overview-modal">
          <div className="modal-content">
            <button
              onClick={() => setIsOverviewOpen(false)}
              className="btn btn-primary-outline position-absolute top-0 end-0 rounded-circle"
            >
              <X color="gray" className="fs-1 closs-icon" />
            </button>
            <div className="images-grid pt-4">
              {[...reversePageNum].map((_, index) => (
                <img
                  key={index}
                  src={getImageOfPage(index)} // Replace with actual source for each page
                  alt={`Page ${index}`}
                  className="overview-image"
                  onClick={() => handleImageClick(index)} // Navigate to the page on click
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Content;
