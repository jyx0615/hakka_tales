import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect} from 'react';
import { gsap } from 'gsap';

import './Content.css';



function Content() {
    const { bookIndex } = useParams();
    // console.log("bookIndex = ", bookIndex, "pageNumber = ", pageNum);
    // get the page content and page image from backend
    // data = getDataFromBackend(bookIndex, pageNum);

    // mock data
    const data = {
        'content': '深山裡住著一家人，有一天，爸媽要出門辦事，只留姊弟兩人看家。因為深山裡有會吃人的妖怪，所以爸媽出門前特別交代，千萬不能讓不認識的人進門。',
        'src': 'https://tse2.mm.bing.net/th?id=OIG3.DWY08uuzblpK7F1g7W6c&pid=ImgGn',
    }
    const totalPage = 20;


    const pageWrapperRef = useRef();
    const pagesRefs = useRef([]);
    const [pageLocation, setPageLocation] = useState({});
    const [pageIndex, setPageIndex] = useState(1);
    const [zi, setZi] = useState(0);
    const [isOverviewOpen, setIsOverviewOpen] = useState(false); // Modal visibility state

    {/* Go back to the first page when the user reaches the last page. */}
    const navigateToFirstPage = () => {
        setPageIndex(1);  // Reset pageIndex to the first page
        setPageLocation({});  // Optionally reset page locations if needed
        pagesRefs.current.forEach((page, index) => {
            if (pageLocation[`page-${index}`] === 'left') {
                gsap.to(`#page-${index}`, { duration: 1.5, rotationY: 0, transformOrigin: "left top" });
            }
        });
        setZi(0); // Reset z-index for a fresh start
    };
    
    {/* goToPage allows user to drag the bar to a certain page. */}
    const goToPage = (targetPage) => {
        setPageIndex(targetPage);
        setPageLocation({});
        let newZi = 0; // Start with default z-index for consistent depth

        pagesRefs.current.forEach((page, index) => {
            gsap.set(page, { z: 0 }); // Reset z-index for each page
            if (index < targetPage - 1) {
                // Flip pages to the left for target page
                newZi += 1;
                gsap.to(page, { duration: 0.01, zIndex: newZi, z: newZi });
                gsap.to(page, { duration: 1.5, rotationY: -180, transformOrigin: "-1px top" });
                setPageLocation((prev) => ({ ...prev, [`page-${index}`]: "left" }));
            } else {
                // Reset pages to the right
                gsap.to(page, { duration: 1.5, rotationY: 0, z: 0, transformOrigin: "left top" });
                setPageLocation((prev) => ({ ...prev, [`page-${index}`]: "right" }));
            }
        });
        setZi(newZi);
    };
    
    useEffect(() => {
        gsap.set(pageWrapperRef.current, { left: "50%", perspective: 1000 });
        gsap.set(".page", { transformStyle: "preserve-3d" });
        gsap.set(".back", { rotationY: -180 });
        gsap.set([".back", ".front"], { backfaceVisibility: "hidden" });
    }, []);
    
    const handlePageClick = (pageId) => {
        const currentLocation = pageLocation[pageId] || "right";
        const newZi = zi + 1;
        
        if (currentLocation === "right") {
            gsap.to(`#${pageId}`, { duration: 0.01, z: newZi, zIndex: newZi });
            gsap.to(`#${pageId}`, { duration: 1.5, force3D: true, rotationY: -180, transformOrigin: "-1px top"});
            $(`#${pageId}`).addClass('left');
            setPageLocation((prev) => ({ ...prev, [pageId]: "left" }));
            setPageIndex((pageIndex) => pageIndex += 1);
        } else {
            gsap.to(`#${pageId}`, { duration: 0.01, z: newZi, zIndex: newZi });
             gsap.to(`#${pageId}`, { duration: 1.5, force3D: true, rotationY: 0, transformOrigin: "left top"});
            $(`#${pageId}`).addClass('right');
            setPageLocation((prev) => ({ ...prev, [pageId]: "right" }));
            setPageIndex((pageIndex) => pageIndex -= 1);
        }
        setZi(newZi);
    };

    const handleHoverEnter = (pageId, foldClass) => {
        gsap.to(`#${pageId} .${foldClass}`, { width: "50px", height: "50px", backgroundImage: "linear-gradient(45deg, #fefefe 0%,#f2f2f2 49%,#ffffff 50%,#ffffff 100%)" });
    };
    
    const handleHoverLeave = (pageId, foldClass) => {
        gsap.to(`#${pageId} .${foldClass}`, { width: "0px", height: "0px" });
    };

    {/* New function to handle image click in overview mode */}
    const handleImageClick = (index) => {
        setIsOverviewOpen(false); // Close the modal
        goToPage(index + 1); // Navigate to the selected page
    };
    
    return (
        <div className='w-100 h-100 position-relative'>
            <div className="pageWrapper py-3 px-3 w-50 h-100 position-absolute float-end py-5" ref={pageWrapperRef}>
                {[...Array(20)].map((_, index) => (
                <div
                    key={index}
                    id={`page-${index}`}
                    className="page"
                    ref={(el) => pagesRefs.current[index] = el}
                    onClick={() => handlePageClick(`page-${index}`)}
                >
                    <div
                        className="front pageFace"
                        onMouseEnter={() => handleHoverEnter(`page-${index}`, "pageFoldRight")}
                        onMouseLeave={() => handleHoverLeave(`page-${index}`, "pageFoldRight")}
                    >
                        <div className="pageFoldRight"></div>
                        
                        {/* content for the front(right) side */}
                        <div className="w-100 h-100 d-flex flex-column justify-content-center me-5 h-100">           
                            <img src={data.src} alt='illustration' className='user-select-none p-2 mh-100 mw-100'/>
                         </div>
                    </div>
                    <div
                        className="back pageFace"
                        onMouseEnter={() => handleHoverEnter(`page-${index}`, "pageFoldLeft")}
                        onMouseLeave={() => handleHoverLeave(`page-${index}`, "pageFoldLeft")}
                    >
                        <div className="pageFoldLeft"></div>
                        <p>Back {index}</p>
                        {/* content for the back(left) side */}
                        <h4 className='mb-3'>Page number = {pageIndex}</h4>
                        <p className='fs-2 lh-lg'>{data.content}</p>
                    </div>
                    </div>
                ))}
            </div>

            {/* Slider for navigating to a specific page */}
            <div className='p-5 w-100 progressBar pb-2'>
                <input
                    type="range"
                    min="1"
                    max={totalPage}
                    value={pageIndex}
                    onChange={(e) => goToPage(Number(e.target.value))}
                    className='w-100'
                />
            </div>

            {/* Story Overview Button */}
            <button onClick={() => setIsOverviewOpen(true)} className="overview-button">
                <div className="grid-icon">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </button>


            {/* Overview Modal */}
            {isOverviewOpen && (
                <div className="overview-modal">
                    <div className="modal-content">
                        <button onClick={() => setIsOverviewOpen(false)} className="close-button">X</button>
                        <div className="images-grid">
                            {[...Array(totalPage)].map((_, index) => (
                                <img
                                    key={index}
                                    src={data.src}  // Replace with actual source for each page
                                    alt={`Page ${index + 1}`}
                                    className="overview-image"
                                    onClick={() => handleImageClick(index)} // Navigate to the page on click
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Conditionally render the navigation button on the last page */}
            {pageIndex === totalPage && (
                <button onClick={navigateToFirstPage} className="navigate-button">
                    &#x21BA;
                </button>
            )}
        </div>

        
    );
}

export default Content;