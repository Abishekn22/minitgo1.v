import Logo from '../../../components/images/minitgo.png';
function Plainheader(){
return(
    <>
     <div className='justify-content-center d-flex my-3 mx-5 rounded p-3 border  '  style={{backgroundColor:'#f7f9f0'}}>
            <img src={Logo}  style={{width:140}}/>
           </div>
    </>
);
}
export default Plainheader;