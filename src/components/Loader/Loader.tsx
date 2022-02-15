import './Loader.css'

export const Loader = () => {
    return (
        <div className={"loadingContainer"}>
            <h2>Loading...</h2>
            <div className="loading">
                <div className="arc"></div>
                <div className="arc"></div>
                <div className="arc"></div>
            </div>
        </div>
    )
}