
import React,{useEffect,useState} from "react";
import img1 from '../../assets/MicrosoftTeams-image.png'
import img2 from '../../assets/Ultra realistic full body photo of a French male m (2).jpg'
import img3 from '../../assets/Ultra realistic full body photo of a French male m.jpg'
import img4 from '../../assets/Photo ultra définition.jpg'
import img5 from '../../assets/Photo ultra définition (1).jpg'
import img6 from '../../assets/Ultra realistic full body photo of a French male m (1).jpg'
import img7 from '../../assets/best-deal3-removebg-preview.png'
import img8 from '../../assets/A light blue skirt set with an A-line ankle-length (1).jpg'
import img9 from '../../assets/The indian woman wearing a black dress is posing i.jpg'
import img10 from '../../assets/happy alien. 25 year old male.jpg'



const Blog = () => {
    const [blogs, setBlogs] = useState([]);


    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(
                    "https://minitgo.com/api/fetch_blog.php"
                );
                setBlogs(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };


        fetchBlogs();
    }, []);

    return (
        <>
            <div className="d-flex flex-column container">
                <br />
                <div className="col-12  mt-3"style={{marginTop:''}}>
                <style>
        {`
        @media (min-width: 768px) {
            .image-container {
                height: 120vh; 
            }
        }
        `}
    </style>
                    <div className="image-container mx-auto" style={{ position: 'relative', overflow: 'hidden' ,width:'100%'  }}>
                        <img src={img1} alt="xd" style={{ width: '100%', display: 'block', marginTop: '' }} />
                        <div className="text-overlay mb-5" style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', padding: '20px', boxSizing: 'border-box' }}>
                            <h4 className="fs-1" style={{ color: 'white', margin: '0' }}>MINITGO</h4>
                            <h1 className="fs-2" style={{ color: 'white', margin: '0' }}>Supreme Summer Sale</h1>
                            <p className="fs-3" style={{ color: 'white', margin: '0' }}>Up to 50% off</p>
                        </div>
                    </div>


                </div>
                <div className="row  justify-content-center  w-100">
                    <h2 className="mt-5 mb-3">Spring Sale Per Category</h2>

                    <div className="col-sm-4 mt-2 col-md-4 text-center" style={{ overflow: 'hidden',  }}>
                        <img src={img6} alt="Image 1" className="img-fluid" style={{ height: '25rem', width: '30rem' }} />
                        <h4 className="mt-1">Outwear</h4>
                    </div>

                    <div className="col-sm-4 mt-2 col-md-4 text-center" style={{ overflow: 'hidden',  }}>
                        <img src={img8} alt="Image 2" className="img-fluid" style={{ height: '25rem', width: '30rem' }} />
                        <h4 className="mt-1">Trending</h4>
                    </div>

                    <div className="col-sm-4 mt-2 col-md-4 text-center" style={{ overflow: 'hidden',  }}>
                        <img src={img7} alt="Image 3" className="img-fluid" style={{ height: '25rem', width: '30rem' }} />
                        <h4 className="mt-1">Footwear</h4>
                    </div>
                </div>


                <div className="row mt-3">
                    <h2 className="mt-5 text-center w-100">New Arrivals</h2>
                </div>
                <div className="row m-3">
                    <div className="col-sm-4 mt-5 position-relative col-md-4" style={{ paddingRight: 0 }}>
                        <img src={img4} alt="Image 1" className="img-fluid h-100 w-100" />
                        <div className="text-overlay mb-3" style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', padding: '20px', boxSizing: 'border-box' }}>
                            <h3 style={{ color: 'white', margin: '0' }}>The Pantsuit Collection</h3>
                        </div>
                    </div>
                    <div className="col-sm-4 mt-5 position-relative col-md-4" style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <img src={img2} alt="Image 2" className="img-fluid h-100 w-100" />
                        <div className="text-overlay mb-3" style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', padding: '20px', boxSizing: 'border-box' }}>
                            <h3 style={{ color: 'white', margin: '0' }}>Sharp and sweet Menswear</h3>
                        </div>
                    </div>
                    <div className="col-sm-4 mt-5 position-relative col-md-4" style={{ paddingLeft: 0 }}>
                        <img src={img5} alt="Image 3" className="img-fluid h-100 w-100" />
                        <div className="text-overlay mb-3" style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', padding: '20px', boxSizing: 'border-box' }}>
                            <h3 style={{ color: 'white', margin: '0' }}>Adventures Await Accessories</h3>
                        </div>
                    </div>
                </div>


            




<div className="row justify-content-center w-100">
    <h2 className="mt-5 mb-5">Bestsellers by Category</h2>
    <div className="col-sm-4 mt-2 col-md-4 position-relative text-center" style={{ overflow: 'hidden', height: '13rem', width: '13rem' }}>
        <img src={img6} alt="Image 1" className="img-fluid" style={{ height: '100%', width: '100%' }} />
        <h5 className="image-overlay" style={{ position: 'absolute', top: '80%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>Dresses</h5>
    </div>
    <div className="col-sm-4 mt-2 col-md-4 position-relative text-center" style={{ overflow: 'hidden', height: '13rem', width: '13rem' }}>
        <img src={img3} alt="Image 2" className="img-fluid" style={{ height: '100%', width: '100%' }} />
        <h5 className="image-overlay" style={{ position: 'absolute', top: '80%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>Knitwear</h5>
    </div>
    <div className="col-sm-4 mt-2 col-md-4 position-relative text-center" style={{ overflow: 'hidden', height: '13rem', width: '13rem' }}>
        <img src={img9} alt="Image 3" className="img-fluid" style={{ height: '100%', width: '100%' }} />
        <h5 className="image-overlay" style={{ position: 'absolute', top: '80%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>CropTops</h5>
    </div>
</div>






<div className="mt-5 mb-2" style={{ position: 'relative', height: '250px', overflow: 'hidden' }}>
    <img src={img10} alt="Image" style={{ width: '100%', height: 'auto', position: 'absolute', top: '50%', transform: 'translateY(-50%)' }} />
    <div style={{ position: 'absolute', top: '50%', left: '10%', transform: 'translateY(-50%)', color: 'white' }}>
        <h2 style={{ margin: '0', fontSize: '40px', color: 'white' }}>Visit Our<br />Physical Stores</h2>
        <button className="btn btn-md btn-primary px-5 px-sm-5 visit-button">Visit</button>
    </div>
</div>



                <div className="  rounded mb-2  mt-5 p-0" id="foot">
    <div className="image-container" style={{ position: 'relative', overflow: 'hidden' ,height:'800px' }}>
        <img src={img5} alt="xd"  style={{ width: '100%', height: 'auto', position: 'absolute', top: '40%', transform: 'translateY(-50%)' }} />
        <div className="" style={{ position: 'absolute', top: '10%', left: '0', width: '100%', padding: '20px', boxSizing: 'border-box' }}>
            <h1 className="text-white mt-5 text-center fw-bold fs-2 fs-lg-4" style={{ margin: '0', letterSpacing: "5px" }}>Need Anything?</h1>
            <div className="mt-4 pt-5 " >   
                <hr className="hr text-white mt-5 pt-5" style={{ position: 'absolute', borderColor: 'white', width: '100%', margin: '0', opacity: "2.25" }} />
                <div className="d-flex gap-1 pt-3 mt-5 info-div text-center" style={{ color: 'white', margin: '0' }}>
                    <h3 className="mb-0 w-30 w-sm-30 w-md-35 fs-5 ">FAQs</h3>
                    <h4 className="mb-0 text-white w-30 w-sm-30 w-md-35 fs-5 " >Click here</h4>
                </div>
                <hr className="hr text-white mt-2 pt-5" style={{ position: 'absolute', borderColor: 'white', width: '100%', margin: '0', opacity: "2.25" }} />
                <div className="d-flex gap-1 pt-3 info-div text-center" style={{ color: 'white', margin: '0' }}>
                    <h3 className="mb-0 w-30 w-sm-30 w-md-35 fs-5 ">Track My Parcel</h3>
                    <h4 className="mb-0 text-white w-30 w-sm-30 w-md-35 fs-5 ">Click here</h4>
                </div>
                <hr className="hr text-white mt-2 pt-2" style={{ position: 'absolute', borderColor: 'white', width: '100%', margin: '0', opacity: "2.25" }} />
                <div className="d-flex gap-1 pt-3 info-div text-center" style={{ wordWrap: "break-word", margin: '0' }}>
                    <h3 className="mb-0 w-30 w-sm-35 w-md-40 text-white fs-5 " >Email Address</h3>
                    <h4 className="mb-0 text-white w-30 fs-5 ">hello@gmail.com</h4>
                </div>
                <hr className="hr text-white mt-2 pt-2" style={{ position: 'absolute', borderColor: 'white', width: '100vw', margin: '0', opacity: "2.25" }} />
                <div className="d-flex gap-1 pt-3 info-div text-center" style={{ color: 'white', margin: '0' }}>
                    <h3 className="mb-0 w-30 w-sm-30 w-md-35 fs-5">Socials</h3>
                    <h4 className="mb-0 text-white w-30 fs-5 ">grate</h4>
                </div>
            </div>
        </div>
    </div>
</div>
<style jsx>{`
    @media (max-width: 768px) {
        #foot {
            margin-bottom:0 ;
        }
    }
`}</style>

               

            </div>
        </>

    );
};

export default Blog;

