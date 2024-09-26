import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryCard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMedicineData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/medicine`);

        if (response?.status !== 200) {
          throw new Error("Network response was not ok");
        }

        const data = response?.data;
        setData(data);
      } catch (error) {
        console.error("Error fetching medicine data:", error);
      }
    };

    fetchMedicineData();
  }, []);

  console.log(data);

  return (
    <div class="card position-relative">
      {data?.length > 0 ? (
        data &&
        data?.map((elm) => (
          <React.Fragment key={elm?._id} >
            <span className="category_name">{elm?.category}</span>
            <img
              src={elm?.image}
              class="card-img-bottom mt-0 rounded-3"
              alt={elm?.medicinename}
            />
            <div class="card-body mb-0">
              <h5 style={{ fontSize: "1rem", textAlign: "left" }}>
                {elm?.description}
              </h5>
              <span>{elm?.price}</span>
            </div>
          </React.Fragment>
        ))
      ) : (
        <h3 style={{ textAlign: "center" }}>No Product Found</h3>
      )}

      {/* <img
        src="https://cdn.pixabay.com/photo/2015/05/31/10/55/man-791049_1280.jpg"
        class="card-img-bottom mt-0"
        alt="..."
      /> */}
    </div>
  );
};

export default CategoryCard;
