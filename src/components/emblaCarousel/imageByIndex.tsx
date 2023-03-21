// import image1 from "src/assets/images/slide-1.jpg";
// import image2 from "src/assets/images/slide-2.jpg";
// import image3 from "src/assets/images/slide-3.jpg";

import placeholder from "src/assets/images/placeholder.jpg";

export const images = [placeholder];

const imageByIndex = (index: number) => images[index % images.length];

export default imageByIndex;
