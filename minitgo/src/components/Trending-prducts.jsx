import React from 'react';
 
 

function CardSlider() {
  return (
    <div className="container">
      <div className="row header-row">
        <div className="col-md-offset-2 col-md-8 title">
          <img alt="" className="img-responsive logo" src="//static.rtpdesign.co.uk/blog/img/blog-logo.png" />
          <h1>Bootstrap 3 Show Many Slide One Carousel</h1>
          <p>Find out more about <a href="https://github.com/rtpHarry/Bootstrap3-ShowManySlideOneCarousel">this code sample</a>.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="carousel carousel-showmanymoveone slide" id="carousel123">
            <div className="carousel-inner">
              <div className="item active">
                <div className="col-xs-12 col-sm-6 col-md-3">
                  <a href="#">
                    <img src="http://placehold.it/500 /0054A6/fff&amp;text=1" className="img-responsive" alt="1" />
                  </a>
                </div>
              </div>
              {/* Add other items in a similar way */}
            </div>
            <a className="left carousel-control" href="#carousel123" data-slide="prev">
              <i className="glyphicon glyphicon-chevron-left" />
            </a>
            <a className="right carousel-control" href="#carousel123" data-slide="next">
              <i className="glyphicon glyphicon-chevron-right" />
            </a>
          </div>
        </div>
      </div>
      {/* Add more rows and carousels as needed */}
    </div>
  );
}

export default CardSlider;
