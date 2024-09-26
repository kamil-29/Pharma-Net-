const CustomerTable = ({ customers }) => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Gender</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{customer?.first_name}</td>
                <td>{customer?.last_name}</td>
                <td>{customer?.email}</td>
                <td>{customer?.address}</td>
                <td>{customer?.gender}</td>
                <td>{customer?.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
