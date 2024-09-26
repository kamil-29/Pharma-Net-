const VendorTable = ({ vendors }) => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">B. Address</th>
            <th scope="col">B. Email</th>
            <th scope="col">B. Phone</th>
            <th scope="col">B. Tax no.</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{vendor?.first_name + " " + vendor?.last_name}</td>
                <td>{vendor?.contact_person_email}</td>
                <td>{vendor?.contact_person_phone}</td>
                <td>{vendor?.contact_person_address}</td>
                <td>{vendor?.business_address}</td>
                <td>{vendor?.business_email}</td>
                <td>{vendor?.business_phone}</td>
                <td>{vendor?.tax_identification_number}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default VendorTable;
