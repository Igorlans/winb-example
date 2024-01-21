import { CSSProperties, FC } from 'react'

interface pageProps {
    
}

const page: FC<pageProps> = ({}) => {

    return (
        <center>
            <div>
                <img src='/images/header/logo.svg' />
            </div>
            <ul style={{ marginTop: "20px", marginBottom: "20px" }}>
                <a style={{ display: "inline-block", marginRight: "10px", cursor: "pointer"}}>Головна</a>
                <a style={{ display: "inline-block", marginRight: "10px", cursor: "pointer"}}>Головна</a>
                <a style={{ display: "inline-block", marginRight: "10px", cursor: "pointer"}}>Головна</a>
                <a style={{ display: "inline-block", cursor: "pointer"}}>Головна</a>
            </ul>

            <div style={{width: "100%", height: "400px", overflow: "hidden", position: "relative"}}>
                <img src='/images/article_image.png' style={{width: "100%", height: "100%", objectFit: "cover"}}/>
                <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "400px", background: "#000000", opacity: "0.3"}}>.</div>
                <div style={{ position: "absolute", top: "20%", left: "50%", translate: "-50%"}}>
                    <h1 style={{ color: "white", fontWeight: "600", fontSize: "44px" }}>Нова подія <br /> у вашому регіоні!</h1>
                    <div style={{ color: "white", marginTop: "10px", marginBottom: "20px"}}>
                        <div><span style={{fontWeight: "500"}}>Дата:</span> info</div>
                        <div><span style={{fontWeight: "500"}}>Місце:</span> info</div>
                        <div><span style={{fontWeight: "500"}}>Регіон:</span> info</div>
                    </div>
                    <a href="${domen}/events/${data.event.id}" style={{ backgroundColor: "#C9547E", paddingInline: "20px", color: "white", paddingBlock: "10px", borderRadius: "8px"}}>Приєднатися</a>
                </div>
            </div>

            <div style={{ marginTop: "40px"}}>
                <h2 style={{ fontWeight: "700", color: "#C9547E", fontSize: "24px"}}>Запрошуємо!</h2>
                <h3 style={{ fontWeight: "500", fontSize: "18px", marginBottom: "8px", marginTop: "10px"}}>Надія Лесицька</h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 
                    1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but 
                    also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
                    containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                </p>
            </div>

            <div style={{ marginTop: "40px"}}>
                <h2 style={{ fontWeight: "700", color: "#C9547E", fontSize: "24px"}}>Експерт заходу</h2>
                <div style={{ width: "120px", height: "120px", borderRadius: "100%", overflow: "hidden", marginTop: "20px", marginBottom: "20px"}}>
                    <img src='/images/article_image.png' style={{width: "100%", height: "100%", objectFit: "cover"}} />
                </div>
                <h3 style={{ fontWeight: "500", fontSize: "18px", marginBottom: "8px", marginTop: "10px"}}>Надія Лесицька</h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 
                    1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but 
                    also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
                    containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                </p>
            </div>
        </center>
    )
}

export default page