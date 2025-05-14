import AppToolbar from "../AppToolbar/AppToolbar"
import "./contactus.scss"
import { contact } from "../../constants/constants"


interface ContactUsProps {
    handleDrawerToggle: () => void
}

const ContactUs = (props: ContactUsProps) => {
    const { handleDrawerToggle } = props

    const onJoinHere = ()=>{
        window.open('https://forms.monday.com/forms/1b4f6c260a6c3f24010ae7e9d5414a5c?r=use1', '_blank', 'noopener,noreferrer'); 
    }

    const onSubscribeHere = ()=>{
        window.open('https://nordikinstitute.us20.list-manage.com/subscribe?u=2a964e9b9625856f14a62b0c0&id=b20ef6b398', '_blank', 'noopener,noreferrer'); 
    }
    return (
        <>
            <AppToolbar handleDrawerToggle={handleDrawerToggle} />
            <div className="container">
                <div className="contactus">
                    <div className="contactus_contact">
                        <h2 className="contactus_contact_header">Get in Touch</h2>
                        <p className="contactus_contact_desc">
                            We’re here to help answer your questions. Community impact can be complicated, our researchers are on hand to help discuss every aspect of your project.
                        </p>
                        <span className="contactus_contact_details">
                            Contact:
                        </span>
                        <span className="contactus_contact_details contactus_contact_person">
                            {`${contact.name}, ${contact.designation}`}
                        </span>
                        <span className="contactus_contact_details contactus_contact_address">
                            {`${contact.address}`}
                        </span>
                        <span className="contactus_contact_details contactus_contact_street">
                            {`${contact.street}`}
                        </span>
                        <span className="contactus_contact_details contactus_contact_mobile">
                            {`T:${contact.telephone}`}
                        </span>
                        <span className="contactus_contact_details contactus_contact_email">
                            {`E:${contact.email}`}
                        </span>
                    </div>
                    <div className="contactus_subscribe">
                        <p className="contactus_subscribe_para">
                            Subscribe to NORDIK Institute's email list! Stay up to date with our 
                            latest news and events including Spark series, press releases/news updates, 
                            and monthly research spotlights.
                        </p>
                        <button onClick={onSubscribeHere} className="contactus_subscribe_button">Subscribe Here</button>
                        <p className="contactus_subscribe_para">
                            Interested in becoming a member of NORDIK Institute?
                        </p>
                        <button onClick={onJoinHere} className="contactus_subscribe_button">Join Here</button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ContactUs