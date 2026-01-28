
export default function BriefBox({ image, title, description }) {
    return (
        <div className="brief-box">
            <div>
                <h1 className="brief-image">{image}</h1>
                <h2 className="brief-title">{title}</h2>
            </div>
            <p className="brief-description">{description}</p>
        </div>
    );
}