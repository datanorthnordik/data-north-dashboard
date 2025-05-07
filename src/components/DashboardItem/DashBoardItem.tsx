import React, { useRef } from "react"
import "./dashboarditem.scss"
interface DashBoardItemProps {
    board: any
}

const DashBoardItem = (props: DashBoardItemProps) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const { board } = props
    return (
        <div className='dashboard_item'>
            <div className="dashboard_item__scroll" tabIndex={0} >
                <iframe className='dashboard_item_visual'
                    style={{ height: board.height }}
                    title="Data Visualisation"
                    ref={iframeRef}
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    allow="fullscreen"
                    src={`${board.link}?:embed=y&amp;:showVizHome=no&amp;
                    :host_url=https%3A%2F%2Fpublic.tableau.com%2F&amp;:embed_code_version=3&amp;:tabs=no&amp;:toolbar=yes&amp;
                    :animate_transition=yes&amp;:display_static_image=no&amp;:display_spinner=no&amp;:display_overlay=yes&amp;
                    :display_count=yes&amp;:language=en-US&amp;:loadOrderID=0`}>
                </iframe>
            </div>
        </div>
    )
}

export default DashBoardItem