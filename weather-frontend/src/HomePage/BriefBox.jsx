// brief box component, a box that briefly describes a website feature

export default function BriefBox({ image, title, description }) {
    return (
        <div className="brief-box">
            <div>
                <h1 className="brief-image">{image}</h1> {/* emoji */}
                <h2 className="brief-title">{title}</h2> {/* feature title */}
            </div>
            <p className="brief-description">{description}</p> {/* feature description */}
        </div>
    );
}