
import { EmailNav } from "./email-nav.jsx"
import { MailService } from "../services/mail.service.js"
const {NavLink,withRouter} = ReactRouterDOM

export class EmailDetails extends React.Component {
    state = {
        email: null
    }

    componentDidMount() {
        this.loadEmail() 
    }   

    loadEmail = () => {
        const emailId = this.props.email.id
        console.log(emailId)
        MailService.getMailById(emailId)
            .then(email => {
                this.setState({ email })
            
            })

    }

    render() {
        const {email} = this.state
        if (!email) return <h1>Loading...</h1>
     
        return <section className={`emails-section`}>
            <div className="mail-details">
            <p className="email-details"><span className="bold">{email.sentFrom}</span>	&#60;{email.from}&#62;</p>
            <h1 className="email-details">{email.subject}</h1>
            <p className="email-body email-details">{email.body}</p>
            <div className="flex details-actions">
           <NavLink to={`/notes/:?mailFrom=${email.sentFrom}&mailSubject=${email.subject}&&emailBody=${email.body}`}><i className="fa-solid fa-paper-plane send-note"></i></NavLink>
           <i onClick={() => this.props.onDeleteEmail(email.id)} className="fa-solid fa-trash trash-details"></i>
            </div>

            </div>
        </section>
    }
}

{/* <button className="send-btn send-note"> */}