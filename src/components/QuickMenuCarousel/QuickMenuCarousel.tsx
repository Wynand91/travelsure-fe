import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "./QuickMenuCarousel.css";

const quickMenuItems = [
  {
    label: "My Policies",
    className: "bg-policies",
    path: "/policies",
    description: "View and manage your existing travel insurance policies.",
  },
  {
    label: "Get Cover",
    className: "bg-cover",
    path: "/policies/new",
    description: "Take out a new policy for an upcoming trip.",
  },
  {
    label: "My Claims",
    className: "bg-claims",
    path: "/claims",
    description: "Track the status of your submitted claims.",
  },
];

export default function QuickMenuCarousel() {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="quick-carousel-container">
      <Slider {...settings}>
        {quickMenuItems.map((item) => (
          <div
            key={item.label}
            className={`quick-card ${item.className}`}
            onClick={() => navigate(item.path)}
          >
            <h4>{item.label}</h4>
            <p className="quick-card-description">{item.description}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}
