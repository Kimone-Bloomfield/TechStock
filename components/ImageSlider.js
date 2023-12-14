import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
function Slider()
{
    return (
        <div className="slider">
            <AliceCarousel autoPlay autoPlayInterval={600} infinite={true}>
                <center><img src="/tablet.jpg" className="sliderimg" alt=""/></center>
                <center><img src="/laptop.jpg" className="sliderimg" alt=""/></center>
                 <center><img src="/desktop.jpg" className="sliderimg" alt=""/></center> 
                <center><img src="/printer.jpg" className="sliderimg" alt=""/></center>
                <center><img src="/ups.jpg" className="sliderimg" alt=""/></center>
            </AliceCarousel>
        </div>
    )
}

export default Slider;