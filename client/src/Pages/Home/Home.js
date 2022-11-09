import ParallaxCarousel from '../../Components/carousel/carousel';
 import { Cards } from '../../Components/cards/cards';
function Home({cartsize,setcartsize}) {
  return (
    <>
  <ParallaxCarousel/>
  <Cards  cartsize={cartsize} setcartsize={setcartsize}/>
  </>
  );
}

export default Home;