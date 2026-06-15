import { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";

function Departments() {

  const defaultDepartments = [
    "HR",
    "Legal",
    "Finance",
    "Operations"
  ];

  const [departments, setDepartments] = useState(() => {
    const savedDepartments =
      localStorage.getItem("departments");

    return savedDepartments
      ? JSON.parse(savedDepartments)
      : defaultDepartments;
  });

  useEffect(() => {
    localStorage.setItem(
      "departments",
      JSON.stringify(departments)
    );
  }, [departments]);

  const addDepartment = () => {

    const departmentName = prompt(
      "Enter Department Name"
    );

    if (!departmentName) return;

    setDepartments([
      ...departments,
      departmentName
    ]);
  };

  const deleteDepartment = (departmentName) => {

    const updatedDepartments =
      departments.filter(
        (dept) => dept !== departmentName
      );

    setDepartments(updatedDepartments);
  };

  return (
    <>
      <Breadcrumb />

      <div className="page-title-row">

        <div>
          <h1>Departments</h1>
          <p>Manage department document types</p>
        </div>

        <button
          className="btn"
          onClick={addDepartment}
        >
          Add Department
        </button>

      </div>

      <div className="card-grid">

        {departments.map((item) => (
          <div className="card" key={item}>

            <div className="department-header">

              <h3>{item}</h3>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteDepartment(item)
                }
              >
                Delete
              </button>

            </div>

            <p>Document Types</p>

          </div>
        ))}

      </div>
    </>
  );
}

export default Departments;