import PulseLoader from "react-spinners/PulseLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Spinner = ({loading}) => {

  return (
    <div className="sweet-loading">

      <PulseLoader
        color="#8ac0ef"
        loading={loading}
        cssOverride={override}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
} 


export default Spinner;