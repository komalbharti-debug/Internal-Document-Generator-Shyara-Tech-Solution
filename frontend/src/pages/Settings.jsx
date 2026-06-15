import Breadcrumb from "../components/Breadcrumb";

function Settings() {
  return (
    <>
      <Breadcrumb />

      <h1>Settings</h1>

      <div className="settings-cards">

        <div className="card">

          <h3>Backup & Restore</h3>

          <div className="button-group">
            <button>Create Backup</button>
            <button>Restore Backup</button>
          </div>

        </div>

        <div className="card">

          <h3>Storage Location</h3>

          <input
            type="text"
            value="C:\\Shyara\\Documents"
            readOnly
          />

        </div>

      </div>

    </>
  );
}

export default Settings;