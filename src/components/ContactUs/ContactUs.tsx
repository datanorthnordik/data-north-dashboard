import AppToolbar from "../AppToolbar/AppToolbar"
import "./contactus.scss"
import { contact } from "../../constants/constants"


interface ContactUsProps {
    handleDrawerToggle: () => void
}

const ContactUs = (props: ContactUsProps) => {
    const { handleDrawerToggle } = props
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
                        <span className="contactus_contact_details">
                            {`${contact.name}, ${contact.designation}`}
                        </span>
                        <span className="contactus_contact_details contactus_contact_mobile">
                            {`T:${contact.telephone}`}
                        </span>
                        <span className="contactus_contact_details contactus_contact_email">
                            {`E:${contact.email}`}
                        </span>
                    </div>
                    <div className="contactus_subscribe">
                    </div>
                </div>
            </div>
        </>

    )
}

export default ContactUs