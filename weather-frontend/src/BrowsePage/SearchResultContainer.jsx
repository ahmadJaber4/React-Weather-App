
export default function SearchResultContainer({children, message}){
    return(
        <div className="suggested-container">
            <h3 className="suggested-text">{message}</h3>
            {children}
        </div>
    );
}