import axios from "axios-observable";
import React, { useEffect, useState } from "react";
import { map } from "rxjs";
import { useFetch } from "usehooks-ts";
import DataReportsTable from "./components/DataReportsTable";

const DataReports = () => {
  const { data: companies } = useFetch("http://localhost:4000/api/companies");
  // const { data: countries, fetched } = useFetch(
  //   "http://localhost:4000/api/performance/countries"
  // );

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const promises = [];
    companies?.forEach((company) => {
      promises.push(
        axios
          .get(
            `http://localhost:4000/api/performance/countries/company/${company.id}`
          )
          .pipe(
            map((res) => ({
              ...res.data.map((item) => ({
                ...item,
                ...company,
                roi: item.revenue / item.cost,
              })),
            }))
          )
          .toPromise()
      );
    });

    Promise.all(promises).then((res) => {
      const data = res.reduce((acc, item) => {
        return [...acc, ...Object.values(item)];
      }, []);
      setTableData(data);
    });

    return () => {};
  }, [companies]);

  console.log(tableData);

  // console.log(data);
  // const data = React.useMemo(() => {
  //   // console.log(companies);
  //   // console.log(countries);
  // }, [countries, companies]);

  return (
    <div>
      {tableData ? <DataReportsTable data={tableData}></DataReportsTable> : ""}
      {/* <div>
        {companies.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div> */}
      {/* <div>
        {countries
          ? countries.map((item) => <div key={item.iso}>{item.country}</div>)
          : ""}
      </div> */}
    </div>
  );
};

export default DataReports;
