import { MailService } from "../services/mail.service.js"

import { EmailNav } from "../cmps/email-nav.jsx"
import { EmailList } from "../cmps/email-list.jsx"
import { NewMail } from "../cmps/new-mail.jsx"
import { EmailDetails } from "../cmps/email-details.jsx"


export class MailApp extends React.Component {
    state = {
        emails: [],
        critiria: 'inbox',
        isNewEmail: false,
        isOpenMail: false,
        isTrash: false,
        currOpenMail: {},
        draftMail: {
            to: '',
            subject: '',
            body: ''
        }

    }



    componentDidMount() {
        this.getEmails()

    }

    getEmails = () => {
        MailService.query(this.state.critiria)
            .then(emails => {
                this.setState({ emails: emails })
            })
    }

    changeStateCritiria = (value) => {
        this.setState({ isNewEmail: false, isOpenMail: false, critiria: value }, this.getEmails)

    }

    onNewEmail = () => {
        this.setState({ isNewEmail: true, isOpenMail: false, isTrash: false }, this.getEmails)

    }

    onSentMail = () => {
        this.setState({ isNewEmail: false, isOpenMail: false, isTrash: false })
    }

    onDeleteEmail = (emailId) => {
        MailService.deleteEmail(emailId)
        this.getEmails()
    }

    onCheckStar = (email) => {
        if (email.isChecked) email.isChecked = false
        else email.isChecked = true

        this.getEmails()
    }

    sendDraftInfo = (email) => {
        this.setState({ emailDits: { to: email.to, subject: email.subject, body: email.body } })
        let emailDits = {
            to: email.to,
            subject: email.subject,
            body: email.body
        }
       

    }

    onOpenMail = (email) => {
        if (email.isRead) email.isRead = false
        else email.isRead = true
        this.getEmails()
        // this.setState({ isOpenMail: true })
    }

    onClickMail = (email) => {
        // if (email.isDraft) {
            // console.log('here')
            // this.onNewEmail()
        // }
        // else {
            email.isRead = true
            this.setState({ isOpenMail: true, currOpenMail: email })
        // }
    }

    render() {
        const { emails, isNewEmail, isOpenMail } = this.state
        return <section>
            <div className="emails-section">
                <nav className="email-nav">
                    <EmailNav critiria={this.state.critiria} onNewEmail={this.onNewEmail} changeStateCritiria={this.changeStateCritiria} />

                </nav>
                <div className="preview">
                    {!isOpenMail && <EmailList onOpenMail={this.onOpenMail} onDeleteEmail={this.onDeleteEmail} onCheckStar={this.onCheckStar} onClickMail={this.onClickMail} emails={emails} />}
                    {isNewEmail && <NewMail draftMail={this.state.draftMail} onSentMail={this.onSentMail} />}
                    {isOpenMail && <EmailDetails email={this.state.currOpenMail} />}
                </div>
            </div>
        </section>
    }
}