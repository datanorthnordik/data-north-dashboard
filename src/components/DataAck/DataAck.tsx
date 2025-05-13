import AppToolbar from "../AppToolbar/AppToolbar"
import "./dataack.scss"
import { contact, datasources } from "../../constants/constants"


interface DataAckProps {
    handleDrawerToggle: () => void
}

const DataAck = (props: DataAckProps) => {
    const { handleDrawerToggle } = props
    return (
        <>
            <AppToolbar handleDrawerToggle={handleDrawerToggle} />
            <div className="container">
                <div className="dataack">
                    <div className="dataack_sources">
                        <h2 className="dataack_sources_header">Data Acknowledgement</h2>
                        <p className="dataack_sources_desc">The data for this project were obtained from the following sources.</p>
                        {datasources.map(source => (<div className="dataack_sources_item">
                            <h3 className="dataack_sources_item_heading">{source.source}</h3>
                            <p>{source.desc}</p>
                        </div>))}
                    </div>
                    <div className="dataack_subscribe">
                    </div>
                </div>
            </div>
        </>

    )
}

export default DataAck