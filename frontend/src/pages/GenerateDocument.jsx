import { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { jsPDF } from "jspdf";

function GenerateDocument() {

  const [department, setDepartment] = useState("");
  const [documentType, setDocumentType] = useState("");

  const [departments, setDepartments] = useState([]);
  const [templates, setTemplates] = useState([]);

  const [candidateName, setCandidateName] = useState("");
  const [designation, setDesignation] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [salary, setSalary] = useState("");
  const [managerName, setManagerName] = useState("");

  useEffect(() => {

    const savedDepartments =
      JSON.parse(
        localStorage.getItem("departments")
      ) || [];

    const savedTemplates =
      JSON.parse(
        localStorage.getItem("templates")
      ) || [];

    setDepartments(savedDepartments);
    setTemplates(savedTemplates);

  }, []);
  const generatePDF = () => {

  if (
    !candidateName ||
    !designation ||
    !joiningDate ||
    !salary ||
    !managerName ||
    !department ||
    !documentType
  ) {
    alert("Please fill all fields");
    return;
  }

  const doc = new jsPDF();

  doc.text(documentType, 20, 20);
  doc.setFontSize(12);

  doc.setFontSize(20);
doc.text(documentType, 20, 20);

doc.setFontSize(12);

doc.text(
  `Dear ${candidateName},`,
  20,
  45
);

doc.text(
  `We are pleased to offer you the position of ${designation}.`,
  20,
  65
);

doc.text(
  `Starting from ${joiningDate}.`,
  20,
  80
);

doc.text(
  `Your annual compensation will be ${salary}.`,
  20,
  95
);

doc.text(
  `You will report to ${managerName}.`,
  20,
  110
);

doc.text(
  `Regards,`,
  20,
  140
);

doc.text(
  `${department} Department`,
  20,
  155
);
  const fileName =
    `${candidateName}-${documentType}.pdf`;

  doc.save(fileName);

  const history =
    JSON.parse(
      localStorage.getItem("history")
    ) || [];

  const reference =
    `SHY-${String(
      history.length + 1
    ).padStart(3, "0")}`;

  history.unshift({
    document:
      `${candidateName} - ${documentType}`,
    reference,
    department,
    type: documentType,
    date:
      new Date().toLocaleDateString()
  });

  localStorage.setItem(
    "history",
    JSON.stringify(history)
  );

  alert("PDF Generated Successfully");
};

  return (
    <>
      <Breadcrumb />

      <h1>Generate Document</h1>

      <div className="generate-layout">

        <div className="card">

          <h3>1. Select Template</h3>

          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setDocumentType("");
            }}
          >
            <option value="">
              Choose Department
            </option>

            {departments.map((dept) => (

              <option
                key={dept}
                value={dept}
              >
                {dept}
              </option>

            ))}

          </select>

          <select
            value={documentType}
            onChange={(e) =>
              setDocumentType(e.target.value)
            }
          >
            <option value="">
              Choose Document Type
            </option>

            {templates
              .filter(
                (template) =>
                  template.department ===
                  department
              )
              .map((template) => (

                <option
                  key={template.name}
                  value={template.name}
                >
                  {template.name}
                </option>

              ))}

          </select>

          {documentType && (
            <>
              <hr
                style={{
                  margin: "25px 0"
                }}
              />

              <h3>
                2. Fill Placeholders
              </h3>

              <input
                type="text"
                placeholder="Candidate Name"
                value={candidateName}
                onChange={(e) =>
                  setCandidateName(
                    e.target.value
                  )
                }
              />

              <input
                type="text"
                placeholder="Designation"
                value={designation}
                onChange={(e) =>
                  setDesignation(
                    e.target.value
                  )
                }
              />

              <input
                type="text"
                placeholder="Joining Date"
                value={joiningDate}
                onChange={(e) =>
                  setJoiningDate(
                    e.target.value
                  )
                }
              />

              <input
                type="text"
                placeholder="Salary"
                value={salary}
                onChange={(e) =>
                  setSalary(
                    e.target.value
                  )
                }
              />

              <input
                type="text"
                placeholder="Manager Name"
                value={managerName}
                onChange={(e) =>
                  setManagerName(
                    e.target.value
                  )
                }
              />
            </>
          )}

        </div>

        <div className="card">

          <h3>Preview</h3>

          <div className="preview-box">

            {!documentType ? (

              <p>
                Select template to preview
              </p>

            ) : (

              <div>

                <h2 className="document-title">
                  {documentType}
                </h2>

                <br />

                <p>
                  Dear{" "}
                  {candidateName ||
                    "[candidate_name]"}
                  ,
                </p>

                <br />

                <p>
                  We are pleased to offer
                  you the position of
                  <b>
                    {" "}
                    {designation ||
                      "[designation]"}
                  </b>
                  starting from
                  <b>
                    {" "}
                    {joiningDate ||
                      "[joining_date]"}
                  </b>.
                </p>

                <br />

                <p>
                  Your annual compensation
                  will be
                  <b>
                    {" "}
                    {salary ||
                      "[salary]"}
                  </b>.
                </p>

                <br />

                <p>
                  You will report to
                  <b>
                    {" "}
                    {managerName ||
                      "[manager_name]"}
                  </b>.
                </p>

                <br />
                <br />

                <p>Regards,</p>

                <p>
                  {department}
                  {" "}
                  Department
                </p>

              </div>

            )}

          </div>

          <button
  className="btn full"
  onClick={generatePDF}>

  Generate PDF
</button>

        </div>

      </div>

    </>
  );
}

export default GenerateDocument;