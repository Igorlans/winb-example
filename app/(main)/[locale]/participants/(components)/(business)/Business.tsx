import './style.css';

const Business = () => {
    return (
        <div className='container flex flex-col items-center gap-y-[30px]'>
            <div className='flex flex-col text-center items-center gap-y-[20px]'>
                <h1 className="font-title text-center text-customPink whitespace-nowrap">
                    Бізнеси наших членкинь
                </h1>
                <p className='font-subtitle max-w-[647px]'>
                    Зареєструйтеся, щоб стати нашим партнером. Збільшуйте продажі та доходи, використовуючи.
                </p>
            </div>
           
            <BusinessItem 
                rotate={0}
            />

        </div>
    );
};

const BusinessItem = ( {rotate} : { rotate: number } ) => {
    return (
        <ul className="circles"
            style={{ transform: `rotate(${rotate}deg)` }}
        >
            <li id="circle-120" className="circle">.</li>
            <li id="circle-88" className="circle">.</li>
            <li id="circle-64" className="circle">.</li>
            <li id="circle-88" className="circle">.</li>
            <li id="circle-120" className="circle">.</li>
            <li id="circle-88" className="circle">.</li>
            <li id="circle-120" className="circle">.</li>
            <li id="circle-88" className="circle">.</li> 
            <li id="circle-64" className="circle">.</li>
            <li id="circle-120" className="circle">.</li>
            <li id="circle-120" className="circle">.</li>
            <li id="circle-120" className="circle">.</li>
            <li id="circle-120" className="circle">.</li>
            <li id="circle-88" className="circle">.</li> 
            <li id="circle-64" className="circle">.</li>
            <li id="circle-88" className="circle">.</li> 
        </ul>
    );
};
export default Business;