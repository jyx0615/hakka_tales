import { useParams } from 'react-router-dom';
import { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import {
  ArrowClockwise,
  Grid3x3GapFill,
  PlayFill,
  PauseFill,
} from 'react-bootstrap-icons';
import { Riple } from 'react-loading-indicators';
import { useMediaQuery } from 'react-responsive';

import useStories from '../hooks/useStories';
import MyButton from './MyButton';
import './Content.css';

function Content() {
  const { currentStory, fetchCurrentStory } = useStories();
  const [loading, setLoading] = useState(true);
  const { bookIndex, category } = useParams();

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
  const [isPlaying, setIsPlaying] = useState(false); // Playback state

  const leftZi = useRef(0);
  const rightZi = useRef(0);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const pagesRefsMobile = useRef([]);
  const mobileContainerRef = useRef();

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
    // prevent flipping for the last page
    if (pageId === 'page-' + totalPage) return;
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
    // close the modal
    $('#overviewModal').modal('toggle');
    goToPage(index); // Navigate to the selected page
  };

  const goToPage = (targetPage) => {
    if (targetPage === pageIndex) return;

    if (isMobile) {
      setPageIndex(targetPage);
      if (mobileContainerRef.current && pagesRefsMobile.current[targetPage]) {
        pagesRefsMobile.current[targetPage].scrollIntoView({
          behavior: 'smooth',
        });
      }
    } else {
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
    }
  };

  const handleAudioEnd = () => {
    // Automatically flip to the next page when audio finishes
    if (pageIndex <= totalPage) {
      if (isMobile) {
        setPageIndex(pageIndex + 1);
        if (
          mobileContainerRef.current &&
          pagesRefsMobile.current[pageIndex + 1]
        ) {
          pagesRefsMobile.current[pageIndex + 1].scrollIntoView({
            behavior: 'smooth',
          });
        }
      } else {
        flippingFromRightToLeft(`page-${pageIndex}`);
      }
    }
    if (pageIndex === totalPage) {
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    const audioSrc = getAudioOfPage(pageIndex);
    if (!audioSrc) {
      // If there's no audio for the current page, turn the page automatically
      if (pageIndex < totalPage) {
        if (isMobile) {
          setPageIndex(pageIndex + 1);
          if (
            mobileContainerRef.current &&
            pagesRefsMobile.current[pageIndex + 1]
          ) {
            pagesRefsMobile.current[pageIndex + 1].scrollIntoView({
              behavior: 'smooth',
            });
          }
          // Start audio playback after scrolling
          setTimeout(() => {
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.load();
              audioRef.current.play();
              setIsPlaying(true);
            }
          }, 500);
        } else {
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
        if (isMobile) {
          // Mobile layout
          audioRef.current.play();
        } else {
          // Desktop layout
          setTimeout(() => {
            audioRef.current.play();
          }, 1500);
        }
      }
    }
  }, [pageIndex, isPlaying, isMobile]);

  // IntersectionObserver to update pageIndex on scroll
  useEffect(() => {
    if (pagesRefsMobile.current.length > 0) {
      const options = {
        root: mobileContainerRef.current,
        rootMargin: '0px',
        threshold: 0.5,
      };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = pagesRefsMobile.current.indexOf(entry.target);
            setPageIndex(index);
          }
        });
      }, options);

      pagesRefsMobile.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });

      return () => {
        if (observer && pagesRefsMobile.current) {
          pagesRefsMobile.current.forEach((ref) => {
            if (ref) observer.unobserve(ref);
          });
        }
      };
    }
  }, [pagesRefsMobile.current, mobileContainerRef.current]);

  const pages = currentStory.pages;
  const totalPage = pages?.length;
  // initialize the pageWrapperRef and set the initial state
  const setPageWrapperRef = useCallback(
    (node) => {
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
    },
    [pages, totalPage]
  );

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
      return currentStory.cover_image;
    } else {
      return pages[pageNum - 1].image;
    }
  };

  const getAudioOfPage = (pageNum) => {
    if (pageNum === 0 || pageNum == totalPage + 1) return null; // No audio for the book cover
    // iterate through the audios array to find the audio_url that has is the same as the category
    for (let i = 0; i < pages[pageNum - 1]?.audios.length; i++) {
      if (pages[pageNum - 1]?.audios[i].dialect === category) {
        return pages[pageNum - 1]?.audios[i].audio_url;
      }
    }
    // return null if the audio is not found
    return null;
  };

  return (
    <>
      <div className="w-100 h-100 d-flex p-3 flex-column align-items-center jusitify-content-center position-relative blue-text">
        {/* Audio Player */}
        {getAudioOfPage(pageIndex) && (
          <audio
            ref={audioRef}
            src={getAudioOfPage(pageIndex)}
            onEnded={handleAudioEnd}
          />
        )}

        {/* BookWrapper */}
        {/* page view for screen size larger than md */}
        <div className="w-100 h-100 position-relative mt-5 mb-3 d-none d-md-block">
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
                      className="user-select-none p-2 mh-100 mw-100 rounded-5"
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
                  <div className="content-back content-face">
                    <div className="pageFoldLeft"></div>
                    <div className="content-container">
                      {/* content for the back(left) side */}
                      <p className="fs-3 lh-lg text-start">
                        {pages[pageNum]?.content_hakka}
                      </p>
                      {/* page number */}
                      {pageNum === totalPage - 1 ? (
                        <span className="finish-text">完</span>
                      ) : (
                        <span className="page-number">{pageNum + 1}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* page view for screen size smaller than md */}
        <div
          className="d-block d-md-none w-100 h-100 overflow-auto p-3"
          ref={mobileContainerRef}
        >
          {/* the cover page */}
          <div
            className="w-100 d-flex flex-column align-items-center justify-content-center p-3"
            ref={(el) => (pagesRefsMobile.current[0] = el)}
          >
            <img
              src={getImageOfPage(0)}
              alt="illustration"
              className="user-select-none py-2 mh-100 mw-100 rounded-4"
            />
          </div>

          {pages.map((page, pageNum) => (
            <div
              key={pageNum + 1}
              className="w-100 d-flex flex-column align-items-center justify-content-center p-3"
              ref={(el) => (pagesRefsMobile.current[pageNum + 1] = el)}
            >
              <p className="fs-3 lh-lg bg-white rounded-3 p-2">
                {pages[pageNum].content_hakka}
              </p>
              <img
                src={getImageOfPage(pageNum + 1)}
                alt="illustration"
                className="user-select-none py-2 mh-100 mw-100 rounded-4"
              />
            </div>
          ))}
          <div className="d-flex justify-content-center">
            <span className="finish-text-sm">完</span>
          </div>

          <div className="w-100 d-flex justify-content-end">
            {/* Go to Quiz button */}
            <div className="me-3">
              <MyButton
                text="前往測驗"
                category="quiz"
                target_page={`/quiz/${bookIndex}`}
              />
            </div>

            {/* Refresh button */}
            <button
              onClick={() => goToPage(0)}
              className={`btn btn-primary-outline`}
            >
              <ArrowClockwise color="black" className="fs-3 bolder fw-bolder" />
            </button>
          </div>
        </div>

        {/* Buttons for last page */}
        <div
          className={`w-100 d-none d-md-block d-flex justify-content-end p-2 ${pageIndex === totalPage ? '' : 'invisible'}`}
        >
          {/* Go to Quiz button */}
          <div className="me-3">
            <MyButton
              text="前往測驗"
              category="quiz"
              target_page={`/quiz/${bookIndex}`}
            />
          </div>

          {/* Refresh button */}
          <button
            onClick={() => goToPage(0)}
            className={`btn btn-primary-outline`}
          >
            <ArrowClockwise color="black" className="fs-3 bolder fw-bolder" />
          </button>
        </div>

        {/* control bar */}
        <div className="row w-100">
          {/* pause/stop button */}
          <div className="p-2 col-md-1 col-2 d-flex">
            <button
              onClick={togglePlay}
              className="btn btn-primary btn-lg rounded-circle d-flex align-items-center justify-content-center p-2"
            >
              {isPlaying ? (
                <PauseFill color="white" className="fs-3" />
              ) : (
                <PlayFill color="white" className="fs-3" />
              )}
            </button>
          </div>

          {/* progress bar */}
          <div className="p-2 col-md-10 col-8 d-flex align-items-center">
            <input
              type="range"
              min="0"
              max={totalPage}
              value={pageIndex}
              onChange={(e) => goToPage(Number(e.target.value))}
              className="w-100"
            />
          </div>

          {/* overview button */}
          <div className="p-2 col-md-1 col-2 d-flex justify-content-end">
            <button
              className="btn btn-primary-outline"
              data-bs-toggle="modal"
              data-bs-target="#overviewModal"
            >
              <Grid3x3GapFill color="black" className="fs-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Overview Modal */}
      <div
        className="modal fade"
        id="overviewModal"
        tabIndex="-1"
        aria-labelledby="overviewModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="overviewModalLabel">
                分頁總覽
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
        </div>
      </div>
    </>
  );
}

export default Content;
