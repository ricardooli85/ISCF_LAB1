function DataTable(props) {
    const { data } = props;
  
    return (
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>X</th>
            <th>Y</th>
            <th>Z</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.timestamp}</td>
              <td>{item.x}</td>
              <td>{item.y}</td>
              <td>{item.z}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }