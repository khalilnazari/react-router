import { useOutletContext } from "react-router-dom";

const VanDetails = () => {
  const { van } = useOutletContext();
  return <div>{van.description}</div>;
};

export default VanDetails;
