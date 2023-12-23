import { useOutletContext } from "react-router-dom";

const Pricing = () => {
  const { van } = useOutletContext();
  return <div>{van.price}</div>;
};

export default Pricing;
