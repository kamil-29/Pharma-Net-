import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import CategoryCard from "../components/CategoryCard";
import MedicineCard from "../components/MedicineCArd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { clearSearchResults } from "../redux/slice/medicineSlice";

const Home = () => {
  const [medicineList, setMedicineList] = useState([]);
  const [displaySearchResults, setDisplaySearchResults] = useState(false);

  const [age, setAge] = React.useState("");
  const [vendorCityFeatured, setVendorCityFeatured] = React.useState("");
  const [diseaseTypeFeatured, setDiseaseTypeFeatured] = React.useState("");
  const [filteredMedicineList, setFilteredMedicineList] = useState([]);

  const [vendorCitySearch, setVendorCitySearch] = React.useState("");
  const [diseaseTypeSearch, setDiseaseTypeSearch] = React.useState("");
  const [filteredMedicineListSearch, setFilteredMedicineListSearch] = useState(
    []
  );

  const dispatch = useDispatch();

  // Assuming vendorCity is available in each medicine item
  const filterMedicines = (list, set, city, disease) => {
    const filteredMedicines = list.filter((medicine) => {
      const isVendorCityMatch = !city || medicine.vendorCity === city;

      const isDiseaseTypeMatch = !disease || medicine.diseaseType === disease;
      return isVendorCityMatch && isDiseaseTypeMatch;
    });

    set(filteredMedicines);
  };

  const searchResults = useSelector((state) => state.medicine.searchResults);

  useEffect(() => {
    filterMedicines(
      medicineList,
      setFilteredMedicineList,
      vendorCityFeatured,
      diseaseTypeFeatured
    );
  }, [vendorCityFeatured, diseaseTypeFeatured]);

  useEffect(() => {
    console.log(vendorCitySearch, diseaseTypeSearch);
    filterMedicines(
      searchResults,
      setFilteredMedicineListSearch,
      vendorCitySearch,
      diseaseTypeSearch
    );
  }, [vendorCitySearch, diseaseTypeSearch]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const fetchMedicineData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/medicine`);

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      console.log("res", response);
      const data = response.data;
      setMedicineList(data);
    } catch (error) {
      console.error("Error fetching medicine data:", error);
    }
  };
  useEffect(() => {
    console.log("resasd");

    fetchMedicineData();
  }, []);
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const settings2 = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 768, // Adjust settings for screens less than 768px wide
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="banner_slider py-3 container">
        <Slider {...settings}>
          <img
            className="slide"
            src="wallpaper.jpg"
            alt=""
          />
          <img
            className="slide"
            src="https://previews.123rf.com/images/leoedition/leoedition1904/leoedition190400123/120559130-pharmacy-and-medical-banner-with-doodle-background-pills-vitamin-tablets-medical-drug-vector.jpg"
            alt=""
          />
          <img
            className="slide"
            src="https://cdn.vectorstock.com/i/preview-1x/09/06/banner-online-pharmacy-service-vector-35750906.jpg"
            alt=""
          />
        </Slider>
      </div>
      {searchResults.length > 0 ? (
        <div className="container">
          <div
            className="d-flex align-items-center justify-content-between"
            style={{ gap: "2rem" }}
          >
            <div className="d-flex gap-4 align-items-center">
              <h3 className=" fw-bold text-lg-start text-center">
                Search <span className="text-blue"> Results</span> (
                {searchResults.length})
              </h3>
            </div>
            <div className="d-flex align-items-center" style={{ gap: "2rem" }}>
              <h4
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "500",
                  padding: "0",
                  margin: "0",
                  marginLeft: "1.5rem",
                }}
              >
                Filters :{" "}
              </h4>
              <div
                className="d-flex align-items-center"
                style={{ gap: "2rem" }}
              >
                <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                  <InputLabel
                    style={{ fontSize: "0.875rem" }}
                    id="disease_type-search"
                  >
                    Disease Type
                  </InputLabel>
                  <Select
                    labelId="disease_type-search"
                    id="disease_type-search"
                    value={diseaseTypeSearch}
                    onChange={(e) => {
                      setDiseaseTypeSearch(e.target.value);
                    }}
                    label="Disease Type"
                    style={{
                      minWidth: "130px",
                      fontSize: "0.815rem",
                      color: "blue",
                    }}
                  >
                    <MenuItem style={{ fontSize: "0.725rem" }} value="">
                      <em>None</em>
                    </MenuItem>
                    "", "", "", "",
                    <MenuItem
                      style={{ fontSize: "0.725rem" }}
                      value={"Respiratory"}
                    >
                      Respiratory
                    </MenuItem>
                    <MenuItem
                      style={{ fontSize: "0.725rem" }}
                      value={"Digestive"}
                    >
                      Digestive
                    </MenuItem>
                    <MenuItem
                      style={{ fontSize: "0.725rem" }}
                      value={"Cardiovascular"}
                    >
                      Cardiovascular
                    </MenuItem>
                    <MenuItem
                      style={{ fontSize: "0.725rem" }}
                      value={"Neurological"}
                    >
                      Neurological
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                  <InputLabel
                    style={{ fontSize: "0.875rem" }}
                    id="vendor_city-search"
                  >
                    Vendor City
                  </InputLabel>
                  <Select
                    labelId="vendor_city-search"
                    id="vendor_city-search"
                    value={vendorCitySearch}
                    onChange={(e) => {
                      setVendorCitySearch(e.target.value);
                    }}
                    label="Age"
                    style={{
                      minWidth: "130px",
                      fontSize: "0.815rem",
                      color: "blue",
                    }}
                  >
                    <MenuItem style={{ fontSize: "0.725rem" }} value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem
                      style={{ fontSize: "0.725rem" }}
                      value={"Karachi"}
                    >
                      Karachi
                    </MenuItem>
                    <MenuItem
                      style={{ fontSize: "0.725rem" }}
                      value={"Islamabad"}
                    >
                      Islamabad
                    </MenuItem>
                  </Select>
                </FormControl>
                <button
                  onClick={() => {
                    dispatch(clearSearchResults());
                  }}
                  style={{ border: "none", fontSize: "1.5rem" }}
                >
                  X
                </button>
              </div>
            </div>
          </div>
          <div>
            {filteredMedicineListSearch.length === 0 &&
            (vendorCitySearch !== "" || diseaseTypeSearch !== "") ? (
              <p
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  fontWeight: "500",
                  fontSize: "1.15rem",
                }}
              >
                <i className="fa fa-info-circle"></i> No matching medicines
                found.
              </p>
            ) : (
              <div className="d-flex">
                {filteredMedicineListSearch.length > 0
                  ? // Render the filtered list if there is an active filter
                    filteredMedicineListSearch.map((item) => (
                      <div className="col-lg-2 px-3 col-6" key={item.id}>
                        <MedicineCard elm={item} />
                      </div>
                    ))
                  : // Render the original list when there is no active filter
                    searchResults.map((item) => (
                      <div className="col-lg-2 px-3 col-6" key={item.id}>
                        <MedicineCard elm={item} />
                      </div>
                    ))}
              </div>
            )}
          </div>
        </div>
      ) : null}

      <div className="container">
        <div
          className="d-flex align-items-center justify-content-between"
          style={{ gap: "2rem" }}
        >
          <h3 className=" fw-bold text-lg-start text-center">
            Featured <span className="text-blue"> Medicines</span>
          </h3>
          <div className="d-flex align-items-center" style={{ gap: "2rem" }}>
            <h4
              style={{
                fontSize: "1.1rem",
                fontWeight: "500",
                padding: "0",
                margin: "0",
                marginLeft: "1.5rem",
              }}
            >
              Filters :{" "}
            </h4>
            <div className="d-flex align-items-center" style={{ gap: "2rem" }}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                <InputLabel
                  style={{ fontSize: "0.875rem" }}
                  id="disease_type-featured"
                >
                  Disease Type
                </InputLabel>
                <Select
                  labelId="disease_type-featured"
                  id="disease_type-featured"
                  value={diseaseTypeFeatured}
                  onChange={(e) => {
                    setDiseaseTypeFeatured(e.target.value);
                  }}
                  label="Disease Type"
                  style={{
                    minWidth: "130px",
                    fontSize: "0.815rem",
                    color: "blue",
                  }}
                >
                  <MenuItem style={{ fontSize: "0.725rem" }} value="">
                    <em>None</em>
                  </MenuItem>
                  "", "", "", "",
                  <MenuItem
                    style={{ fontSize: "0.725rem" }}
                    value={"Respiratory"}
                  >
                    Respiratory
                  </MenuItem>
                  <MenuItem
                    style={{ fontSize: "0.725rem" }}
                    value={"Digestive"}
                  >
                    Digestive
                  </MenuItem>
                  <MenuItem
                    style={{ fontSize: "0.725rem" }}
                    value={"Cardiovascular"}
                  >
                    Cardiovascular
                  </MenuItem>
                  <MenuItem
                    style={{ fontSize: "0.725rem" }}
                    value={"Neurological"}
                  >
                    Neurological
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                <InputLabel
                  style={{ fontSize: "0.875rem" }}
                  id="vendor_city-featured"
                >
                  Vendor City
                </InputLabel>
                <Select
                  labelId="vendor_city-featured"
                  id="vendor_city-featured"
                  value={vendorCityFeatured}
                  onChange={(e) => {
                    setVendorCityFeatured(e.target.value);
                  }}
                  label="Age"
                  style={{
                    minWidth: "130px",
                    fontSize: "0.815rem",
                    color: "blue",
                  }}
                >
                  <MenuItem style={{ fontSize: "0.725rem" }} value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem style={{ fontSize: "0.725rem" }} value={"Karachi"}>
                    Karachi
                  </MenuItem>
                  <MenuItem
                    style={{ fontSize: "0.725rem" }}
                    value={"Islamabad"}
                  >
                    Islamabad
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

        <div>
          {filteredMedicineList.length === 0 &&
          (vendorCityFeatured !== "" || diseaseTypeFeatured !== "") ? (
            <p
              style={{
                textAlign: "center",
                padding: "2rem",
                fontWeight: "500",
                fontSize: "1.15rem",
              }}
            >
              <i className="fa fa-info-circle"></i> No matching medicines found.
            </p>
          ) : (
            <div className="d-flex flex-wrap">
              {filteredMedicineList.length > 0
                ? // Render the filtered list if there is an active filter
                  filteredMedicineList.map((item) => (
                    <div className="col-lg-2 px-3 col-6" key={item.id}>
                      <MedicineCard elm={item} />
                    </div>
                  ))
                : // Render the original list when there is no active filter
                  medicineList.map((item) => (
                    <div className="col-lg-2 px-3 col-6" key={item.id}>
                      <MedicineCard elm={item} />
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>

     
    </>
  );
};

export default Home;
