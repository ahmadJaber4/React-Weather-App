
export default function SearchResultContainer({children, message}){
    return(
        <div className="browse-container">
            <h3 className="container-title">{message}</h3>
            {children}
        </div>
    );
}