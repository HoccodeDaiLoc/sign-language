// Pagination.jsx
import Image from "../../components/common/Image";
import leftArrow from "../../assets/svg/left-arrow-list.svg";
import rightArrow from "../../assets/svg/right-arrow-list.svg";

const Pagination = ({ currentPage, handleNextPage, handlePreviousPage }) => {
    return (
        <div className="pagination">
            <div onClick={handlePreviousPage}>
                <Image size="32px" imgsrc={leftArrow} imgAlt="Previous" />
            </div>
            <p className="page-number">Trang {currentPage}</p>
            <div onClick={handleNextPage}>
                <Image size="32px" imgsrc={rightArrow} imgAlt="Next" />
            </div>
        </div>
    );
};

export default Pagination;
