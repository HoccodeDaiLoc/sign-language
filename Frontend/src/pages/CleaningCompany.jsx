import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { FaArrowRight } from "react-icons/fa";
import logo_company from "../assets/images/logo_company.png";
import locationAPI from "../api/locationAPI";
import "./CleaningCompany.scss";
import { Link, NavLink } from 'react-router-dom';
const CleaningCompany = () => {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  useEffect(() => {
    // Lấy danh sách tỉnh thành
    locationAPI
      .getProvinces()
      .then((response) => {
        if (response.data.error === 0) {
          setProvinces(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
      });
  }, []);
  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };
  const companies = [
    {
      name: "Công ty 1",
      location: "Đà Nẵng",
      uses: 345,
      price: "20,000₫",
      logo: logo_company,
    },
    {
      name: "Công ty 2",
      location: "Hồ Chí Minh",
      uses: 345,
      price: "$45,129",
      logo: logo_company,
    },
    {
      name: "Công ty 3",
      location: "Đà Nẵng, Hà Nội",
      uses: 345,
      price: "$45,129",
      logo: logo_company,
    },
    {
      name: "Công ty 4",
      location: "Quảng Trị",
      uses: 345,
      price: "$45,129",
      logo: logo_company,
    },
    {
      name: "Công ty 5",
      location: "Đà Nẵng, Quảng Nam",
      uses: 345,
      price: "$45,129",
      logo: logo_company,
    },
    {
      name: "Công ty 6",
      location: "Vinh",
      uses: 345,
      price: "$45,129",
      logo: logo_company,
    },
    {
      name: "Công ty 7",
      location: "Đà Nẵng",
      uses: 345,
      price: "$45,129",
      logo: logo_company,
    },
    {
      name: "Công ty 8",
      location: "Bình Định",
      uses: 345,
      price: "$45,129",
      logo: logo_company,
    },
    {
      name: "Công ty 8",
      location: "Bình Định",
      uses: 345,
      price: "$45,129",
      logo: logo_company,
    },
  ];

  return (
    <div className="user-list-cng-ty">
      <div className="container">
        <Typography variant="h4" className="heading-seller">
          Công ty dọn dẹp
        </Typography>
        <div className="filter-options">
          <div className="input-search">
            <input
              type="text"
              placeholder="Tìm kiếm công ty"
              className="search-input"
            />
          </div>
          {/* <img className="image-fill" alt="Image fill" src={imageFill} /> */}
          <div className="filter-address">
            <select value={selectedProvince} onChange={handleProvinceChange}>
              <option value="">Địa điểm...</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.full_name}
                </option>
              ))}
            </select>
            <Button className="btn-filter" variant="contained">
              Lọc
            </Button>
          </div>
        </div>
        <Grid container spacing={2} className="container-card">
          {companies.map((company, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="company-card">
                <CardContent className="company-card-content">
                  <div className="company-detail">
                    <img
                      className="logo-company"
                      alt="Sellerlogo"
                      src={company.logo}
                    />
                    <Typography variant="h6" className="heading-card">
                      {company.name}
                    </Typography>
                    <Typography className="text-card">
                      {company.location}
                    </Typography>
                  </div>
                  <div className="company-tk">
                    <div className="company-tk-uses">
                      <Typography className="content">
                        {company.uses}
                      </Typography>
                      <Typography className="title">Lượt dùng</Typography>
                    </div>
                    <hr className="vertical-line" />
                    <div className="company-tk-cost">
                      <Typography className="content">
                        {company.price}
                      </Typography>
                      <Typography className="title">Giá</Typography>
                    </div>
                  </div>
                  <hr className="hos-line" />
                  <div className="button-detail">
                  <Link to='/dashboard/detailcompany' className='member-btn'>                       
                    <Button variant="outlined" className="btn_detail">
                      Xem chi tiết
                      <FaArrowRight />
                    </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Pagination count={10} variant="outlined" shape="rounded" />
      </div>
    </div>
  );
};

export default CleaningCompany;
