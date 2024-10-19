import React from "react";
import './DetailCompany.scss'
const DetailCompany = () => {
    return (
        <div className="container">
          <div className="main-content full-width"> 
            <div>
              <b>Chi Tiết Công Ty</b>
              <div className="company-details">
                <div className="image-section">
                  <img
                    src="https://dplusvn.com/wp-content/uploads/2020/01/hinh-anh-van-phong-cong-ty-ggroup-2.jpg"
                    alt="product"
                    className="main-image"
                  />
                  <div className="thumbnail-section">
                    <img
                      src="https://seaoffice.vn/wp-content/uploads/2019/09/van-phong-cho-thue-tai-TP-HCM.jpg"
                      alt="thumbnail"
                    />
                    <img
                      src="https://dplusvn.com/wp-content/uploads/2020/01/hinh-anh-van-phong-cong-ty-ggroup-2.jpg"
                      alt="thumbnail"
                    />
                    <img
                      src="https://storage.googleapis.com/digital-platform/hinh_anh_20_mau_thiet_ke_noi_that_van_phong_dep_and_chuyen_nghiep_so_2_ad3820a068/hinh_anh_20_mau_thiet_ke_noi_that_van_phong_dep_and_chuyen_nghiep_so_2_ad3820a068.jpg"
                      alt="thumbnail"
                    />
                    <img
                      src="https://storage.googleapis.com/digital-platform/hinh_anh_20_mau_thiet_ke_noi_that_van_phong_dep_and_chuyen_nghiep_so_2_ad3820a068/hinh_anh_20_mau_thiet_ke_noi_that_van_phong_dep_and_chuyen_nghiep_so_2_ad3820a068.jpg"
                      alt="thumbnail"
                    />
                  </div>
                  <div className="button-container">
                    <button>Đặt lịch</button>
                  </div>
                </div>
                    
                <div className="info-section">
                  <b style={{ fontSize: '16px' }}>Công ty 1 :</b>
                  <p style={{ fontSize: '14px' }}>90.000đ / giờ</p>
                  <b style={{ fontSize: '16px' }}>Giới thiệu:</b>
                  <p style={{ fontSize: '14px' }}>
                    Chuyên cung cấp các dịch vụ vệ sinh dọn dẹp tận nhà
                  </p>
                  <b style={{ fontSize: '16px' }}>Dịch vụ:</b>
                  <p style={{ fontSize: '14px' }}>
                    Dịch vụ dọn nhà theo giờ ngày càng phổ biến và dường như đang trở thành xu hướng hiện nay. Tuy vậy vẫn còn một số chị em mơ hồ về loại hình dịch vụ này
                  </p>
                  
                  <b style={{ fontSize: '16px' }}>Thời gian :</b>
                  <p style={{ fontSize: '14px' }}>Khung giờ làm việc</p>
                  <b style={{ fontSize: '16px' }}>Thông tin liên hệ:</b>
                  <p style={{ fontSize: '14px' }}>Số điện thoại: 0123...</p>
                  <p style={{ fontSize: '14px' }}>Email: demo@gmail.com</p>
                  <p style={{ fontSize: '14px' }}>Địa chỉ: Đà Nẵng</p>
                </div>
              </div>
              <div className="reviews-and-contact">
                <div className="reviews">
                  <h3 style={{ fontSize: '18px' }}>Đánh giá & Nhận xét</h3>
                  <div className="rating-summary">
                    <div className="rating-score">
                      <span className="score" style={{ fontSize: '24px' }}>4.5</span>
                      <div className="star-rating" style={{ fontSize: '18px' }}>
                        <span>⭐⭐⭐⭐⭐</span>
                      </div>
                      <p style={{ fontSize: '12px' }}>595 Verified Buyers</p>
                    </div>
                    <div className="rating-breakdown">
                      <div className="rating-bar" style={{ fontSize: '12px' }}>
                        <span>5 ⭐</span>
                        <div className="progress-bar">
                          <div className="fill" style={{ width: '85%' }}></div>
                        </div>
                        <span>420</span>
                      </div>
                      <div className="rating-bar" style={{ fontSize: '12px' }}>
                        <span>4 ⭐</span>
                        <div className="progress-bar">
                          <div className="fill" style={{ width: '60%' }}></div>
                        </div>
                        <span>90</span>
                      </div>
                      <div className="rating-bar" style={{ fontSize: '12px' }}>
                        <span>3 ⭐</span>
                        <div className="progress-bar">
                          <div className="fill" style={{ width: '30%' }}></div>
                        </div>
                        <span>33</span>
                      </div>
                      <div className="rating-bar" style={{ fontSize: '12px' }}>
                        <span>2 ⭐</span>
                        <div className="progress-bar">
                          <div className="fill" style={{ width: '10%' }}></div>
                        </div>
                        <span>12</span>
                      </div>
                      <div className="rating-bar" style={{ fontSize: '12px' }}>
                        <span>1 ⭐</span>
                        <div className="progress-bar">
                          <div className="fill" style={{ width: '20%' }}></div>
                        </div>
                        <span>40</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    
            </div>
          </div>
        </div>
      );
    };
    

export default DetailCompany;