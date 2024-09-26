import React from "react";

const CustomerOrderItem = ({ item }) => {
  const id = item._id;
  const formattedId = id.substr(0, 3) + "...." + id.substr(-3);

  const dateString = item.creationDate;
  const datePart = dateString.split("T")[0];
  return (
    <div
      style={{
        background: "white",
        padding: "1.25rem",
        display: "flex",
        //   alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "14px",
        marginBottom: "18px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
          width: "32%",
          borderRight: "1px solid  rgba(128, 128, 128, 0.15)",
        }}
      >
        <p
          style={{
            background: "#0d73bb",
            width: "fit-content",
            padding: "0.25rem 1rem",
            fontSize: "0.85rem",
            fontWeight: "600",
            borderRadius: "60px",
            color: "white",
          }}
          className="mb-0"
        >
          Order # {formattedId}
        </p>
        {/* <p className="mb-0 mt-2">Vendor Name : Kamil Hassan</p> */}
        <p className="mb-0 mt-2">Order Date : {datePart}</p>
        <p className="mb-0">Shipping Address : {item?.address}</p>
        <p style={{ fontWeight: "600" }} className="mb-0">
          Total : {item?.total}
        </p>
      </div>
      <div
        style={{
          width: "38%",
          borderRight: "1px solid  rgba(128, 128, 128, 0.15)",
        }}
      >
        <strong className="">Items:</strong>
        {item.items.length > 0 &&
          item.items.map((med) => (
            <div style={{ display: "flex", gap: "10px" }}>
              <span> - </span>
              <p style={{ fontSize: "0.9rem" }}>{med.medicine.medicinename}</p>
              <p style={{ fontSize: "0.9rem" }}>({med.amount})</p>
            </div>
          ))}
      </div>
      <div
        style={{
          width: "20%",
        }}
        className="pt-1"
      >
        <strong className="mt-2">Status:</strong>
        <div style={{ display: "flex", gap: "10px" }}>
          <p>
            {item?.status &&
              item?.status
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrderItem;
