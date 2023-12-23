import { useOutletContext } from "react-router-dom";

const Photos = () => {
  const { van } = useOutletContext();
  return (
    <div>
      <img className="w-[150px] rounded" src={van.imageUrl} alt={van.name} />
    </div>
  );
};

export default Photos;
