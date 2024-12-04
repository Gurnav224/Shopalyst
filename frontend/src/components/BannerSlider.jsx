import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const BannerSlider = () => {
  const settings = {
    dots: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div>

    <Slider {...settings}>
        <img className="w-100 h-1000" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/1a04a2133870811.6527c39bd6a0c.png" alt="" />
        <img className="w-100 h-100" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/91503d110494491.5feef8228f77b.png" alt="" />
    </Slider>
    </div>

  )
}

export default BannerSlider
