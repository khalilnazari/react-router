import { useParams } from "react-router-dom";

const VanDetails = () => {
  const params = useParams();
  console.log(params);

  return <div>Host van details</div>;
};

export default VanDetails;
