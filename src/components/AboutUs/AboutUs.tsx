import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import AppToolbar from "../AppToolbar/AppToolbar"
import "./aboutus.scss"
import { goals } from '../../constants/constants';

interface AboutUsProps {
    handleDrawerToggle: () => void
}

const AboutUs = (props: AboutUsProps) => {
    const { handleDrawerToggle } = props
    return (
        <>
            <AppToolbar handleDrawerToggle={handleDrawerToggle} />
            <div className="container">
                <div className="aboutus">
                    <div className="aboutus_desc">
                        <div className="aboutus_desc_overview">
                            <h2 className="aboutus_desc_heading">Overview</h2>
                            <p className="aboutus_desc_para">
                                Data North is an initiative designed to collect, analyze,
                                and share vital data to address the unique challenges faced
                                by the rural and small communities of Northern Ontario.
                                The project aims to identify community needs, gaps in services,
                                and opportunities for development. This data hub will support
                                evidence-based decision-making, program development, and research,
                                ensuring that Northern communities have access to critical, locally
                                relevant data.
                            </p>
                        </div>
                        <div className="aboutus_desc_goals">
                            <h2 className="aboutus_desc_heading">Goals and Objectives</h2>
                            <ul className="aboutus_goal_list">
                                {goals.map(goal => (
                                    <li className="aboutus_goal_item">
                                        <span className="aboutus_goal_item_icon">
                                            <ArrowRightAltIcon />
                                        </span>
                                        {goal}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="aboutus_logo">
                        <div className="aboutus_logo_wrapper">
                            <img className='aboutus_logo_image'
                                decoding="async" width="1067" height="800" src="https://nordikinstitute.com/wp-content/uploads/2021/04/Algoma_University_2.jpg" alt="Algoma University Campus Building" srcSet="https://nordikinstitute.com/wp-content/uploads/2021/04/Algoma_University_2.jpg 1067w, https://nordikinstitute.com/wp-content/uploads/2021/04/Algoma_University_2-640x480.jpg 640w, https://nordikinstitute.com/wp-content/uploads/2021/04/Algoma_University_2-768x576.jpg 768w" sizes="(max-width: 1067px) 100vw, 1067px" />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default AboutUs