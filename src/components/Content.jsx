import { useParams } from 'react-router-dom';
import { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import {
  ArrowClockwise,
  Grid3x3GapFill,
  X,
  PlayFill,
  PauseFill,
} from 'react-bootstrap-icons';
import { Riple } from 'react-loading-indicators';
import Modal from 'react-bootstrap/Modal';

import useStories from '../hooks/useStories';

// import OverView from './Overview';
import './Content.css';

function Content() {
  const { currentStory, fetchCurrentStory } = useStories();
  const [loading, setLoading] = useState(true);
  const { bookIndex } = useParams();

  useEffect(() => {
    const getStory = async () => {
      setLoading(true);
      await fetchCurrentStory(bookIndex);
      setLoading(false);
    };
    getStory();
  }, [bookIndex, fetchCurrentStory]);

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

  // Handle page navigation on click
  const handlePageClick = (pageId) => {
    const currentLocation = pageLocation[pageId] || 'right';
    if (currentLocation === 'right') {
      flippingFromRightToLeft(pageId);
    } else {
      flippingFromLeftToRight(pageId);
    }
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

  const handleImageClick = (index) => {
    setIsOverviewOpen(false); // Close the modal
    goToPage(index); // Navigate to the selected page
  };

  const goToPage = (targetPage) => {
    if (targetPage === pageIndex) return;

    // continues turn from left to right
    if (targetPage < pageIndex) {
      for (let i = pageIndex - 1; i >= targetPage; i--) {
        // flip all pages at once
        flippingFromLeftToRight(`page-${i}`);
        // flip one page at a time
        // setTimeout(() => {
        //     flippingFromLeftToRight(`page-${i}`);
        // }, (pageIndex - i - 1) * flippingDelay);
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

  const handleAudioEnd = () => {
    // Automatically flip to the next page when audio finishes
    if (pageIndex <= totalPage) {
      flippingFromRightToLeft(`page-${pageIndex}`);
    }
    if(pageIndex === totalPage){
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    const audioSrc = getAudioOfPage(pageIndex);
    if (!audioSrc) {
      // If there's no audio for the current page, turn the page automatically
      if (pageIndex < totalPage) {
        flippingFromRightToLeft(`page-${pageIndex}`);

        // Ensure the audio for the next page starts playing
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.pause(); // Stop any previous audio
            audioRef.current.load(); // Reload the audio for the new page
            audioRef.current.play(); // Play the new audio
            setIsPlaying(true); // Update the play state
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

  // Handle audio playback when pageIndex changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the current audio
      audioRef.current.load(); // Reload the audio for the new page
      if (isPlaying) {
        // Match the page flip animation duration
        // Play the new audio if the play state is active
        setTimeout(() => {
          audioRef.current.play();
        }, 1500);
      }
    }
  }, [pageIndex]);

  const pages = currentStory.pages;
  const totalPage = pages?.length;
  // initialize the pageWrapperRef and set the initial state
  const setPageWrapperRef = useCallback((node) => {
    if (node !== null) {
      pageWrapperRef.current = node;
      if (pages) {
        setPageIndex(0);
        leftZi.current = totalPage - 1;
        gsap.set(pageWrapperRef.current, { left: '50%', perspective: 1000 });
        gsap.set('.page', { transformStyle: 'preserve-3d' });
        gsap.set('.back', { rotationY: -180 });
        gsap.set(['.back', '.front'], { backfaceVisibility: 'hidden' });
      }
    }
  }, [pages, totalPage]);

  // display the loading indicator if the pages are not fetched
  if (loading) {
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

  // an array start fomr [totalPage, totalPage - 1, ... , 1, 0]
  const reversePageNum = Array.from(
    { length: totalPage + 1 },
    (_, index) => totalPage - index
  );

  // if the page index is 0, show the book cover, else return(pageNum-1).image_url
  const getImageOfPage = (pageNum) => {
    if (pageNum === 0) {
      return currentStory.cover_image_url;
    } else {
      return pages[pageNum - 1].narration_url;
    }
  };

  const getAudioOfPage = (pageNum) => {
    if (pageNum === 0 || pageNum == totalPage + 1) return null; // No audio for the book cover
    // return currentBook[pageNum - 1]?.audio_url || null; // Return audio URL or null
    // Example URL with raw=1 to allow direct playback
    return pages[pageNum - 1].audios[0].audio_url;
  };

  const handleClose = () => {
    setIsOverviewOpen(false);
  }

  return (
    <>
        <div className="w-100 h-100 d-flex flex-column align-items-center jusitify-content-center position-relative">
        {/* Audio Player */}
        {getAudioOfPage(pageIndex) && (
          <audio
            ref={audioRef}
            src={getAudioOfPage(pageIndex)}
            onEnded={handleAudioEnd}
          />
        )}

        {/* BookWrapper */}
        <div className="w-100 h-100 position-relative my-5" >
          <div
            className="pageWrapper p-1 w-50 h-100 position-absolute float-end"
            ref={setPageWrapperRef}
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
                {/* front page(right) */}
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

                {/* back page(left) */}
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
                    <p className="fs-3 lh-lg">{pages[pageNum].content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Refresh button */}
        <div className="w-100 d-flex justify-content-end p-2">
          {/* Conditionally render the navigation button on the last page */}
          {pageIndex === totalPage + 1 && (
            <button
              onClick={() => goToPage(0)}
              className="btn btn-primary-outline"
            >
              <ArrowClockwise color="black" className="fs-3 bolder fw-bolder" />
            </button>
          )}
        </div>

        {/* control bar */}
        <div className="row w-100 pb-2">
          {/* pause/stop button */}
          <div className="p-2 col-1 d-flex">
            <button
              onClick={togglePlay}
              className="btn btn-primary btn-lg rounded-circle d-flex align-items-center justify-content-center p-2"
            >
              {isPlaying ? (
                <PauseFill color="white" className='fs-3' />
              ) : (
                <PlayFill color="white" className='fs-3' />
              )}
            </button>
          </div>

          {/* progress bar */}
          <div className="p-2 col-10 d-flex align-items-center">
            <input
              type="range"
              min="0"
              max={totalPage + 1}
              value={pageIndex}
              onChange={(e) => goToPage(Number(e.target.value))}
              className="w-100"
            />
          </div>

          {/* overview button */}
          <div className="p-2 col-1 d-flex justify-content-end">
            <button
              className="btn btn-primary-outline"
              onClick={() => setIsOverviewOpen(true)}
            >
              <Grid3x3GapFill color="black" className="fs-3" />
            </button>
          </div>
        </div>

        {/* Overview Modal */}
        {/* {isOverviewOpen && (
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
        )} */}
      </div>

      <Modal show={isOverviewOpen} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>分頁總覽</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
      </Modal>
    </>
    
  );
}

export default Content;
