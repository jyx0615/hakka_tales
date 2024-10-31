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

            {/* <ProgressBar /> */}
            <div className='p-5 w-100 progressBar pb-2'>
                <progress value={pageIndex} max={totalPage} className=' w-100'/>
             </div>
        </div>

        
    );
}

export default Content;