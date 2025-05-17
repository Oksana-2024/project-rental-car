import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

import s from "./LikeButton.module.css";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { toggleLike } from "../../redux/likes/slice";
import type { ICar } from "../../redux/cars/slice";

type TLikeButtonProps = Pick<ICar, "id"> & {
  like: boolean;
  className: string;
};

const LikeButton = ({ id, like, className }: TLikeButtonProps) => {
  const dispatch = useAppDispatch();
  return (
    <div onClick={() => dispatch(toggleLike(id))} className={className}>
      {like ? (
        <MdOutlineFavorite size={20} className={s.favorite} />
      ) : (
        <MdOutlineFavoriteBorder size={20} className={s.hurt} />
      )}
    </div>
  );
};

export default LikeButton;
