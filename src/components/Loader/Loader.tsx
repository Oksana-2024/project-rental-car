import { ClipLoader } from "react-spinners";

import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.loaderBox}>
      <ClipLoader size={250} color="var(--accent-color)" cssOverride={{borderWidth:"12px"}} />
    </div>
  );
};

export default Loader;
