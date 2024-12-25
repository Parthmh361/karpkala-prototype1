// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const VideoCarousel: React.FC = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//   };

//   const videos = [
//     { url: "video1.mp4", title: "Video 1" },
//     { url: "video2.mp4", title: "Video 2" },
//     { url: "video3.mp4", title: "Video 3" },
//   ];

//   return (
//     <Slider {...settings}>
//       {videos.map((video, index) => (
//         <div key={index}>
//           <video width="100%" controls>
//             <source src={video.url} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <p>{video.title}</p>
//         </div>
//       ))}
//     </Slider>
//   );
// };

// export default VideoCarousel;
