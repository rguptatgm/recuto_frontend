import classNames from "classnames";
import "./image.component.scss";
import { ImageSizes } from "../../../globals/enums/global.enum";

interface ImageProps {
  imageUrl?: string;
  rounded?: boolean;
  className?: string;
  size?: ImageSizes;
  empty?: boolean;
}

const Image = ({
  imageUrl,
  rounded = false,
  className,
  size = ImageSizes.S,
  empty = false,
}: ImageProps): JSX.Element => {
  let imageSize;

  switch (size) {
    case ImageSizes.S:
      imageSize = "table-image-small";
      break;
    case ImageSizes.M:
      imageSize = "table-image-medium";
      break;
    case ImageSizes.L:
      imageSize = "table-image-large";
      break;
    case ImageSizes.XXL:
      imageSize = "table-image-xxl";
      break;
    case ImageSizes.FULL_SIZE:
      imageSize = "table-image-full-size";
      break;
    default:
      imageSize = "table-image-xl";
  }

  const tableImageClassName = classNames(
    {
      "table-image-empty": empty,
      "table-image": !empty,
      "rounded-image": rounded,
    },
    imageSize,
    className
  );

  if (!empty) {
    return <img className={className} src={imageUrl} alt="image" />;
  } else {
    return <div className={tableImageClassName}></div>;
  }
};

export default Image;
